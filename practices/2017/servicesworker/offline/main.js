'use strict';

function getDatafromCache() {
   caches.open('testingDataOffline').then(function(cache) {

      cache.match('https://jsonplaceholder.typicode.com/posts/1').then(function(matchedResponse) {
         
         matchedResponse.text().then(function(content) {
            document.getElementById('content').innerHTML = content;
         });
      });
      
   });
}

window.addEventListener('load', function() {      

   //normal fetach
   fetch('https://jsonplaceholder.typicode.com/posts/1').then(function(respond) {
      
      respond.text().then(function(content) {
         document.getElementById('content').innerHTML = content;
      });
   }).catch(function(err) { 
      //if failed, try to get it from the cache
      getDatafromCache();
   });

   document.querySelector('#cacheData').addEventListener('click', function(event) {
      
      caches.open('testingDataOffline').then(function(cache) {

         cache.add('https://jsonplaceholder.typicode.com/posts/1').then(function() {
           alert('Data cached, now disconnect your connection and reload the page');
         });
      });

   });
 
});

