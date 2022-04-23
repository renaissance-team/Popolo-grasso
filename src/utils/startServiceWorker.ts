export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then((registration) => {
          console.warn('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((error: string) => {
          console.warn('ServiceWorker registration failed: ', error);
        });
    });
  }
}
