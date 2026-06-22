// ==UserScript==
// @name           Zen Fixes — Reload URL Bar
// @description    Move reload into the URL bar and swap extension controls
// @version        1.0
// @include        main
// @grant          none
// ==/UserScript==

(function () {
  "use strict";

  if (window.__zenFixesReloadUrlbar) {
    return;
  }
  window.__zenFixesReloadUrlbar = true;

  const RELOAD_ID = "stop-reload-button";
  const EXT_ID = "unified-extensions-button";
  const PAGE_ACTIONS_ID = "page-action-buttons";
  const TOP_TARGET_ID = "zen-sidebar-top-buttons-customization-target";
  const SEPARATOR_ID = "zen-sidebar-top-buttons-separator";
  const URLBAR_EXTENSION_SELECTORS = [
    "#unified-extensions-button",
    "[data-extensionid]",
    ".unified-extensions-item",
    ".urlbar-addon-page-action",
    ".webextension-browser-action",
  ];

  let applying = false;
  let debounceTimer = null;

  function scheduleApply() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applySwap, 60);
  }

  function getUrlbarInputContainer() {
    return document.querySelector("#urlbar .urlbar-input-container");
  }

  function getReloadSlot(topTarget) {
    const separator = document.getElementById(SEPARATOR_ID);
    if (separator?.parentElement === topTarget) {
      return separator.nextElementSibling;
    }

    const forward = document.getElementById("forward-button");
    if (forward?.parentElement === topTarget) {
      return forward;
    }

    return topTarget.firstElementChild;
  }

  function insertBeforeAnchor(parent, node, anchor) {
    if (!parent || !node) {
      return;
    }

    if (anchor && anchor.parentElement === parent) {
      parent.insertBefore(node, anchor);
      return;
    }

    parent.appendChild(node);
  }

  function moveExtensionItemsOutOfUrlbar(urlbarInput, topTarget, anchor) {
    for (const selector of URLBAR_EXTENSION_SELECTORS) {
      for (const item of urlbarInput.querySelectorAll(`:scope > ${selector}`)) {
        insertBeforeAnchor(topTarget, item, anchor);
      }
    }
  }

  function swapInNavBar(reload, ext) {
    const navTarget = document.getElementById("nav-bar-customization-target");
    if (!navTarget || reload.parentElement !== navTarget || ext.parentElement !== navTarget) {
      return;
    }

    if (reload.nextElementSibling === ext || ext.nextElementSibling === reload) {
      return;
    }

    const placeholder = document.createComment("zen-fixes-reload-ext-swap");
    navTarget.insertBefore(placeholder, reload);
    navTarget.insertBefore(reload, ext.nextSibling);
    navTarget.insertBefore(ext, placeholder);
    placeholder.remove();
  }

  function applySwap() {
    if (applying) {
      return;
    }

    const reload = document.getElementById(RELOAD_ID);
    const ext = document.getElementById(EXT_ID);
    const pageActions = document.getElementById(PAGE_ACTIONS_ID);
    const urlbarInput = getUrlbarInputContainer();
    const isSingleToolbar = document.documentElement.hasAttribute("zen-single-toolbar");

    if (!reload || !pageActions || !urlbarInput) {
      return;
    }

    applying = true;
    try {
      if (reload.parentElement !== urlbarInput) {
        pageActions.before(reload);
      }

      if (isSingleToolbar) {
        const topTarget = document.getElementById(TOP_TARGET_ID);
        if (!topTarget) {
          return;
        }

        const anchor = getReloadSlot(topTarget);
        moveExtensionItemsOutOfUrlbar(urlbarInput, topTarget, anchor);

        if (ext && ext.parentElement !== topTarget) {
          insertBeforeAnchor(topTarget, ext, anchor);
        } else if (ext && anchor && ext.parentElement === topTarget && ext !== anchor) {
          insertBeforeAnchor(topTarget, ext, anchor);
        }
      } else if (ext) {
        swapInNavBar(reload, ext);
        if (reload.parentElement !== urlbarInput) {
          pageActions.before(reload);
        }
      }
    } finally {
      applying = false;
    }
  }

  function countUrlbarExtensionItems(urlbarInput) {
    let count = 0;
    for (const selector of URLBAR_EXTENSION_SELECTORS) {
      count += urlbarInput.querySelectorAll(`:scope > ${selector}`).length;
    }
    return count;
  }

  function needsReapply() {
    const reload = document.getElementById(RELOAD_ID);
    const urlbarInput = getUrlbarInputContainer();
    if (!reload || !urlbarInput) {
      return false;
    }

    const reloadInUrlbar = reload.parentElement === urlbarInput;
    const extItemsInUrlbar = countUrlbarExtensionItems(urlbarInput);

    const ext = document.getElementById(EXT_ID);
    const isSingleToolbar = document.documentElement.hasAttribute("zen-single-toolbar");
    const extOutOfPlace =
      isSingleToolbar &&
      ext &&
      ext.parentElement?.id !== TOP_TARGET_ID &&
      !document.getElementById(TOP_TARGET_ID)?.contains(ext);

    return !reloadInUrlbar || extItemsInUrlbar > 0 || extOutOfPlace;
  }

  function startObservers() {
    for (const id of ["nav-bar", "zen-sidebar-top-buttons", "urlbar"]) {
      const root = document.getElementById(id);
      if (!root) {
        continue;
      }

      new MutationObserver(() => {
        if (!applying && needsReapply()) {
          scheduleApply();
        }
      }).observe(root, { childList: true, subtree: true });
    }
  }

  function listenToCustomizableUI() {
    try {
      const { CustomizableUI } = ChromeUtils.importESModule(
        "resource:///modules/CustomizableUI.sys.mjs"
      );

      for (const eventName of [
        "widget-added",
        "widget-removed",
        "widget-moved",
        "area-reset",
      ]) {
        CustomizableUI.addListener(eventName, scheduleApply);
      }
    } catch (error) {
      console.warn("[Zen Fixes]: CustomizableUI listener unavailable", error);
    }
  }

  function init() {
    scheduleApply();
    startObservers();
    listenToCustomizableUI();
    window.addEventListener("resize", scheduleApply, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
