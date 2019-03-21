import { loadDependencies } from "./diveIn.utils.js";
import { diveIn } from './diveIn.js';

export class GoogleMapsApi {

	constructor() {
		this.dependencies = [
            {
                type: 'js',
                url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZGrVWriHW_w5qmievk9AyBNaFFK6e1vM'
            }
        ];

        this.map;
		this.markers;
    }

    init(){
        let GoogleMapsPromise = new Promise((resolve, reject) => {

            loadDependencies(this.dependencies).then(() => {
                resolve();
            });

        });

        return GoogleMapsPromise;
    }

    setMarkers(markers){
		this.markers = markers;
	}

    loadMap(){
        this.map = new google.maps.Map(document.getElementById('map'), {
			//Default values. Custom values will be specified later
			center: {lat: 0, lng: 0},
			zoom: 1
		});	
    }

    parseMarkers(){
        this.markers.forEach(element => {

			let marker = new google.maps.Marker({
				position: {
					lat: element.lat,
					lng: element.lng
				}
			});

			marker.addListener('click', () => {
				diveIn.Observer.broadcast('hotspotNavigationClicked', {
					currentTarget: this.type,
					sceneId: element.targetSceneId
				});
			});

			element.mapMarker = marker;
		});
    }

    showMarkers(){
        let bounds  = new google.maps.LatLngBounds();

		this.markers.forEach(element => {
			element.mapMarker.setMap(this.map);
			bounds.extend(element.mapMarker.position);
		});

		this.map.fitBounds(bounds); //auto-zoom
		this.map.panToBounds(bounds); //auto-center
    }

    updateMarkers(data){
        let found = this.markers.find(function(element) {
			return element.targetSceneId == data.scene.id;
		});

		if(found){
			found.mapMarker.setIcon({
				url: 'https://s3-us-west-2.amazonaws.com/saulbpano/resources/marker_green.png', 
				scaledSize: new google.maps.Size(27, 43),
			}); 
		}
    }
    
}
