import {guid} from "./diveIn.utils.js"
import { diveIn } from './diveIn.js';
/*import * as DragControls from '../webApp/src/libs/aframe/DragControls.js';*/

export class AframeApi {

	constructor(){
		this.scene =  undefined;
		this.assets =  undefined;
		this.sky = undefined;
		this.camera = undefined;
		this.cameraCursor = undefined;
		this.cameraRig  = undefined;
		this.camera = undefined;
		this.cursor = undefined;
		this.clickAnimation = undefined;
		this.cursorAnimation = undefined;
		this.arrowContainer = undefined;
		this.isBuilder = undefined;
	}

	//TODO: For position and rotation, replace setAttribute to object3D EVERYWHERE(?)
	//TODO: .setAttribute to JSON handling or something like that

	static addContainer (data) {
		let promise = new Promise((resolve, reject) => {
			
			this.scene = document.createElement('a-scene');
			this.scene.setAttribute('aframe-init','');
			this.scene.setAttribute('debug','');
			this.scene.setAttribute('vr-mode-ui','enabled: false');
			this.scene.setAttribute('keyboard-shortcuts', 'enterVR: false');

			if(data.embedded){
				this.scene.setAttribute('embedded', 'true');
			}

			if(data.debug){
				this.scene.setAttribute("stats","");
			}

			this.assets = document.createElement('a-assets');

			this.sky = document.createElement('a-sky');	
			this.sky.setAttribute('side', 'back');

			this.cameraRig = document.createElement('a-entity');
			//this.cameraRig.setAttribute('look-controls','reverseMouseDrag: true');

			this.camera = document.createElement('a-camera');
			this.camera.setAttribute('mouse-cursor', '');
			this.camera.setAttribute('rotation-tracker', '');
			//this.camera.setAttribute('look-controls', 'reverseMouseDrag: true');

			this.cursor = document.createElement('a-cursor');
			this.cursor.setAttribute('id', 'cursor');
			this.cursor.setAttribute('cursor', 'rayOrigin: mouse');

			this.clickAnimation = document.createElement('a-animation');
			this.clickAnimation.setAttribute('begin', 'click');
			this.clickAnimation.setAttribute('easing', 'ease-in');
			this.clickAnimation.setAttribute('attribute', 'scale');
			this.clickAnimation.setAttribute('fill', 'backwards');
			this.clickAnimation.setAttribute('from', '0.1 0.1 0.1');
			this.clickAnimation.setAttribute('to', '1 1 1');
			this.clickAnimation.setAttribute('dur', '150');

			this.cursorAnimation = document.createElement('a-animation');
			this.cursorAnimation.setAttribute('begin', 'cursor-fusing');
			this.cursorAnimation.setAttribute('easing', 'ease-in');
			this.cursorAnimation.setAttribute('attribute', 'scale');
			this.cursorAnimation.setAttribute('fill', 'backwards');
			this.cursorAnimation.setAttribute('from', '1 1 1');
			this.cursorAnimation.setAttribute('to', '0.1 0.1 0.1');
			this.cursorAnimation.setAttribute('dur', '1500');

			this.arrowContainer = document.createElement('a-entity');
			this.arrowContainer.setAttribute('position', '0 -1.8 -3');
			this.arrowContainer.setAttribute('world-relative', '');

			this.cursor.appendChild(this.clickAnimation);
			this.cursor.appendChild(this.cursorAnimation);
			this.camera.appendChild(this.cursor);
			this.camera.appendChild(this.arrowContainer);
			this.cameraRig.appendChild(this.camera);
			this.scene.appendChild(this.assets);
			this.scene.appendChild(this.sky);	
			this.scene.appendChild(this.cameraRig);

			data.container.appendChild(this.scene);
			data.container.setAttribute('class', 'viewer');

			this.isBuilder = data.isBuilder;

			try {
				AFRAME.registerComponent('aframe-init', {
					init: function () {
						resolve();
					}
				});
	
				this.registerComponents();
			} catch (error) {
				console.log("Component registration executed again!!!");
			}
			
			
		});
		return promise;
	}

