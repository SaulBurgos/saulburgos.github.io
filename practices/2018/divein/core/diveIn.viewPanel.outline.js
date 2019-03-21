import { Aggregation } from "./diveIn.utils.js";
import { ViewPanel } from "./diveIn.viewPanel.js";
import { diveIn } from './diveIn.js';

export class Outline extends Aggregation(ViewPanel) {
	
	constructor(){
		super();
		this.type = 'outline';
		this.containerSelector = 'viewer__outline';
		this.activeClass = "outline-container--open";
		this.contentClass = "outline-container";
		this.selectorClass = "viewer__outline-button";
		this.isOpen = false;
		this.currentScene = "";

		this.scenes = [];
		this.scenesSelector = 'outline-content';
		this.singleSceneSelector = 'outline-content__scene';

		this.template = 'template/outline.html';
		this.dependencies = [{
			type: 'css',
			url: 'style/outline.css'
		}];
	}

	init(data) {
		super.init(data).then(() => {
			this.renderScenes();
		});
	}

	setScenes(scenes) {
		this.scenes = scenes;	
	}

	renderScenes () {
		let scenesDiv = document.querySelector('.'+this.scenesSelector);
		scenesDiv.innerHTML = '';

		for (let index = 0; index < this.scenes.length; index++) {
			const scene = this.scenes[index];
		
			scenesDiv.innerHTML += 
				`<div class="outline-content__scene" data-scene-id="${ scene.id }">
					<img src="${scene.thumbnail}" alt="" class="outline-content__scene-image ">
					<p>
					${scene.name}
					</p>
					<div class="visited-icon-container">
						<svg class="outline-content__scene-visited-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							viewBox="0 0 508.52 508.52" style="enable-background:new 0 0 508.52 508.52;" xml:space="preserve">
						<g>
							<g>
								<g>
									<g>
										<path d="M254.26,0C113.845,0,0,113.845,0,254.26s113.845,254.26,254.26,254.26
											s254.26-113.845,254.26-254.26S394.675,0,254.26,0z M254.26,476.737c-122.68,0-222.477-99.829-222.477-222.477
											c0-122.68,99.797-222.477,222.477-222.477c122.649,0,222.477,99.797,222.477,222.477
											C476.737,376.908,376.845,476.737,254.26,476.737z"/>
										<path d="M365.626,153.128c-10.234-6.738-24.059-3.846-30.797,6.452L227.531,323.546l-51.297-47.483
											c-9.026-8.327-23.106-7.787-31.465,1.24s-7.787,23.074,1.24,31.433l70.907,65.567l0.826,0.54l1.684,1.716l3.051,1.176
											l3.655,1.494l3.719,0.604l5.339-0.064l2.161-0.54l6.229-2.606l0.985-0.667l3.814-2.765l1.78-2.956l0.095-0.127l121.79-186.086
											C378.784,173.659,375.891,159.866,365.626,153.128z"/>
									</g>
								</g>
							</g>
						</g>
						</svg>
					</div>
				</div>`;
		}

		let elementsArray = document.querySelectorAll('.'+this.singleSceneSelector);
		elementsArray.forEach(function(elem) {
			elem.addEventListener("click", function() {
				diveIn.Observer.broadcast('hotspotNavigationClicked', {
					sceneId: elem.dataset.sceneId
				});
			});
		});

		document.querySelector('.'+this.selectorClass).addEventListener('click', () => {
			if(this.isOpen){
				this.hide();
			}
			else{
				this.show();
			}
			this.isOpen = !this.isOpen;
		});
	}

	setSceneStateClass(scene) {
		let sceneContainer = document.querySelector(`.outline-content__scene[data-scene-id="${ scene.id }"]`);

		if(scene.id == this.currentScene) {
			sceneContainer.classList.remove('outline-content__scene--visited');
			sceneContainer.classList.add('outline-content__scene--active','viewer--text-active');
		}
		else{
			if(scene.visited) {
				sceneContainer.classList.add('outline-content__scene--visited');
				sceneContainer.classList.remove('outline-content__scene--active','viewer--text-active');
			}
		}
	}

	show() {
		document.querySelector(`.${this.contentClass}`).classList.add(this.activeClass);
    }

    hide() {
        document.querySelector(`.${this.contentClass}`).classList.remove(this.activeClass);
    }

	update(data) {	
		this.currentScene = data.scene.id;
		for (let index = 0; index < this.scenes.length; index++) {
			const scene = this.scenes[index];
			
			if(scene.id ==  data.scene.id) {
				scene.visited = true;
			}

			this.setSceneStateClass(scene);
		}
	}

}