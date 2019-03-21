import { guid, loadDependencies, loadTemplate } from './diveIn.utils.js';
import { diveIn } from './diveIn.js';

class StoryBase {

  constructor(data) {
    this.id = guid();
    this.type = 'base';
    this.dependencies = data.dependencies;
    this.viewPanels = {};
    this.name = data.name;
    this.template = data.template;
    this.scenes = {};

    for (let index = 0; index < data.scenes.length; index++) {
      let scene = new diveIn.Scene(data.scenes[index]);
      this.scenes[scene.id] = scene;
    }

    this.currentScene = this.scenes[data.startSceneId];

    //VIEWPANELS
    this.viewPanels = {};

    //Outline
    if (typeof (data.outlinePanel) !== 'undefined') {
      this.viewPanels.outline = new diveIn.Outline();

      let scenes = Object.keys(this.scenes).map((key, index) => {
        return {
          id: this.scenes[key].id,
          name: this.scenes[key].name,
          thumbnail: this.scenes[key].thumbnail,
          visited: false
        }
      });

      this.viewPanels.outline.setScenes(scenes);
    }

    //Title
    if (typeof (data.titlePanel) !== 'undefined') {
      this.viewPanels.title = new diveIn.Title();
      this.viewPanels.title.setSecondatyTitle(data.name);
    }

    //Logo
    if (typeof (data.logoPanel) !== 'undefined') {
      this.viewPanels.logo = new diveIn.Logo();
      this.viewPanels.logo.setURL(data.logo);
    }

    //Compass
    if (typeof (data.compassPanel) !== 'undefined') {
      this.viewPanels.compass = new diveIn.Compass();
    }

    //Counter
    if (typeof (data.counterPanel) !== 'undefined') {
      this.viewPanels.counter = new diveIn.Counter();

      let hotspots = this.getAllHotspots().reduce((acc, curr) => {
        if (curr.type != 'navigation' && curr.type != 'text') {
          acc[curr.id] = false;
          return acc;
        } else {
          return acc;
        }
      }, {});

      this.viewPanels.counter.setHotspots(hotspots);
    }

    //Floor Plan Image
    if (typeof (data.floorPlanImagePanel) !== 'undefined') {
      this.viewPanels.floorPlanImagePanel = new diveIn.FloorPlanImage();
      this.viewPanels.floorPlanImagePanel.setFloorPlanData(data.floorPlanImagePanel);
    }

    //Floorplan Map
    if (typeof (data.floorPlanMap) !== 'undefined') {
      this.viewPanels.floorPlanMap = new diveIn.FloorPlanMap();
      this.viewPanels.floorPlanMap.setOptions(data.floorPlanMap.options);
      this.viewPanels.floorPlanMap.setMarkers(data.floorPlanMap.markers);
    }

    //Fullscreen
    //TODO: Use FullScreen only on Viewer mode
    this.viewPanels.fullscreen = new diveIn.FullScreen();

    //Description
    if (typeof (data.descriptionPanel) !== 'undefined') {
      var descriptionObj = {
        title: data.name,
        subtitle: data.username,
        text: data.description
      };

      this.viewPanels.description = new diveIn.Description();
      this.viewPanels.description.setParameters(descriptionObj);
    }

    //Share
    if (typeof (data.sharePanel) !== 'undefined') {
      this.viewPanels.share = new diveIn.Share();
      this.viewPanels.share.setParameters(data);
    }

  }

  init(data) {
    loadDependencies(this.dependencies).then(() => {
      loadTemplate(data.container, this.template).then(() => {
        diveIn.AframeApi.addContainer(data).then(() => {
          this.loadScene();
        });

        this.initViewPanels(data);
      });
    });

    diveIn.Observer.subscribe('sceneChanged', (event) => {
      this.updateViewPanels(event);
    });

    diveIn.Observer.subscribe('hotspotNavigationClicked', (event) => {
      this.changeScene(event.sceneId);
    });

    diveIn.Observer.subscribe('hotspotClicked', (event) => {
      if (this.viewPanels.counter) {
        this.viewPanels.counter.updateHotspotStatus(event.id);
      }
    });

    diveIn.Observer.subscribe('povChanged', (event) => {
      if (this.viewPanels.compass) {
        this.viewPanels.compass.updateRotation(event);
      }
    });
  }

  changeScene(sceneId) {
    this.currentScene.unload();
    this.currentScene = this.scenes[sceneId];
    this.loadScene();
  }

  loadScene() {
    this.currentScene.load();
  }

  getAllHotspots() {
    let allHotspots = [];

    for (var key in this.scenes) {
      allHotspots = allHotspots.concat(this.scenes[key].hotspots);
    }

    return allHotspots;
  }

  initViewPanels(data) {
    for (var key in this.viewPanels) {
      this.viewPanels[key].init(data);
    }
  }

  updateViewPanels(event) {
    for (var key in this.viewPanels) {
      this.viewPanels[key].update(event);
    }
  }

  addScene(scene) {
    this.scenes[scene.id] = scene;
  }

  deleteScene(sceneId) {
    this.scenes[sceneId].removeHotspots();
    delete this.scenes[sceneId];
  }

  changeToNextScene() {
    for (let sceneId of Object.keys(this.scenes)) {
      if (sceneId != this.currentScene.id) {
        this.changeScene(sceneId);
        break;
      }
    }
  }
}

export class Story extends StoryBase {
  constructor(data) {
    super(data);
    this.type = '360Image';
  }
}
