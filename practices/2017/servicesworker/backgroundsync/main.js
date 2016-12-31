'use strict';
var practice = new function() {

	window.addEventListener('load', function() {
		
    	navigator.serviceWorker.register('sw.js').then(function(registration) {
      	return navigator.serviceWorker.ready;
    	}).then(function(registration) {

         document.getElementById('sync').addEventListener('click',function() {
           registration.sync.register('image-fetch').then(function() {
               console.log('Sync registered');
           });
         });
      });
  	});

}
