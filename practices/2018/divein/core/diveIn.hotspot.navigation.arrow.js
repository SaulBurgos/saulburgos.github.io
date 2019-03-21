import { diveIn } from "./diveIn.js";
import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { RenderImage } from "./diveIn.render.image.js";

export class HotspotNavigationArrow extends Aggregation(Hotspot,RenderImage) {
	
	constructor(){
		super();
		this.type = 'arrow';
	}

	init(data){
		super.init(data);
	}

	triggerAction() {
		diveIn.Observer.broadcast('hotspotNavigationClicked', {
			currentTarget: this.type,
			sceneId: this.targetSceneId
		});		
	}
}