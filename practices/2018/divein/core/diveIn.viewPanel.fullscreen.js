import { Aggregation } from "./diveIn.utils.js";
import { ViewPanel } from "./diveIn.viewPanel.js";

export class FullScreen extends Aggregation(ViewPanel) {
	
	constructor(){
		super();
		this.type = 'fullscreen';
		this.containerSelector = 'viewer__fullscreen';
		this.template = 'http://localhost:8080/viewer/template/fullscreen.html';
        this.dependencies = [{
			type: 'css',
			url: 'http://localhost:8080/viewer/style/fullscreen.css'
        }];
        this.optionSelector = "js-viewer__fullscreen";
        this.activeClass = 'viewer__fullscreen--active';
        this.documentReference = document.documentElement;
        //TODO: try with container instead of documentElement (check if event is triggered)
	}

	init(data) {
		super.init(data).then(() => {
            jQuery('.' + this.containerSelector).on('click', '.' + this.optionSelector,() => {
                if(this.isFullScreen()) {
                    this.hide();
                } else {
                    this.show();
                }
            });
            this.listenToScreenChanges();
            this.updateStatus();
		});
    }
    
    show() {
        if (this.documentReference.requestFullscreen) {
            this.documentReference.requestFullscreen();
        } else if (this.documentReference.mozRequestFullScreen) { /* Firefox */
            this.documentReference.mozRequestFullScreen();
        } else if (this.documentReference.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            this.documentReference.webkitRequestFullscreen();
        } else if (this.documentReference.msRequestFullscreen) { /* IE/Edge */
            this.documentReference.msRequestFullscreen();
        }
    }

    hide() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }

    listenToScreenChanges() {        
        window.onresize = (event) => { 
            this.updateStatus();
        }; 
    }

    updateStatus() {
        if(this.isFullScreen()) {
            document.querySelector(`.${this.optionSelector}`).classList.add(this.activeClass);
        } else {
            document.querySelector(`.${this.optionSelector}`).classList.remove(this.activeClass);
        }
    }

    isFullScreen() {
        return (window.screen.height == window.innerHeight && window.screen.width == window.innerWidth);
    }

    update(){
    }

}