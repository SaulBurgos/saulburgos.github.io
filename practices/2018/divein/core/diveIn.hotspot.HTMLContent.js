import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { Modal } from "./diveIn.modal.js";

export class HotspotHTMLContent extends Aggregation(Hotspot,Modal)  {
	
	
	constructor() {
		super();
		this.type = 'HTMLContent';	 
		this.template = "template/HTMLContent.html";
		this.dependencies = [{
			type: 'css',
			url: 'viewer/style/HTMLContent.css'
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


