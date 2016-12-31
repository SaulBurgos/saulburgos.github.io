/* 
	- self is the service worker itself	
	- browser reinstall the service worker again if detect changes in the file
*/


function fetchDogImage () {
 fetch('https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg')
   .then(function (response) {
     return response;
   })
   .then(function (text) {
     console.log('Request successful', text);
   })
   .catch(function (error) {
     console.log('Request failed', error);
   });
}

self.addEventListener('activate', function(event) {
	console.log('active event service worker');
});

self.addEventListener('sync', function (event) {
	debugger;
	if (event.tag === 'image-fetch') {
 		event.waitUntil(fetchDogImage());
	}
});

//event only happen one time, later the service worker keep working
self.addEventListener('install', function(event) {
	
	
});



