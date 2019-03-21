import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { RenderVideo } from "./diveIn.render.video.js";
import { diveIn } from "./diveIn.js";

export class HotspotVideo extends Aggregation(Hotspot, RenderVideo) {

	constructor() {
		super();	
		this.type = 'video';					
	}

	init(data){
		super.init(data);
	}

	triggerAction() {
		let video = document.getElementById(this.aframeEntity.id);
		if (video.paused) {
			video.play(); 
		} else { 
			video.pause(); 
		} 
	}

	hide() {
		super.hide();
		let video = document.getElementById(this.aframeEntity.id);
		video.pause();
	}

	show() {
		super.show();
		let video = document.getElementById(this.aframeEntity.id);
		if(video.paused){
			video.load();
		}
	}

}
