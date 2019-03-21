import { Story } from "./diveIn.story.js";
import { Scene } from "./diveIn.scene.js";
import { HotspotHTMLContent } from "./diveIn.hotspot.HTMLContent.js";
import { HotspotVideo } from "./diveIn.hotspot.video.js";
import { HotspotNavigationText } from "./diveIn.hotspot.navigation.text.js";
import { HotspotNavigationImage } from "./diveIn.hotspot.navigation.image.js";
import { HotspotNavigationArrow } from "./diveIn.hotspot.navigation.arrow.js";
import { HotspotFactory } from "./diveIn.hotspot.factory.js";
import { AframeApi } from "./diveIn.AframeApi.js";
import { EventObserver } from './diveIn.utils.js';
import { HotspotImage } from './diveIn.hostpot.image.js';
import { HotspotText } from './diveIn.hostpot.text.js';
import { HotspotSound } from './diveIn.hotspot.sound.js';
import { HotspotImageGallery } from './diveIn.hotspot.imageGallery.js';
import { HotspotExternalVideo } from './diveIn.hotspot.externalVideo.js';
import { Outline } from "./diveIn.viewPanel.outline.js";
import { Counter } from "./diveIn.viewPanel.counter.js";
import { Title } from "./diveIn.viewPanel.title.js";
import { Logo } from "./diveIn.viewPanel.logo.js";
import { FullScreen } from "./diveIn.viewPanel.fullscreen.js";
import { Description } from "./diveIn.viewPanel.description.js";
import { Share } from "./diveIn.viewPanel.share.js";
import { Compass } from "./diveIn.viewPanel.compass.js";
import { FloorPlanImage } from "./diveIn.viewPanel.floorPlanImage.js";
import { FloorPlanMap } from "./diveIn.viewPanel.floorPlanMap.js";
import { Modal } from "./diveIn.modal.js";

let diveIn = {
  Story: Story,
  Scene: Scene,
  HotspotFactory: HotspotFactory,
  HotspotHTMLContent: HotspotHTMLContent,
  HotspotVideo: HotspotVideo,
  HotspotNavigationText: HotspotNavigationText,
  HotspotNavigationImage: HotspotNavigationImage,
  HotspotNavigationArrow: HotspotNavigationArrow,
  HotspotImage: HotspotImage,
  HotspotText: HotspotText,
  HotspotSound: HotspotSound,
  HotspotImageGallery: HotspotImageGallery,
  HotspotExternalVideo: HotspotExternalVideo,
  AframeApi: AframeApi,
  Observer: new EventObserver(),
  Outline: Outline,
  Counter: Counter,
  Title: Title,
  Logo: Logo,
  FullScreen: FullScreen,
  Description: Description,
  Share: Share,
  Compass: Compass,
  FloorPlanImage: FloorPlanImage,
  FloorPlanMap: FloorPlanMap,
  Modal: Modal
}

export { diveIn }
