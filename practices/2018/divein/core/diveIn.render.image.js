import { diveIn } from "./diveIn.js";

export class RenderImage {
	
	preRender() {
		diveIn.AframeApi.addAssetImage(this.id, this.options.imgUrl).then(x => {
			this.assetId = x;
			diveIn.AframeApi.setMaterial(this.aframeEntity, this.assetId);
		});
	}
}