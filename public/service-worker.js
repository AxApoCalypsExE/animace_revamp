const CACHE_NAME = 'animace-cache-v1';
const urlsToCache = [
  "/",
  "@/app/globals.css",
  "@/app/appwrite.js",
  "@public/AnimAceLogo.svg",
  "@public/AnimAceLogo2.svg",
  "@/components/FetchAnimeData.tsx",
  "@/components/Carousel.tsx",

];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});
