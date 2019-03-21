import { diveIn } from './diveIn.js';

let allFeaturesStory = new diveIn.Story({
  id: 1,
  username: 'Saul Burgos',
  name: 'Coyote Meadows',
  logo: '/assets/logo.jpg',
  description: "<p>The <a href='http://coyotemeadowssj.org/' target='_blank' rel='noopener noreferrer'>Coyote Meadows Coalition</a> joins groups and individuals focused on opening up and activating for parkland a 50-acre city-owned parcel along Coyote Creek between Story Road and Hwy 280. The Coyote Creek Trail runs along the western edge of the area while the future Five Wounds Trail will run along its eastern edge.</p><p>The land is already designated as parkland. Our goal is to open up the area to passive recreational uses as well as to improve the water quality of Coyote Creek by reducing homeless encampments in the area. ​Opening up ​Coyote Meadows for park uses would provide access from the Spartan-Keyes Neighborhood and from Kelley Park and Happy Hollow, as well as from Little Saigon along Story Road to the east and from the Olinder Neighborhood and other nearby neighborhoods to the north.</p><p>View a&nbsp;<a href='https://www.paneek.net/#/tour/view/1132' target='_blank' rel='noopener'>360&deg; virtual tour</a>&nbsp;of Coyote Meadows using Paneek.</p>",
  template: 'template/viewpanelsContainer.html',
  dependencies: [
    {
      type: 'css',
      url: 'style/main.css'
    },
    {
      type: 'css',
      url: 'style/typography.css'
    }
  ],
  share: {
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: ''
  },
  startSceneId: 10,
  outlinePanel: {},
  titlePanel: {},
  logoPanel: {},
  fullscreenPanel: {},
  descriptionPanel: {},
  sharePanel: {},
  compassPanel: {},
  //counterPanel: {},
  floorPlanImagePanel: {
    id: 1,
    options: {
      barsSize: { top: 1, bottom: 'auto' },
      arrowEl: true,
      counterEl: false,
      history: false,
      preload: [1, 3],
      shareEl: false,
      closeOnScroll: false,
      fullscreenEl: false,
      pinchToClose: false,
      modal: false,
      loop: false,
      closeOnVerticalDrag: false,
      clickToCloseNonZoomable: false,
      escKey: false,
    },
    blueprints: [
      {
        id: 1,
        image: {
          url: 'assets/floorplanexample.jpg',
          width: 930,
          height: 651
        },
        markers: [
          {
            id: 4,
            top: '10%',
            left: '10%',
            width: '10%',
            height: '10%',
            iconURL: 'assets/floorPlanHotspot.png',
            targetSceneId: 10
          },
          {
            id: 5,
            top: '80%',
            left: '30%',
            width: '10%',
            height: '10%',
            iconURL: 'assets/floorPlanHotspot.png',
            targetSceneId: 20
          }
        ]
      }, {
        id: 2,
        image: {
          url: 'https://d23u3ye4jogzr9.cloudfront.net/medialibrary/8/image/uid-151898695057535.png',
          width: 943,
          height: 786
        },
        markers: [
          {
            id: 4,
            top: '10%',
            left: '10%',
            width: '10%',
            height: '10%',
            iconURL: 'assets/floorPlanHotspot.png',
            targetSceneId: 10
          },
          {
            id: 5,
            top: '80%',
            left: '30%',
            width: '10%',
            height: '10%',
            iconURL: 'assets/floorPlanHotspot.png',
            targetSceneId: 20
          }
        ]
      }
    ]
  },
  // floorPlanMap: {},
  scenes: [
    {
      id: 10,
      name: 'Entry',
      imgUrl: 'https://s3-us-west-2.amazonaws.com/saulbpano/panoramas/1840/7349/original_1840_7349.jpeg',
      thumbnail : 'assets/Entry.png',
      north: {
        x: 0,
        y: -60,
        z: 0
      },
      initialPov: {
        x: 0,
        y: 50,
        z: 0
      },
      hotspots: [
        {
          id: 11,
          type: 'navigation',
          rotation: '0 50 0',
          position: '-3 0.5 -3',
          shape: 'text',
          targetSceneId: 30,
          width: 1,
          height: 1,
          options: {
            text: '1st Stop',
            color: 'white',
            scaleFactor: 4
          }
        },
        {
          id: 12,
          type: 'navigation',
          rotation: '0 -60 0',
          position: '6 0.8 -3',
          shape: 'text',
          targetSceneId: 20,
          width: 1,
          height: 1,
          options: {
            text: 'Gate Entry',
            color: 'white',
            scaleFactor: 5
          }
        },
      ]
    },
    {
      id: 20,
      name: 'Gate Entry',
      imgUrl: 'https://s3-us-west-2.amazonaws.com/saulbpano/panoramas/1840/7762/original_1840_7762.jpeg',
      thumbnail : 'assets/GateEntry.png',
      hotspots: [
        {
          id: 21,
          type: 'navigation',
          rotation: '0 130 0',
          position: '-6 .8 6',
          targetSceneId: 10,
          shape: 'text',
          width: 1,
          height: 1,
          options: {
            scaleFactor: 5,
            text: 'Entry',
            color: 'white',
          }
        }
      ],
      options: {}
    },
    {
      id: 30,
      name: '1st Stop - Coyote Creek Trestle',
      imgUrl: 'https://s3-us-west-2.amazonaws.com/saulbpano/panoramas/1840/7350/original_1840_7350.jpg',
      thumbnail : 'assets/FirstStop.png',
      north: {
        x: 0,
        y: -60,
        z: 0
      },
      initialPov: {
        x: 0,
        y: 170,
        z: 0
      },
      hotspots: [
        {
          id: 31,
          type: 'navigation',
          rotation: '0 0 0',
          position: '.4 .2 -3',
          shape: 'text',
          targetSceneId: 10,
          width: 1,
          height: 1,
          options: {
            text: 'Entry',
            color: 'white',
            scaleFactor: 3
          }
        },
        {
          id: 32,
          type: 'navigation',
          rotation: '0 -190.4 0',
          position: '-1.2 .15 5.12',
          shape: 'text',
          targetSceneId: 40,
          width: 1,
          height: 1,
          options: {
            text: '2nd Stop',
            color: 'black',
            scaleFactor: 4
          }
        },
      ],
      options: {}
    },
    {
      id: 40,
      name: '2nd Stop',
      imgUrl: 'https://s3-us-west-2.amazonaws.com/saulbpano/panoramas/1840/7351/original_1840_7351.jpg',
      thumbnail : 'assets/SecondStop.png',
      north: {
        x: 0,
        y: -60,
        z: 0
      },
      initialPov: {
        x: 0,
        y: 170,
        z: 0
      },
      hotspots: [
        {
          id: 41,
          type: 'navigation',
          rotation: '0 -210 0',
          position: '-2.5 0.3 3.4',
          shape: 'text',
          targetSceneId: 30,
          width: 1,
          height: 1,
          options: {
            text: '1st Stop',
            color: 'white',
            scaleFactor: 3
          }
        },
      ],
      options: {}
    }
  ]
});

allFeaturesStory.init({
  container: document.getElementById('viewerContainer'),
  embedded: false,
  debug: false
});