	static registerComponents(){

		AFRAME.registerComponent('rotation-tracker', {
			tock: () => {
				//Broadcast only if rotation changed
				const cameraRotation = this.camera.getAttribute('rotation');
				const cameraCoords = AFRAME.utils.coordinates.stringify(cameraRotation);

				const rigRotation = this.cameraRig.getAttribute('rotation');
				const rigCoords = AFRAME.utils.coordinates.stringify(rigRotation);

				if(this.lastCameraCoords !== cameraCoords || this.lastRigCoords !== rigCoords){
				//if(this.lastCameraCoords !== cameraCoords){ //better with camerarig, so it validates when we change the rig as well
					diveIn.Observer.broadcast('povChanged', {
						cameraRotation: cameraRotation,
						cameraRigRotation: rigRotation
					});
					
					this.lastCameraCoords = cameraCoords;
					this.lastRigCoords = rigCoords;
				}

			}
		});

		AFRAME.registerComponent('world-relative', {
			schema: { default: '' },
	
			tock: function (t) {
				var object3D = this.el.object3D;
				object3D.rotateY(object3D.getWorldRotation().y * -1);
				object3D.rotateX(object3D.getWorldRotation().x * -1);
				object3D.rotateZ(object3D.getWorldRotation().z * -1);
			}
		});

		if(this.isBuilder) {
			AFRAME.registerComponent('draggable', {
				init: function () {
					  var dragControls = new THREE.DragControls([this.el.getObject3D('mesh')], AframeApi.scene.camera, AframeApi.scene.renderer.domElement);
		
					dragControls.addEventListener('dragstart', () => {
						AframeApi.lockCamera();
					});

					dragControls.addEventListener('drag', () => {
						this.el.object3D.lookAt( AframeApi.scene.camera.position );
					 });
				  
					dragControls.addEventListener('dragend', () => {
						AframeApi.unlockCamera();

						let limit = 4;
						let meshWorldPosition = this.el.getObject3D('mesh').getWorldPosition();

						let meshWorldX = meshWorldPosition.x;
						let meshWorldY = meshWorldPosition.y;
						let meshWorldZ = meshWorldPosition.z;

						meshWorldX = (meshWorldX > limit) ? limit : meshWorldX;
						meshWorldX = (meshWorldX < -limit) ? -limit : meshWorldX;
						meshWorldY = (meshWorldY > limit) ? limit : meshWorldY;
						meshWorldY = (meshWorldY < -limit) ? -limit : meshWorldY;
						meshWorldZ = (meshWorldZ > limit) ? limit : meshWorldZ;
						meshWorldZ = (meshWorldZ < -limit) ? -limit : meshWorldZ;

						let newPosition = `${meshWorldX} ${meshWorldY} ${meshWorldZ}`;						

						this.el.diveInHotspot.setPosition(newPosition);
						this.el.object3D.lookAt( AframeApi.scene.camera.position );
						
						let mesh = this.el.getObject3D('mesh');
						mesh.position.set(0,0,0);
					});
				}
			});  
		}
		

	}

	static addAssetImage (id, url) {
		let promise = new Promise((resolve, reject) => {

			if(url === undefined || url == '') {
				resolve();
			}

			let img;
			let assetId = id ? id :  'asset_' + guid();

			if(document.getElementById(id)) {
				img = document.getElementById(id);
				img.src = '';
				jQuery(img).one('load',function(){
					resolve(assetId);
				}).attr({
					src: url
				});
			} else {
				img = new Image();
				img.setAttribute('id',assetId);
				img.setAttribute('crossorigin','anonymous');
				
				jQuery(img).on('load',function(){
					resolve(assetId);
				}).attr({
					  src: url
				});
	
				this.assets.appendChild(img);
			}
									
		});

		return promise;
	}

	static addAssetVideo (id, options) {
		let promise = new Promise((resolve, reject) => {
			let assetId = id ? id :  'asset_' + guid();
			var video = document.createElement('video');
			video.setAttribute('id', assetId);
			video.setAttribute('crossorigin','anonymous');
			
			if(options.autoplay){
				video.setAttribute('autoplay', '');
			}
			if(options.loop){
				video.setAttribute('loop', 'true');
			}
			
			jQuery(video).on('loadstart',function(){
				resolve(assetId);
			}).attr({
  				src: options.videoUrl
			});

			this.assets.appendChild(video);						
		});

		return promise;
	}

	static setSky (assetId) {		
		this.sky.setAttribute('src','');
		if(assetId !== undefined && assetId !== ''){
			this.sky.setAttribute('src','#' + assetId);
		}
	}

	static updateCameraRotationOnYAxis(rotationY){
		let cameraY = this.camera.getAttribute('rotation').y;
		this.cameraRig.object3D.rotation.y = THREE.Math.degToRad(rotationY - cameraY);
	}

	static changeCameraPointOfView(newRotation){
		//TODO: Scene gets crazy when x or z is moved
		let cameraY = this.camera.getAttribute('rotation').y;
		this.cameraRig.object3D.rotation.y = THREE.Math.degToRad(newRotation.y - cameraY);
	}

	static renderHotspots(hotspots) {
		hotspots.forEach((hotspot) => {
			//Benjamin suggests that this will be replaced by a dictionary.
			switch (hotspot.type) {
				case "arrow":
					this.arrowContainer.appendChild(hotspot.aframeEntity);
					break;
				default:
					this.scene.appendChild(hotspot.aframeEntity);
					break;
			}
		});
	}

	static setVisibility(aframeEntity, flag){
		aframeEntity.setAttribute("visible", flag);
	}

