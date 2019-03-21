import { Aggregation } from "./diveIn.utils.js";
import { ViewPanel } from "./diveIn.viewPanel.js";

export class Counter extends Aggregation(ViewPanel) {

	constructor() {
		super();
		this.type = 'counter';
		this.containerSelector = 'counterContainer';
		//this.container = `<div class="${this.containerSelector} zIndex--2 overContent overContent--topRight"></div>`;
		this.container = document.createElement('div');
		this.container.setAttribute('class', `${this.containerSelector} zIndex--2 overContent overContent--topRight`)
		this.counterSelector = 'counterContainer_label';
		this.template = 'template/counter.html';
		this.dependencies = [{
			type: 'css',
			url: 'style/counter.css'
		}];
		this.clickedHotspots = 0;
		this.totalHotspots = 0;
	}

	init(data) {
		super.init(data).then(() => {
			this.renderCounter();
		});
	}

	setHotspots(hotspots) {
		this.hotspots = hotspots;
	}

	renderCounter() {
		this.totalHotspots = Object.keys(this.hotspots).length;
		this.clickedHotspots = 0;

		for (const [key, value] of Object.entries(this.hotspots)) {
			if (value) {
				this.clickedHotspots++;
			}
		}

		jQuery('.' + this.counterSelector).text(`${this.clickedHotspots}/${this.totalHotspots}`);
	}

	updateHotspotStatus(hotspotId) {
		if(typeof this.hotspots[hotspotId] !== 'undefined' && this.hotspots[hotspotId] !== true) {
			this.hotspots[hotspotId] = true;
			this.renderCounter();
		}
	}

	update(){

	}

}