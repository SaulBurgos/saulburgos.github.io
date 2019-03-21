import { diveIn } from "./diveIn.js";
import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { RenderText } from "./diveIn.render.text.js";

export class HotspotNavigationText extends Aggregation(Hotspot,RenderText) {

	constructor(){
		super();
		this.type = 'navigation';
	}

	triggerAction() {
		diveIn.Observer.broadcast('hotspotNavigationClicked', {
			currentTarget: this.type,
			sceneId: this.targetSceneId
		});
	}
}