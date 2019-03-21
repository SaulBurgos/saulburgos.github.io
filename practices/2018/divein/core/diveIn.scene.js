import { diveIn } from './diveIn.js';

class SceneBase {

	constructor(data) {
		// Load Hotspots
		this.hotspots = [];
		for (let index = 0; index < data.hotspots.length; index++) {
			this.hotspots.push(diveIn.HotspotFactory.create(data.hotspots[index]));
		}

		this.type = 'base';	

		//Load setting variables
		this.imgUrl = data.imgUrl;
		this.name = data.name;
		this.thumbnail = data.thumbnail;
		this.id = data.id;
		this.north = data.north;
		this.initialPov = data.initialPov;
		this.DEFAULT_POV = {x: 0, y: 0, z: 0};
		this.isLoaded = false;
	}

	load() {
		this.renderElements();
	}
	
	unload() {
		this.hotspots.forEach(element => {
			element.hide();
		});
	}
	
	renderElements(){
		diveIn.AframeApi.addAssetImage(this.id,this.imgUrl).then((assetId) => {
			diveIn.AframeApi.setSky(assetId);

			if(this.isLoaded){
				this.hotspots.forEach(element => {
					element.show();
				});
			} else {
				this.hotspots.forEach(element => {
					element.preRender();
				});
				
				diveIn.AframeApi.renderHotspots(this.hotspots);
				this.setIsLoaded();
			}

			if(this.initialPov != undefined){
				diveIn.AframeApi.changeCameraPointOfView(this.initialPov);
			} else {
				diveIn.AframeApi.changeCameraPointOfView(this.DEFAULT_POV);
			}

			diveIn.Observer.broadcast('sceneChanged', {			
				scene: this
			});
		});		
	}

	setIsLoaded(){
		this.isLoaded = true;
	}

	update() {
		this.renderElements();
	}

	remove() {
		this.removeHotspots();
		diveIn.AframeApi.setSky();
	}

	removeHotspots() {
		for (let i = this.hotspots.length - 1; i >= 0; i--) {
			this.removeHotspot(this.hotspots[i]);
		}
	}

	removeHotspot(hotspot) {
		hotspot.remove();
		const index = this.hotspots.indexOf(hotspot);
    	this.hotspots.splice(index, 1);
	}

	addHotspot(hotspot) {
		hotspot.init();
		hotspot.preRender();
		diveIn.AframeApi.renderHotspots([hotspot]);
		this.hotspots.push(hotspot);
	}
	
}

export class Scene extends SceneBase {
	constructor(data) {
		super(data);
	}
}