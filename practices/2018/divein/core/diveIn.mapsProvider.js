import { GoogleMapsApi } from "./diveIn.googleMapsApi.js";

export class MapsProvider {

	constructor() {
		this.providerList = {
            GoogleMaps: GoogleMapsApi
            //Here you can reference other APIs (OpenMaps, etc.)
            //They have to be classes that have the same methods.
            //This class name must match the name that comes from the db
        };
        this.provider;
        this.ready;
        this.onReadyPromise;
    }

    init(provider){
        this.provider = new this.providerList[provider];
        this.onReadyPromise = this.provider.init();
        return this.onReadyPromise;
    }

    setMarkers(markers){
		this.provider.setMarkers(markers);
	}

    loadMap(){
        this.provider.loadMap();
    }

    parseMarkers(){
        this.provider.parseMarkers();
    }

    showMarkers(){
        this.provider.showMarkers();
    }

    updateMarkers(data){
        this.provider.updateMarkers(data);
    }
    
}