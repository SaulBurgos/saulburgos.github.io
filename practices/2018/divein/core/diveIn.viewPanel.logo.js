import { Aggregation } from "./diveIn.utils.js";
import { ViewPanel } from "./diveIn.viewPanel.js";

export class Logo extends Aggregation(ViewPanel) {
	
	constructor(){
		super();
		this.type = 'logo';
		this.containerSelector = 'viewer__logo';
		this.template = 'http://localhost:8080/viewer/template/logo.html';
		this.dependencies = [{
			type: 'css',
			url: 'http://localhost:8080/viewer/style/logo.css'
		}];
		this.logoURL = '';
		this.logoSelector = 'viewer__logo-img';
	}

	init(data) {
		super.init(data).then(() => {
			this.renderLogo();
		});
	}
	
	setURL(url) {
		this.logoURL = url;
	}

	renderLogo() {
		let image = document.querySelector('.' + this.logoSelector).src = this.logoURL;
	}
	
	update(data){
		
	}
}