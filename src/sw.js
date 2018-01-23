// The files we want to cache
var CACHE_NAME = 'my-site-cache-v1';


var urlsToCache = [
    './static/js/main.982c9e2d.js', //不能是匹配符号   比如不能是一个文件夹 
    './favicon.ico'
  ];
  
self.addEventListener('install', function(event) {
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
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response
          var fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have 2 stream.
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

//   var EXTRA_FILES = [
//     "/xjs/_/js/k=xjs.ntp.en_US.HaQGixVjvWo.O/m=sx,jsa,ntp,d,csi/am=AAGEAQ/rt=j/d=1/t=zcms/rs=ACT90oGWi0napVdJVNROHrIJ4AH8f5aRdQ",
//   ];
//   var CHECKSUM = "erj8bk";
  
//   var BLACKLIST = [
//     '/gen_204\?',
//     '/async/',
//     '/complete/',
//   ];
  
//   var FILES = [
//             '/' +
//     '/ssl.gstatic.com/chrome/components/doodle-notifier-01.html'
//   ].concat(EXTRA_FILES || []);
  
//   var CACHENAME = 'newtab-static-' + CHECKSUM;
  
//   self.addEventListener('install', function(event) {
//     event.waitUntil(caches.open(CACHENAME).then(function(cache) {
//       return cache.addAll(FILES);
//     }));
//   });
  
//   self.addEventListener('activate', function(event) {
//       return event.waitUntil(caches.keys().then(function(keys) {
//       return Promise.all(keys.map(function(k) {
//         if (k != CACHENAME && k.indexOf('newtab-static-') == 0) {
//           return caches.delete(k);
//         } else {
//           return Promise.resolve();
//         }
//       }));
//     }));
//   });
  
//   self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//           if (response) {
//                       return response;
//           }
  
//           return fetch(event.request).then(function(response) {
//             var shouldCache = response.ok;
  
//             for (var i = 0; i < BLACKLIST.length; ++i) {
//               var b = new RegExp(BLACKLIST[i]);
//               if (b.test(event.request.url)) {
//                 shouldCache = false;
//                 break;
//               }
//             }
  
//             if (event.request.method == 'POST') {
//               shouldCache = false;
//             }
  
//                       if (shouldCache) {
//               return caches.open(CACHENAME).then(function(cache) {
//                 cache.put(event.request, response.clone());
//                 return response;
//               });
//             } else {
//               return response;
//             }
//           });
//         })
//     );
//   });
  
  
  
//   if (!Cache.prototype.add) {
    
//     Cache.prototype.add = function add(request) {
//           return this.addAll([request]);
//     };
//   }
  
//   if (!Cache.prototype.addAll) {
    
//     Cache.prototype.addAll = function addAll(requests) {
//           var cache = this;
  
//           function NetworkError(message) {
//         this.name = 'NetworkError';
//         this.code = 19;
//         this.message = message;
//       }
//       NetworkError.prototype = Object.create(Error.prototype);
  
//       return Promise.resolve()
//           .then(function() {
//             if (arguments.length < 1) throw new TypeError();
  
//             requests = requests.map(function(request) {
//               if (request instanceof Request) {
//                 return request;
//               } else {
//                 return String(request);              }
//             });
  
//             return Promise.all(requests.map(function(request) {
//               if (typeof request === 'string') {
//                 request = new Request(request);
//               }
  
//               return fetch(request.clone());
//             }));
//           })
//           .then(function(responses) {
//                                 return Promise.all(responses.map(function(response, i) {
//               return cache.put(requests[i], response);
//             }));
//           })
//           .then(function() {
//             return undefined;
//           });
//     };
//   }
  
//   if (!CacheStorage.prototype.match) {
      
//     CacheStorage.prototype.match = function match(request, opts) {
//       var caches = this;
//       return caches.keys().then(function(cacheNames) {
//         var match;
//         return cacheNames.reduce(function(chain, cacheName) {
//           return chain.then(function() {
//             return match || caches.open(cacheName).then(function(cache) {
//               return cache.match(request, opts);
//             }).then(function(response) {
//               match = response;
//               return match;
//             });
//           });
//         }, Promise.resolve());
//       });
//     };
//   }

/**
 * 缓存静态资源
 */