# Zen Fixes

Sine mod for [Zen Browser](https://zen-browser.app/) with two UI fixes:

1. **Reload in URL bar** — Moves the reload/stop button into the address bar (before page actions) and swaps the unified extensions button to the top sidebar button row in single-toolbar mode.
2. **Audio tab icons** — When a tab is playing audio, muted, or has blocked media, a sound overlay covers the favicon (Nebula-style). On tab hover, the overlay retreats to the top corner so the favicon is visible again.

## Requirements

- Zen Browser with [Sine](https://github.com/CosmoCreeper/Sine) mods enabled
- **Allow unsafe JS** enabled in Sine settings (needed for the reload URL bar script)

## Install via Sine

1. Open Zen → Settings → Sine → **Install custom mod**
2. Paste: `https://github.com/Marganotvke/Zen-fixes`
3. Click install, then **fully restart Zen**

## Manual install

1. Quit Zen.
2. Clone into your profile's Sine mods folder:

   ```bash
   cd ~/Library/Application\ Support/zen/Profiles/<profile>/chrome/sine-mods
   git clone https://github.com/Marganotvke/Zen-fixes.git zen-fixes
   ```

3. Enable **Allow unsafe JS** in Sine settings.
4. Start Zen and enable **Zen Fixes** in the Sine mods list.

## Notes

- The reload script re-applies when Zen reshuffles toolbar widgets (including extension overflow).
- Audio overlay styling uses Zen's built-in tab sound icons; only layout and hover behavior are customized.
- If you also use Nebula's sound icon module, disable it to avoid conflicting styles.

## License

MIT
