'use strict';
var practice = new function() {

	window.addEventListener('load', function() {
		
    	navigator.serviceWorker.register('sw.js').then(function(registration) {
      	// Registration was successful
      	console.log('ServiceWorker registration successful with scope: ', registration.scope);

         /*fetch('some.json').then(function(respond){
             //exito
         }).catch(function(err) { 
             //Error en la peticion
         });*/
         
    	}).catch(function(err) {
      	// registration failed :(
      	console.log('ServiceWorker registration failed: ', err);
    	});
  	});

}