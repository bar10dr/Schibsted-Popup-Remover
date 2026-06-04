# Schibsted Popup Remover

A small Chrome (Manifest V3) extension that removes the full-screen
cookie-consent popup shown on Schibsted news sites and reveals the page
underneath. Toggle it on/off from the toolbar.

> Unofficial, independent project. Not affiliated with or endorsed by Schibsted,
> Aftenposten, VG, E24, or Sourcepoint.

## What it does

Many sites — including Aftenposten, VG, E24 and others — use the **Sourcepoint**
consent platform, which injects a full-screen overlay
(`div#sp_message_container_…` + `iframe#sp_message_iframe_…`) and locks page
scrolling via `<html class="sp-message-open">`.

This extension:

1. Hides/removes that overlay and its iframe.
2. Removes the scroll lock so the page scrolls normally.
3. Watches the DOM with a `MutationObserver` so the popup can't re-appear.

The page content loads underneath the popup anyway, so removing the overlay
simply reveals it. No consent choice is recorded; consent-gated ad/analytics
scripts simply won't run.

## Install (from source)

1. Clone or download this repository.
2. Open `chrome://extensions`.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select this folder.

The toolbar icon shows the current state; click it to toggle on/off. When off,
an `OFF` badge appears and existing popups are left untouched.

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | MV3 manifest |
| `content.js` | Detects/removes the popup; honors the on/off switch |
| `popup.html` / `popup.css` / `popup.js` | Toolbar on/off toggle UI |
| `background.js` | Updates the toolbar icon + `OFF` badge with the state |
| `icons/` | Toolbar icons (on + off variants, 16/32/48/128) |
| `store/` | Chrome Web Store assets (icon, screenshot) |
| `PRIVACY.md` | Privacy policy |

## Privacy

Runs entirely on your device. Stores only a single on/off preference locally
(`chrome.storage.local`) and sends nothing to anyone. See [PRIVACY.md](PRIVACY.md).

## License

[MIT](LICENSE)
