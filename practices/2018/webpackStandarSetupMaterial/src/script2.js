import { testing3 } from "./script3.js";

export class testing2 {
	constructor() {
		
	}

	foo() {
		console.log('foo from script 2');
		
		var imported = new testing3();
		imported.foo();
	}
}

