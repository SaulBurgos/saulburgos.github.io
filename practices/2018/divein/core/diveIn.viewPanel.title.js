import { Aggregation } from "./diveIn.utils.js";
import { ViewPanel } from "./diveIn.viewPanel.js";

export class Title extends Aggregation(ViewPanel) {

	constructor(){
		super();
		this.type = 'title';
		this.containerSelector = 'viewer__title';
		this.timeOut = 1000;
		this.titleEffect = 'show--fade';
		//this.container = jQuery(`<div class="${ this.containerSelector } zIndex--2 overContent overContent--topCenter"></div>`);
		// this.container = document.createElement('div');
		// this.container.setAttribute('class', `${ this.containerSelector } zIndex--2 overContent overContent--topCenter`);
		this.template = 'http://localhost:8080/viewer/template/title.html';
		this.dependencies = [{
			type: 'css',
			url: 'http://localhost:8080/viewer/style/title.css'
		}];
		this.title = '';
		this.secondaryTitle = '';
		this.titleSelector = 'titleContainer_label';
		this.secondaryTitleSelector = 'secondaryTitleContainer_label';
	}

	init(data) {
		super.init(data).then(() => {
			document.querySelector(`.${this.containerSelector}`).addEventListener("mouseover", () => {
				document.querySelector(`.${this.containerSelector}`).classList.add(this.titleEffect);
			  });
			  document.querySelector(`.${this.containerSelector}`).addEventListener("mouseleave", () => {
				document.querySelector(`.${this.containerSelector}`).classList.remove(this.titleEffect);
			}, false);
		});
	}

	setSecondatyTitle(text) {
		this.secondaryTitle = text;
	}

	renderTitle() {
		jQuery('.' + this.titleSelector).text(`${this.title}`);
		document.querySelector(`.${this.containerSelector}`).setAttribute('title', this.title);
		jQuery('.' + this.secondaryTitleSelector).text(`${this.secondaryTitle}`);
		document.querySelector(`.${this.secondaryTitleSelector}`).setAttribute('title', this.secondaryTitle);
	}

	onSceneChange() {
		var container = document.querySelector(`.${this.containerSelector}`);		 		
		container.classList.add(this.titleEffect); 		
		var that = this;
		setTimeout(function () {			
			container.classList.remove(that.titleEffect);					
		}, this.timeOut)
	}
	//TODO: Elipsis

	update(data){
		this.title = data.scene.name;
		this.renderTitle();
		this.onSceneChange();
	}
}
