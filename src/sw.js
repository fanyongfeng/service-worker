// The files we want to cache
var CACHE_NAME = 'my-site-cache-v1';


var urlsToCache = [
    './static/js/main.982c9e2d.js',
    './favicon.ico'
  ];
  
self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
      })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        // 因为 event.request 流已经在 caches.match 中使用过一次，
        // 那么该流是不能再次使用的。我们只能得到它的副本，拿去使用。
        var fetchRequest = event.request.clone();

        // fetch 的通过信方式，得到 Request 对象，然后发送请求
        return fetch(fetchRequest).then(
          function(response) {
            // 检查是否成功
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 如果成功，该 response 一是要拿给浏览器渲染，而是要进行缓存。
            // 不过需要记住，由于 caches.put 使用的是文件的响应流，一旦使用，
            // 那么返回的 response 就无法访问造成失败，所以，这里需要复制一份。
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});


self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['my-site-cache-v1'];

  event.waitUntil(
  // 遍历 caches 里所有缓存的 keys 值
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.includes(cacheName)) {
          // 删除 v1 版本缓存的文件
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

