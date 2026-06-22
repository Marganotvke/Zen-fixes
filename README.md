# Zen Fixes

Sine mod for [Zen Browser](https://zen-browser.app/) with two UI fixes:

1. **Reload in URL bar** — Moves the reload/stop button into the address bar (before page actions) and swaps the unified extensions button to the top sidebar button row in single-toolbar mode.
2. **Audio tab icons** — When a tab is playing audio, muted, or has blocked media, a sound overlay covers the favicon (Nebula-style). On tab hover, the overlay retreats to the top corner so the favicon is visible again.

## Requirements

- Zen Browser with [Sine](https://github.com/CosmoCreeper/Sine) installed
- **Allow unsafe JS** enabled in Sine settings (required for the reload URL bar script)

## Install from remote URL (Sine)

Sine downloads this mod directly from GitHub — no manual cloning or file copying.

1. Open **Zen → Settings → Sine**
2. Open **Sine settings** (gear icon) and enable **Allow unsafe JS**
3. In the **Install custom mod** field below the marketplace, paste one of:
   - `https://github.com/Marganotvke/Zen-fixes`
   - `Marganotvke/Zen-fixes`
4. Click **Install**
5. **Fully restart Zen** (or use *about:support → Clear startup cache*)

Sine reads `theme.json` from the repo, downloads the files, and installs the mod into your profile automatically.

## Notes

- The reload script re-applies when Zen reshuffles toolbar widgets (including extension overflow).
- Audio overlay styling follows Nebula’s sound-icon behavior with hover-to-corner retreat.
- If you also use Nebula’s sound icon module, disable it to avoid conflicting styles.

## License

MIT
