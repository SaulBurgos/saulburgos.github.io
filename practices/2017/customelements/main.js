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

//old way
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

//new way to do it 2017, problem is not full supported
function createCustomElementWithShadowDOM2() {
   // Create a class for the element
   class catFrame extends HTMLElement {
      constructor() {
         // Always call super first in constructor
         super();

         // Create a shadow root
         var shadow = this.attachShadow({mode: 'open'});

         // Create a standard img element and set it's attributes.
         var img = document.createElement('img');
         img.alt = this.getAttribute('data-name');
         img.src = this.getAttribute('data-img');
         img.width = '150';
         img.height = '150';

         //you can use any normal method to add element to the shadow DOM
         shadow.appendChild(img);

         // Add an event listener to the image.
         img.addEventListener('click', () => {
            window.location = this.getAttribute('data-url');
         });

         // Create a link to the product.
         var link = document.createElement('a');
         link.innerText = this.getAttribute('data-name');
         link.href = this.getAttribute('data-url'); //if you want
         link.className = 'product-name';

         // Add the link to the shadow root.
         shadow.appendChild(link);
      }
   }

   // Define the new element
   customElements.define('cat-frame', catFrame);
}

window.addEventListener('load', function() {
   createCustomElement();
   createCustomElementWithShadowDOM();
   createCustomElementWithShadowDOM2();
});

