import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { RenderImage } from "./diveIn.render.image.js";
import { diveIn } from "./diveIn.js";

export class HotspotImage extends Aggregation(Hotspot, RenderImage) {
	
	constructor(){
		super();
		this.type = 'image';
	}

	triggerAction() {
		var pos = diveIn.AframeApi.entityPositionToVector2Screen(this.aframeEntity);
		jQuery('#icon2d').css({
			left: pos.x,
			top: pos.y
		});

	}

	update() {
		//diveIn.AframeApi.setImageAttributes(this.aframeEntity, this);
		//this.aframeEntity.setAttribute('position', this.position);
		console.log('Current entity position: ' + this.aframeEntity.position);
		console.log('Position saved to update: ' + this.position);
		let positionArray = this.position.split(' ');
		this.aframeEntity.object3D.position.set(positionArray[0], positionArray[1], positionArray[2]); 

		console.log('AFTER UPDATE:');
		let object3DPosition = this.aframeEntity.object3D.position;
		let object3DWorldPosition = this.aframeEntity.object3D.getWorldPosition();
		let meshPosition = this.aframeEntity.getObject3D('mesh').position;
		let meshWorldPosition = this.aframeEntity.getObject3D('mesh').getWorldPosition();
		console.log(`object3DPosition: ${object3DPosition.x} ${object3DPosition.y} ${object3DPosition.z}`);
		console.log(`object3DWorldPosition: ${object3DWorldPosition.x} ${object3DWorldPosition.y} ${object3DWorldPosition.z}`);
		console.log(`meshPosition: ${meshPosition.x} ${meshPosition.y} ${meshPosition.z}`);
		console.log(`meshWorldPosition: ${meshWorldPosition.x} ${meshWorldPosition.y} ${meshWorldPosition.z}`);
		this.preRender();
	}

}