//webpack detect all the dependencies via import in chain
import { testing2 } from "./script2.js";

//webpack detect this and insert the css on the dom using the "css loader" 
//in this way we only use the css that we need on the UI
import './css/main.css'; 
import './css/styleSass.scss'; //using the Sass loader

import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple';

const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));
const username = new MDCTextField(document.querySelector('.username'));
const password = new MDCTextField(document.querySelector('.password'));


let temportal = {

	temp1: function () {
		console.log('foo from script 1 saul');
		
		var imported = new testing2();
		imported.foo();
	},

	temp2: function () {
		
	}
};

//
temportal.temp1();