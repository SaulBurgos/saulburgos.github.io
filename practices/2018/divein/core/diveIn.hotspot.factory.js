import { diveIn } from "./diveIn.js"

export class HotspotFactory  {

	static create(data) {
		let newHotspot;

		//TODO: Refactor this!
		switch (data.type) {
			case 'HTMLContent':
				newHotspot = new diveIn.HotspotHTMLContent();
				break;
			case 'imageGallery':
				newHotspot = new diveIn.HotspotImageGallery();
				break;
			case 'externalVideo':
				newHotspot = new diveIn.HotspotExternalVideo();
				break;
			case 'video':
				newHotspot = new diveIn.HotspotVideo();
				break;
			case 'navigation':
				

				switch (data.shape) {
					case 'text':
						newHotspot = new diveIn.HotspotNavigationText(data);		
						break;
					case 'image':
						newHotspot = new diveIn.HotspotNavigationImage(data);		
						break;
				}
				
				break;		
			case 'image':
				newHotspot = new diveIn.HotspotImage();				
				break;
			case 'text':
				newHotspot = new diveIn.HotspotText();
				break;
			case 'sound':
				newHotspot = new diveIn.HotspotSound();
				break;
			case 'arrow':
				newHotspot = new diveIn.HotspotNavigationArrow();
				break;
		}

		if(!newHotspot){
			throw `Hotspot type ${data.type} does not exist`
		}

		newHotspot.init(data);
		return newHotspot;
	}
}