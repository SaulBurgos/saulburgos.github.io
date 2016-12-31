'use strict';

window.addEventListener('load', function() {      

   document.querySelector('#notify').addEventListener('click', function(event) {
      
      Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
         var notificationMsg = new Notification('Title', { 
            body: 'I am the body text!'
         }); 
      });
      
   });
 
});

