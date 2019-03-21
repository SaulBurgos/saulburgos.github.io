import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { Modal } from "./diveIn.modal.js";

export class HotspotExternalVideo extends Aggregation(Hotspot,Modal)  {
	
	
	constructor() {
		super();
		this.type = 'externalVideo';	 
		this.template = "http://localhost:8080/viewer/template/externalVideo.html";
		this.dependencies = [{
			type: 'css',
			url: 'http://localhost:8080/viewer/style/externalVideo.css'
			}
		];
        this.containerSelector = "externalVideo_Container";

        this.externalVideoId;
        this.provider;
	}

	init(data){
		super.init(data);
		this.externalVideoId = data.options.externalVideoId;
        this.provider =  data.options.provider;
	}
	
	preRender() {
		//nothing delete later
	}

	load(){
        let container = document.getElementById(this.containerSelector);
        let videoContainer;

        switch (this.provider) {
            case 'youtube':
                videoContainer = document.createElement('iframe'); 
                videoContainer.setAttribute('width', '875');
                videoContainer.setAttribute('height', '364');
                videoContainer.setAttribute('frameborder', '0');
                videoContainer.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
                videoContainer.setAttribute('allowfullscreen', '');
                videoContainer.setAttribute('src', `https://www.youtube.com/embed/${this.externalVideoId}`);
                break;

            case 'vimeo':
                videoContainer = document.createElement('iframe'); 
                videoContainer.setAttribute('width', '640');
                videoContainer.setAttribute('height', '360');
                videoContainer.setAttribute('frameborder', '0');
                videoContainer.setAttribute('webkitallowfullscreen', '');
                videoContainer.setAttribute('mozallowfullscreen', '');
                videoContainer.setAttribute('allowfullscreen', '');
                videoContainer.setAttribute('src', `https://player.vimeo.com/video/${this.externalVideoId}`);
                break;
        
            default:
                videoContainer = document.createElement('div');
                videoContainer.innerHTML = "<h1>Provider not supported.</h1>";
                break;
        }

        container.appendChild(videoContainer);
	}

	triggerAction() {
		this.open();
	}

}


