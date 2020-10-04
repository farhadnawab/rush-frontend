if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceWorker.js')
      .catch((err) => console.log('service worker not registered', err));
  });
}
/* Force update
function forceSWupdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((e) => { e.update(); });
    });
  }
} */
