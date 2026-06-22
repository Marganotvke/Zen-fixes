# Zen Fixes

Sine mod for [Zen Browser](https://zen-browser.app/) with two UI fixes:

1. **Reload in URL bar** — Moves the reload/stop button into the address bar (before page actions) and swaps the unified extensions button to the top sidebar button row in single-toolbar mode.
2. **Audio tab icons** — When a tab is playing audio, muted, or has blocked media, a sound overlay covers the favicon (Nebula-style). On tab hover, the overlay retreats to the top corner so the favicon is visible again.

## Requirements

- Zen Browser with [Sine](https://github.com/CosmoCreeper/Sine) installed

The reload-in-URL-bar feature uses a Sine user script. GitHub-installed mods do not run scripts unless one of these is set:

- **Allow unsafe JS** in Sine settings, or
- `"origin": "store"` in your profile `chrome/sine-mods/mods.json` for the `zen-fixes` entry (see below)

## Install from remote URL (Sine)

Sine downloads this mod directly from GitHub — no manual cloning or file copying.

1. Open **Zen → Settings → Sine**
2. In the **Install custom mod** field below the marketplace, paste:
   ```
   https://github.com/Marganotvke/Zen-fixes
   ```
3. Click **Install**
4. **Enable the reload script** (pick one):
   - Sine settings → enable **Allow unsafe JS**, or
   - Quit Zen, edit `chrome/sine-mods/mods.json`, and inside the `"zen-fixes"` object add:
     ```json
     "origin": "store",
     "no-updates": true
     ```
5. **Fully restart Zen** (or *about:support → Clear startup cache*)

Without step 4, CSS still loads (audio tab icons) but the reload button will not move into the URL bar and its URL bar styling will not apply.

## Notes

- The reload script re-applies when Zen reshuffles toolbar widgets (including extension overflow).
- Audio overlay styling follows Nebula's sound-icon behavior with hover-to-corner retreat.
- If you also use Nebula's sound icon module, disable it to avoid conflicting styles.

## License

MIT
