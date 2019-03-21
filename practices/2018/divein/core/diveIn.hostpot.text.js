import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { RenderText } from "./diveIn.render.text.js";
import { diveIn } from "./diveIn.js";

export class HotspotText extends Aggregation(Hotspot,RenderText)  {
 	constructor(){
		super();
		this.type = 'text';
	}

	update(){
		diveIn.AframeApi.setTextAttributes(this.aframeEntity, this);
	}
}