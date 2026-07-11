/* 経営日報 PWA service worker（ネット優先・オフライン時のみキャッシュ）。財務データはsessionStorageのみでSWにはキャッシュしない */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(r => {
        const c = r.clone();
        caches.open('nippou-shell-v1').then(x => x.put(e.request, c));
        return r;
      }).catch(() => caches.match(e.request))
    );
  }
});
