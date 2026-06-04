const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

function render(enabled) {
  toggle.checked = enabled;
  status.textContent = enabled ? 'On' : 'Off';
  status.classList.toggle('off', !enabled);
}

chrome.storage.local.get({ enabled: true }, (r) => render(r.enabled));

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ enabled });
  render(enabled);
});
