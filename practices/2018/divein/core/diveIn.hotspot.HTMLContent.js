import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { Modal } from "./diveIn.modal.js";

export class HotspotHTMLContent extends Aggregation(Hotspot,Modal)  {
	
	
	constructor() {
		super();
		this.type = 'HTMLContent';	 
		this.template = "http://localhost:8080/viewer/template/HTMLContent.html";
		this.dependencies = [{
			type: 'css',
			url: 'http://localhost:8080/viewer/style/HTMLContent.css'
			}
		];
		this.content;
		this.containerSelector = "HTMLContent_Container";
	}

	init(data){
		super.init(data);
		this.content = data.options.content;
	}
	
	preRender() {
		//nothing delete later
	}

	load(){
		document.getElementById("HTMLContent_Container").innerHTML = this.content;
	}

	triggerAction() {
		this.open();
	}

}


