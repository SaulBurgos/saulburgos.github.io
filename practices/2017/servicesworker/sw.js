/* 
	- self is the service worker itself	
	- browser reinstall the service worker again if detect changes in the file
*/

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'main.css',
  'main.js'
];


self.addEventListener('activate', function(event) {
	console.log('active event service worker');
});

//trigger on url changes and requests to the server
self.addEventListener('fetch', function(event) {	
	//search in the cache for the request that is in progress
	var cacheFound = caches.match(event.request).then(function(response) {
		
		if (response) {
			//return the object cached
 			return response;
		} else {
			//if not we, we make the normal request
			return fetch(event.request);	
		}		
	});

	//we pass the promise 
	event.respondWith(cacheFound);

	/***
	in this we are working only with cached assets in the install step
	in order to cache future request we need put extra logic here. If the 
	cache asset is not found, we should cache it. like this example
	https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#cache_and_return_requests
	***/
});

//event only happen one time, later the service worker keep working
self.addEventListener('install', function(event) {
	console.log('Install event');
	//if cache does not exist  will be created
	var cachePromise = caches.open(CACHE_NAME);
	event.waitUntil(cachePromise);

	//This is a chain of promises (caches.open() and cache.addAll()). The event.waitUntil() method 
	//takes a promise and uses it to know how long installation takes, and whether it succeeded.
	//If all the files are successfully cached, 
	//then the service worker will be installed. 
	//If any of the files fail to download, then the install step will fail
	cachePromise.then(function(cache) {
	   console.log('Opened cache');

    	var promiseAll = cache.addAll(urlsToCache);
    	promiseAll.then(function() {
    		console.log('All files cached');
    	});

    	return promiseAll;
	});
	
});



