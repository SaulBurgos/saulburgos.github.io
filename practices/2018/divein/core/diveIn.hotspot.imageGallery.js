import { Hotspot } from "./diveIn.hotspot.js";
import { Aggregation } from "./diveIn.utils.js";
import { Modal } from "./diveIn.modal.js";

export class HotspotImageGallery extends Aggregation(Hotspot,Modal)  {
	
	
	constructor() {
		super();
		this.type = 'imageGallery';	 
		this.template = "template/imageGallery.html";
		this.dependencies = [{
			type: 'css',
			url: 'style/imageGallery.css'
			}
		];
        this.containerSelector = "imageGallery_Container";
		
		this.images;
        //TODO: This is following current CSS. Is it ok?
        this.maxColumns = 4;
	}

	init(data){
		super.init(data);
		this.images = data.options.images;
	}
	
	preRender() {
		//nothing delete later
	}

	load(){
		let container = document.getElementById(this.containerSelector);
		const imagesPerColumn = Math.ceil(this.images.length/this.maxColumns);
        let currentDiv = document.createElement('div');
        currentDiv.setAttribute('class', 'column');

		//TODO: Implement template engine instead of VanillaJS
        //TODO: Refactor for loop
        for (let i = 0; i < this.images.length; i++) {
            const image = this.images[i];

            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', image);

            currentDiv.appendChild(imgElement);

            if((i>0 && i%imagesPerColumn == 0) || i == this.images.length-1){
                container.appendChild(currentDiv);
                currentDiv = document.createElement('div');
                currentDiv.setAttribute('class', 'column');
            }
        }
	}

	triggerAction() {
		this.open();
	}

}


