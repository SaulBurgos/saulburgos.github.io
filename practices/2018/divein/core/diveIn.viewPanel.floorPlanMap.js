import { Aggregation } from "./diveIn.utils.js";
import { ViewPanel } from "./diveIn.viewPanel.js";
import { MapsProvider } from './diveIn.mapsProvider.js';

export class FloorPlanMap extends Aggregation(ViewPanel) {
	
	constructor(){
		super();
		this.type = 'floorPlanMap';
		this.containerSelector = `${this.type}Container`;
		/*this.container =  	`<div class="${this.containerSelector}_openButton overContent overContent--centerRight zIndex--2">
								<i class="fa fa-map" aria-hidden="true"></i>
							</div>
							<div class="${ this.containerSelector } zIndex--2 overContent"></div>`;		*/
	

		this.container = document.createElement('div');
		this.container.setAttribute('class', `${ this.containerSelector } zIndex--2 overContent`);

		this.openButton = document.createElement('div');
		this.openButton.setAttribute('class', `${this.containerSelector}_openButton overContent overContent--centerRight zIndex--2`);
		this.openIcon = document.createElement('i');
		this.openIcon.setAttribute('class', `fa fa-map`);
		this.openIcon.setAttribute('aria-hidden', `true`);
		this.openButton.appendChild(this.openIcon);

		this.template = 'http://localhost:8080/viewer/template/floorPlanMap.html';
		this.dependencies = [{
				type: 'css',
				url: 'http://localhost:8080/viewer/style/floorPlan.css'
			},
			{
				type: 'css',
				url: 'http://localhost:8080/viewer/style/floorPlanMap.css'
			}
		];

		this.options;
		this.markers;
		this.mapProvider;
	}

	setOptions(options){
		this.options = options;
	}

	setMarkers(markers){
		this.markers = markers;
	}

	init(data) {

		super.init(data).then(() => 
		{
			this.mapProvider = new MapsProvider();
			
			this.mapProvider.init(this.options.provider).then(() => {
				this.mapProvider.setMarkers(this.markers);
				this.mapProvider.loadMap();
				this.mapProvider.parseMarkers();
				this.mapProvider.showMarkers();
				this.mapProvider.ready = true;
			});

		});	
		
	}

	updateMarkers (data) {
		this.mapProvider.updateMarkers(data);
	}

	update(data) {	
		if(this.mapProvider.ready) {
			this.updateMarkers(data);
		}
		else {
			this.mapProvider.onReadyPromise.then(()=> {
				this.updateMarkers(data);
			})
		}	
	}

}