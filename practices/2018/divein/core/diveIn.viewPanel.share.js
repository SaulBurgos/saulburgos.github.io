import { Aggregation } from "./diveIn.utils.js";
import { Modal } from './diveIn.modal.js';
import { ViewPanel } from "./diveIn.viewPanel.js";

export class Share extends Aggregation(ViewPanel, Modal) {
  static get CONTENT_CLASS() {
    return '.js-share-content';
  }

  constructor() {
    super();

    this.containerSelector = 'viewer__share';
    this.template = 'http://localhost:8080/viewer/template/share.html';
    this.contentTemplate = 'http://localhost:8080/viewer/template/shareContent.html';

    this.dependencies = [{
      type: 'css',
      url: 'http://localhost:8080/viewer/style/share.css'
    }];

    this.iconSelector = '.js-viewer__share-icon';
    this.changeStateCallback = this.activateShare;
    this.closeModalCallback = this.toggleState;

    this.shareLinks;
  }

  init(data) {
    return new Promise((resolve) => {
      super.init(data).then(() => {
        this.initModal().then(() => {
          this.contentElement = this.viewerContainerElement.querySelector(Share.CONTENT_CLASS);
          this.setShareContent();
        });

        resolve();
      });
    });
  }

  setParameters(data) {
    this.shareLinks = data.share;
  }

  setShareContent() {
    // Set share links
  }

  activateShare() {
    if (this.isActive) {
      this.showModal();
    }
  }

  update() { }
}
