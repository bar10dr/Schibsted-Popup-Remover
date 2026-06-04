// Removes Sourcepoint cookie-consent popups and any scroll lock they add, so
// the underlying page is shown normally. Runs at document_start and keeps
// watching, because the CMP injects its markup asynchronously after load.
// Honors an on/off switch stored in chrome.storage.local under "enabled".

const KILL_SELECTOR =
  'div[id^="sp_message_container_"], iframe[id^="sp_message_iframe_"]';

const STYLE_ID = 'cpr-hide-style';
const CSS = `
  div[id^="sp_message_container_"],
  iframe[id^="sp_message_iframe_"] { display: none !important; }
  html.sp-message-open,
  html.sp-message-open body {
    overflow: auto !important;
    position: static !important;
    top: auto !important;
  }
`;

let observer = null;

function addStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = CSS;
  (document.head || document.documentElement).appendChild(s);
}

function removeStyle() {
  const s = document.getElementById(STYLE_ID);
  if (s) s.remove();
}

function clean() {
  for (const el of document.querySelectorAll(KILL_SELECTOR)) el.remove();

  const html = document.documentElement;
  if (html && html.classList.contains('sp-message-open')) {
    html.classList.remove('sp-message-open');
  }

  const body = document.body;
  if (body && body.style) {
    if (body.style.position === 'fixed') body.style.position = '';
    if (body.style.overflow === 'hidden') body.style.overflow = '';
    if (body.style.top) body.style.top = '';
  }
}

function start() {
  addStyle();
  clean();
  if (!observer) {
    observer = new MutationObserver(clean);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
  }
}

function stop() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  removeStyle();
}

// Apply immediately assuming enabled (the common case) so there is no flash;
// then correct from stored preference. The CMP injects its popup later than
// storage resolves, so if the user disabled us, we'll have stopped first.
start();

chrome.storage.local.get({ enabled: true }, (r) => {
  if (!r.enabled) stop();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.enabled) {
    changes.enabled.newValue ? start() : stop();
  }
});
