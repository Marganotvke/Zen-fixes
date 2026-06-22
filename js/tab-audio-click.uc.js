// ==UserScript==
// @name           Zen Fixes — Tab audio icon click
// @description    Mute/unmute when clicking the tab favicon area, not just the overlay badge
// @version        1.0
// @include        main
// @grant          none
// ==/UserScript==

(function () {
  "use strict";

  if (window.__zenFixesTabAudioClick) {
    return;
  }
  window.__zenFixesTabAudioClick = true;

  const AUDIO_TAB_SELECTOR =
    ":is([soundplaying], [muted], [activemedia-blocked])";
  const ICON_HIT_SELECTOR =
    ".tab-icon-image, .tab-throbber, .tab-icon-pending, .tab-icon-stack";

  function getAudioTab(target) {
    const stack = target.closest(".tab-icon-stack");
    if (!stack) {
      return null;
    }

    const tab = stack.closest(".tabbrowser-tab");
    if (!tab?.matches(AUDIO_TAB_SELECTOR)) {
      return null;
    }

    if (!target.closest(ICON_HIT_SELECTOR)) {
      return null;
    }

    if (target.closest(".tab-icon-overlay, .tab-audio-button")) {
      return null;
    }

    return tab;
  }

  function toggleTabAudio(tab) {
    if (tab.hasAttribute("activemedia-blocked")) {
      tab.resumeDelayedMedia();
      return;
    }

    if (tab.hasAttribute("soundplaying") || tab.hasAttribute("muted")) {
      tab.toggleMuteAudio();
    }
  }

  function onPointerDown(event) {
    if (event.button !== 0 || event.getModifierState("Accel") || event.shiftKey) {
      return;
    }

    const tab = getAudioTab(event.target);
    if (!tab) {
      return;
    }

    event.stopPropagation();
  }

  function onClick(event) {
    if (event.button !== 0 || event.getModifierState("Accel") || event.shiftKey) {
      return;
    }

    const tab = getAudioTab(event.target);
    if (!tab) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    toggleTabAudio(tab);
  }

  function init() {
    document.addEventListener("mousedown", onPointerDown, true);
    document.addEventListener("click", onClick, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
