import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { RenderImage } from "./diveIn.render.image.js";

export class HotspotSound extends Aggregation(Hotspot,RenderImage)  {
	
	constructor(){
		super();
		this.type = 'sound';
		this.instanceSound;
	}

	triggerAction() {
		//promise to show progress of laoding sound
		//failed notifications
		//notification of playing

		if(!this.instanceSound) {
			this.instanceSound = new Audio(this.options.soundUrl)
			this.instanceSound.play();
		} else {
			if(this.instanceSound.paused){
				this.instanceSound.load();
				this.instanceSound.play();
			} else {
				this.instanceSound.pause();
			}
		}
		
	}

	hide() {
		super.hide();
		if(this.instanceSound){
			this.instanceSound.pause();
		}
	}
	
}