	static addOrUpdateGeometry (data) {
		let aframeEntity;

		switch (data.shape) {
			case 'circle':
				aframeEntity = document.createElement('a-circle');
				this.setCircleAttributes(aframeEntity, data); 
				break;
			case 'plane':
				aframeEntity = document.createElement('a-plane');
				this.setPlaneAttributes(aframeEntity, data); 
				break;
			case 'image':
				aframeEntity = document.createElement('a-image');
				this.setImageAttributes(aframeEntity, data); 
				break;
			case 'video':
				aframeEntity = document.createElement('a-video');
				this.setVideoAttributes(aframeEntity, data);  
				break;
			case 'text':
				aframeEntity = document.createElement('a-text');
				this.setTextAttributes(aframeEntity, data); 
				break;
			case 'arrow':
				aframeEntity = document.createElement('a-image');
				this.setArrowAttributes(aframeEntity, data); 
				break;
		}

		if(this.isBuilder) {
			aframeEntity.setAttribute('draggable', '');
		}

		aframeEntity.diveInHotspot = data;
		
		return aframeEntity;
	}

	static setCircleAttributes(aframeEntity, data) {
		aframeEntity.setAttribute('id', data.id);
		aframeEntity.setAttribute('radius', data.radius ? data.radius : '0.2');
		aframeEntity.setAttribute('rotation', data.rotation);
		aframeEntity.setAttribute('position', data.position);
		aframeEntity.setAttribute('color', data.options.color);
		return aframeEntity;
	}

	static setPlaneAttributes(aframeEntity, data) {
		aframeEntity.setAttribute('id',data.id);		
		aframeEntity.setAttribute('rotation', data.rotation);
		aframeEntity.setAttribute('position', data.position);
		aframeEntity.setAttribute('height', data.height);
		aframeEntity.setAttribute('width', data.width);		
		aframeEntity.setAttribute('color', data.options.color);
		return aframeEntity;
	}

	static setImageAttributes(aframeEntity, data) {
		aframeEntity.setAttribute('id', data.id);		
		aframeEntity.setAttribute('rotation', data.rotation);
		aframeEntity.setAttribute('position', data.position);
		aframeEntity.setAttribute('height', data.height);
		aframeEntity.setAttribute('width', data.width);		
		return aframeEntity;
	}

	static setVideoAttributes(aframeEntity, data){
		aframeEntity.setAttribute('id',data.id);		
		aframeEntity.setAttribute('rotation', data.rotation);
		aframeEntity.setAttribute('position', data.position);
		aframeEntity.setAttribute('height', data.height);
		aframeEntity.setAttribute('width', data.width);		
		return aframeEntity;
	}

	static setTextAttributes(aframeEntity, data){
		aframeEntity.setAttribute('id',data.id);		
		aframeEntity.setAttribute('rotation', data.rotation);
		aframeEntity.setAttribute('position', data.position);
		//aframeEntity.setAttribute('height', data.height); actually not used
		aframeEntity.setAttribute('width', data.width);	
		aframeEntity.setAttribute('value', `${data.options.text}`);
		aframeEntity.setAttribute('material', "opacity: 0");
		aframeEntity.setAttribute('align', "center");
		aframeEntity.setAttribute('color', data.options.color);
		//TODO: Fix width handling.
		//Currently it uses a temporary formula that works for 80% of the cases and only for the current font
		aframeEntity.setAttribute('geometry', `primitive:plane; height: auto; width: ${data.options.width * data.options.text.length * (1/45)}`);

		if(data.options.scaleFactor) {
			aframeEntity.setAttribute('scale', data.options.scaleFactor + ' ' + data.options.scaleFactor + ' ' +data.options.scaleFactor );
		}
		return aframeEntity;
	}

	static setArrowAttributes(aframeEntity, data){
		aframeEntity.setAttribute('id', data.id);		
		aframeEntity.setAttribute('height', data.height);
		aframeEntity.setAttribute('width', data.width);

		//+90 because of the image (.svg) rotation 
		aframeEntity.setAttribute('rotation', {x: 90, y: data.options.pointerAngle.y * -1, z: 0});
		//Should be defined programatically, maybe server-side
		aframeEntity.setAttribute('position', data.position);

		/*aframeEntity.object3D.position.set(0, 0, -0.5);
		aframeEntity.object3D.rotation.set(
			THREE.Math.degToRad(90),
			THREE.Math.degToRad(90),
			THREE.Math.degToRad(0)
		);*/
		
		return aframeEntity;
	}

	static setEntityPosition(aframeEntity, position){
		aframeEntity.setAttribute('position', position);	
		return aframeEntity;
	}

	static removeEntity(entity) {
		entity.parentNode.removeChild(entity);
	}

	static setMaterial(aframeEntity, assetId){
		aframeEntity.setAttribute('src','');
		aframeEntity.setAttribute('src', '#' + assetId);
	}

	static entityPositionToVector2Screen(entity) {
		let pos = new THREE.Vector3();
		pos = pos.setFromMatrixPosition(entity.object3D.matrixWorld);
		pos.project(this.camera.sceneEl.camera);

		let widthHalf = this.camera.sceneEl.canvas.width / 2;
		let heightHalf = this.camera.sceneEl.canvas.height / 2;

		pos.x = (pos.x * widthHalf) + widthHalf;
		pos.y = - (pos.y * heightHalf) + heightHalf;				
		
		return pos;
	}

	static lockCamera() {
		AframeApi.camera.setAttribute('look-controls', 'enabled: false');
	}

	static unlockCamera() {
		AframeApi.camera.setAttribute('look-controls', 'enabled: true');
	}

}

