var C='quran-app-v5',F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C&&n!=='qaudio'&&n!=='qtext'&&n!=='quran-fonts'}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open('quran-fonts').then(function(c){return c.match(r).then(function(m){var f=fetch(r).then(function(x){c.put(r,x.clone());return x}).catch(function(){return m});return m||f})}));
    return;
  }
  if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(x){var y=x.clone();caches.open(C).then(function(c){c.put(r,y)});return x}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('index.html')})}));
});
