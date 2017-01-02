'use strict';
var practice = new function() {

	window.addEventListener('load', function() {
      var shadow = document.querySelector('#hostElement').attachShadow({mode: 'open'});
      shadow.innerHTML = '<style>p { color: red; }</style><p>Here is some new text</p>';
  	});

}
