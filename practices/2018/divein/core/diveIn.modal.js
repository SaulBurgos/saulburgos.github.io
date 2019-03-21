import { loadTemplate } from './diveIn.utils.js';
export class Modal {
  constructor() {
    this.OPEN_CLASS = 'main-overlay--open';
    this.CLOSE_CLASS = 'main-overlay__close';
    this.BODY_CLASS = 'main-overlay__body';

    this.modalTemplate = 'template/modalOverlay.html';
    this.modalElement = null;
    this.overlaySelector = null;
  }

  registerModalEvent() {
    this.modalElement
      .querySelector(`.${this.CLOSE_CLASS}`)
      .addEventListener('click', () => {
        this.hideModal();

        //TODO: Workaround to remove callback
        if (this.closeModalCallback) {
          this.closeModalCallback();
        }
      });
  }

  initModal() {
    if (!this.contentTemplate) {
      throw 'Template not found';
    }

    const promise = new Promise((resolve) => {
      this.modalElement = document.createElement('div');

      loadTemplate(this.modalElement, this.modalTemplate).then(() => {
        this.viewerContainerElement.appendChild(this.modalElement);
        this.overlaySelector = this.modalElement.querySelector('.main-overlay');

        this.registerModalEvent();

        loadTemplate(this.modalElement.querySelector(`.${this.BODY_CLASS}`), this.contentTemplate)
          .then(() => {
            resolve();
          });
      });
    });

    return promise;
  }

  showModal() {
    this.overlaySelector.classList.add(this.OPEN_CLASS);
  }

  hideModal() {
    this.overlaySelector.classList.remove(this.OPEN_CLASS);
  }
}
