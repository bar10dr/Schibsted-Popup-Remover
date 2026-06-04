// Keeps the toolbar icon + badge in sync with the on/off state.

const ICONS_ON = {
  16: 'icons/icon16.png',
  32: 'icons/icon32.png',
  48: 'icons/icon48.png',
  128: 'icons/icon128.png',
};
const ICONS_OFF = {
  16: 'icons/icon16-off.png',
  32: 'icons/icon32-off.png',
  48: 'icons/icon48-off.png',
  128: 'icons/icon128-off.png',
};

function apply(enabled) {
  chrome.action.setIcon({ path: enabled ? ICONS_ON : ICONS_OFF });
  chrome.action.setBadgeText({ text: enabled ? '' : 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#6b7280' });
}

function refresh() {
  chrome.storage.local.get({ enabled: true }, (r) => apply(r.enabled));
}

chrome.runtime.onInstalled.addListener(refresh);
chrome.runtime.onStartup.addListener(refresh);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.enabled) apply(changes.enabled.newValue);
});
