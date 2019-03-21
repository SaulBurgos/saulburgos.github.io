import { guid, loadDependencies, Aggregation } from "./diveIn.utils.js";
import { diveIn } from "./diveIn.js";

//TODO: Are we just adding editable to the main classes? 
//That would save us re-writing every class so they instantiate editable classes
export class Hotspot {

	constructor(){
		this.id = guid();
		this.type = 'base';
		this.dependencies = [];			
		this.aframeEntity;

		/*
			***HACK1: Preventing click listeners on hidden hotspots***
			When changing the scene, the hotspost don't get destroyed, but hidden.
			Hotspots get hidden by setting its visibility to false.
			However, when they are hidden, its events (e.g. click) keep triggering anyway, regardless its visibility. 
			This causes that, when hotspots in different scenes have the same position, only one of them will trigger.
			This hack, besides hidding them, takes care of moving the hotspots far away from the scene, where no click listener can capture the event.
		*/
		this.HELL_POSITION = '0 -666 0';
	}
	
	init(data) {		
		Object.assign(this,data);
		loadDependencies(this.dependencies);
		
		this.aframeEntity = diveIn.AframeApi.addOrUpdateGeometry(this);

		this.aframeEntity.addEventListener('click', (evt) => {

			diveIn.Observer.broadcast('hotspotClicked', {
				type: this.type,
				id: this.id
			});

			if(this.triggerAction) {
				this.triggerAction();
			}			
		});
	}

	show(){
		diveIn.AframeApi.setVisibility(this.aframeEntity, true);

		//HACK1
		//if we do this, we have to change everything in the AframeApi and change how it sends parameters
		//this.aframeEntity.object3D.position = this.position;
		diveIn.AframeApi.setEntityPosition(this.aframeEntity, this.position);
	}

	hide(){
		diveIn.AframeApi.setVisibility(this.aframeEntity, false);

		//HACK1
		//this.aframeEntity.object3D.position = this.HELL_POSITION;
		diveIn.AframeApi.setEntityPosition(this.aframeEntity, this.HELL_POSITION);
	}

	remove() {
		diveIn.AframeApi.removeEntity(this.aframeEntity);
	}

	setPosition(position) {
		this.position = position;
		diveIn.AframeApi.setEntityPosition(this.aframeEntity, this.position);
	}

}
