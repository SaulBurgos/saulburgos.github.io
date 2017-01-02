'use strict';

function createCustomElement() {
   //example about how to create a custom API
   var apeProto = Object.create(HTMLElement.prototype);

   apeProto.hoot = function() {
     console.log('Apes are great!');
   }

   apeProto.createdCallback = function() {
     this.innerHTML = "<b>Content added without shadow DOM</b>";
   };

   //Registering the custom elements
   document.registerElement('great-apes', {prototype: apeProto});

   //now we can use our own API
   var apes = document.querySelector('great-apes');
   apes.hoot();
}

function createCustomElementWithShadowDOM() {
   /*var shadow = document.querySelector('#hostElement').attachShadow({mode: 'open'});
   shadow.innerHTML = '<style>p { color: red; }</style><p>Here is some new text</p>';*/
   //example about how to create a custom API
   var saulAPI = Object.create(HTMLElement.prototype);

   saulAPI.whois = function() {
     console.log('Fronted developer!!!!');
   }

   saulAPI.createdCallback = function() {
      // 1. Attach a shadow root on the element.
      var shadow = this.createShadowRoot();
      // 2. Fill it with markup goodness.
      shadow.innerHTML = '<style>.img-profile { height: 100px; }</style><img class="img-profile" src="http://saulburgos.com/img/saulburgos.jpg">';
   };

   //Registering the custom elements
   document.registerElement('saul-burgos', {prototype: saulAPI});

   //now we can use our own API
   var saul = document.querySelector('saul-burgos');
   saul.whois();
}

window.addEventListener('load', function() {
   createCustomElement();
   createCustomElementWithShadowDOM();
});

