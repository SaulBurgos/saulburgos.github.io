import { Aggregation } from "./diveIn.utils.js";
import { ViewPanel } from "./diveIn.viewPanel.js";

export class FloorPlanImage extends Aggregation(ViewPanel) {

  constructor() {
    super();
    this.type = 'floorPlanImage';
    this.containerSelector = 'viewer__floor-plan';
    this.template = 'template/floorPlanImage.html';
    this.dependencies = [
      {
        type: 'css',
        url: 'style/floorPlanImage.css'
      },
      {
        type: 'css',
        url: 'libs/photoswipe_411/photoswipe.css'
      },
      {
        type: 'css',
        url: 'libs/photoswipe_411/default-skin/default-skin.css'
      },
      {
        type: 'js',
        url: 'libs/photoswipe_411/photoswipe.ooqia.min.js'
      },
      {
        type: 'js',
        url: 'libs/photoswipe_411/photoswipe-ui-default.min.js'
      },
    ];

    this.iconSelector = '.js-viewer__floorplanimage-icon';
    this.changeStateCallback = this.toggleFloorPlan;

    this.floorplan = {};
    this.floorPlanContainerElement = null;
    this.photoSwipeElement = null;
    this.currentScene = {};
    this.gallery = null;
  }

  init(data) {
    return new Promise((resolve) => {
      super.init(data).then(() => {
        this.floorPlanContainerElement = this.viewerContainerElement.querySelector('.viewer__floorplanimage-container');
        this.photoSwipeElement = this.floorPlanContainerElement.querySelector('.js-viewer__floorplan-swipe');

        this.gallery = this.createFloorPlan();

        //TODO: support for many layers/images (delete container and rebind)
        //TODO: explain why the event listener is required
        this.gallery.listen('imageLoadComplete', (index) => {
          this.createMarkers(index);
          // this.updateMarkers();
        });

        this.gallery.init();
        resolve();
      });
    });
  }

  setFloorPlanData(data) {
    this.floorplan = data;
  }

  createFloorPlan() {
    let items = this.floorplan.blueprints.map(element => {
      return {
        src: element.image.url,
        w: element.image.width,
        h: element.image.height
      };
    });

    return new PhotoSwipe(this.photoSwipeElement, PhotoSwipeUI_Default, items, this.floorplan.options);
  }

  createMarkers(index) {
    this.floorplan.blueprints[index].markers.forEach(element => {
      let divId = this.type + "Marker_" + element.id;
      let divMarker = document.createElement('div');

      divMarker.id = divId;
      divMarker.className = `${this.hotspotContainerSelector}_item`;
      divMarker.style.width = element.width;
      divMarker.style.height = element.height;
      divMarker.style.top = element.top;
      divMarker.style.left = element.left;
      divMarker.style.backgroundImage = `url('${element.iconURL}')`;

      divMarker.addEventListener('click', () => {
        diveIn.Observer.broadcast('hotspotNavigationClicked', {
          currentTarget: this.type,
          sceneId: element.targetSceneId
        });
      });

      jQuery('.item' + index).append(divMarker);
      element.selector = divId;
    });

  }

  toggleFloorPlan() {
    if (this.isActive) {
      this.show();
      this.gallery.updateSize(true);
    } else {
      this.hide();
    }
  }

  updateText() {
    document.querySelector('.viewer__floorplanimage-text').innerHTML = this.currentScene.name;
  }

  show() {
    this.floorPlanContainerElement.classList.add('viewer__floorplanimage-container--open');
  }

  hide() {
    this.floorPlanContainerElement.classList.remove('viewer__floorplanimage-container--open');
  }

  update(data) {
    this.currentScene = data.scene;
    this.updateText();
  }
}
