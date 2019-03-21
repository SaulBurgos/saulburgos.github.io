import { guid, loadDependencies, loadTemplate } from "./diveIn.utils.js";

export class ViewPanel {
  constructor() {
    this.id = guid();
    this.type = 'base';
    this.viewerContainerElement;
    this.dependencies = [];
    this.onReadyPromise = undefined;
    this.ready = false;

    this.iconElement = null;
    this.allowChangeState = true;
    this.isActive = false;
    this.changeStateCallback = null;

    this.ICON_ACTIVE_CLASS = 'viewer__icon--active';
  }

  init(data) {
    this.viewerContainerElement = data.container;

    this.onReadyPromise = new Promise((resolve) => {
      if (!this.template) {
        throw 'template not found';
      }

      var promiseTemplate = loadTemplate(document.querySelector(`.${this.containerSelector}`), this.template);
      var promisesAssets = [promiseTemplate, loadDependencies(this.dependencies)];

      Promise.all(promisesAssets).then(() => {
        if (this.iconSelector) {
          this.iconElement = document.querySelector(this.iconSelector);
          this.listenStateChange();
        }

        this.setReady();
        resolve();
      });
    });

    return this.onReadyPromise;
  }

  toggleState() {
    if (this.isActive) {
      this.deactivate();
    } else {
      this.activate();
    }

    this.isActive = !this.isActive;
  }

  activate() {
    this.iconElement.classList.add(this.ICON_ACTIVE_CLASS);
  }

  deactivate() {
    this.iconElement.classList.remove(this.ICON_ACTIVE_CLASS);
  }

  setReady() {
    this.ready = true;
  }

  listenStateChange() {
    if (this.iconElement && this.allowChangeState) {
      this.iconElement.addEventListener('click', () => {
        this.toggleState();

        if (this.changeStateCallback) {
          this.changeStateCallback();
        }
      });
    }
  }

  update(sceneId) {
    throw ("Must be implmented by parent!");
  }
}
