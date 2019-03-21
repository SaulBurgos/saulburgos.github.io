import { diveIn } from "./diveIn.js";

export class RenderVideo {
	
	preRender() {
		diveIn.AframeApi.addAssetVideo(this.id, this.options).then(x => {
			this.assetId = x;
			diveIn.AframeApi.setMaterial(this.aframeEntity, this.assetId);
		});
	}
}