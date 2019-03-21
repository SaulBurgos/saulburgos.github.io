import { Aggregation } from "./diveIn.utils.js";
import { Modal } from './diveIn.modal.js';
import { ViewPanel } from "./diveIn.viewPanel.js";

export class Description extends Aggregation(ViewPanel, Modal) {
  constructor() {
    super();

    this.TITLE_CLASS = 'viewer__description-title';
    this.SUBTITLE_CLASS = 'viewer__description-subtitle';
    this.TEXT_CLASS = 'viewer__description-text';
    this.CONTENT_CLASS = '.js-description-content';

    // ViewPanel
    this.containerSelector = 'viewer__description';
    this.template = 'http://localhost:8080/viewer/template/description.html';
    this.contentTemplate = 'http://localhost:8080/viewer/template/descriptionContent.html';

    this.dependencies = [{
      type: 'css',
      url: 'http://localhost:8080/viewer/style/description.css'
    }];

    this.iconSelector = '.js-viewer__description-icon';
    this.changeStateCallback = this.showDescription;

    // Modal
    this.closeModalCallback = this.toggleState;

    // ViewPanel.Description
    this.contentElement = null;
    this.title = '';
    this.subtitle = '';
    this.text = '';
  }

  init(data) {
    return new Promise((resolve) => {
      super.init(data).then(() => {
        this.initModal().then(() => {
          this.contentElement = this.viewerContainerElement.querySelector(this.CONTENT_CLASS);
          this.setDescriptionContent();
        });

        resolve();
      });
    });
  }

  setParameters(data) {
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.text = data.text;
  }

  setDescriptionContent() {
    this.contentElement.querySelector(`.${this.TITLE_CLASS}`).innerHTML = this.title;
    this.contentElement.querySelector(`.${this.SUBTITLE_CLASS}`).innerHTML = this.subtitle;
    this.contentElement.querySelector(`.${this.TEXT_CLASS}`).innerHTML = this.text;
  }

  showDescription() {
    if (this.isActive) {
      this.showModal();
      this.contentElement.scrollTop = 0;
    }
  }

  update() { }
}
