import { Aggregation } from "./diveIn.utils.js";
import { ViewPanel } from "./diveIn.viewPanel.js";
import { diveIn } from './diveIn.js';

export class Compass extends Aggregation(ViewPanel) {

  constructor() {
    super();
    this.type = 'compass';
    this.containerSelector = `viewer__compass`;
    this.template = 'http://localhost:8080/viewer/template/compass.html';
    this.dependencies = [{
      type: 'css',
      url: 'http://localhost:8080/viewer/style/compass.css'
    }];

    this.compassElement = null;

    this.iconSelector = '.js-viewer__description-icon';
    this.allowChangeState = false;
    this.north = 0;
  }

  init(data) {
    super.init(data).then(() => {
      this.compassElement = document.querySelector(`.${this.containerSelector}`);
      this.compassElement.addEventListener('click', this.headNorth.bind(this));
    });
  }

  update(data) {
    let scene = data.scene;

    if (scene.north != undefined) {
      this.north = scene.north.y;
    }
  }

  headNorth() {
    diveIn.AframeApi.updateCameraRotationOnYAxis(this.north);
  }

  calculateRotation(rotations) {
    return rotations.cameraRigRotation.y + rotations.cameraRotation.y - this.north;
  }

  updateRotation(rotations) {
    const newRotation = this.calculateRotation(rotations);
    const cssRotation = `rotate(${newRotation}deg)`;

    this.compassElement.style.webkitTransform = cssRotation;
    this.compassElement.style.MozTransform = cssRotation;
    this.compassElement.style.msTransform = cssRotation;
    this.compassElement.style.OTransform = cssRotation;
    this.compassElement.style.transform = cssRotation;
  }
}
