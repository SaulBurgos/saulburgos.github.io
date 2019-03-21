import { diveIn } from "./diveIn.js";
 
let ooqiaStory = new diveIn.Story({
	id: 1,
	name: 'Ooqia Tour',
	startSceneId: 101,
	//titlePanel: {},
	//compassPanel: {},
	scenes: [{
		id: 101,
		name: 'Parking',
		imgUrl: 'assets/ooqia_parking.jpg',
		north: {
			x: 0,
			y: -60,
			z: 0
		},
		initialPov: {
			x: 0,
			y: 30,
			z: 0
		},
		hotspots: [{
			id: 1,
			type: 'image',
			rotation: "0 220 0",
			position: "3.8 0.2 3.2",
			shape: "image",
			width: 1,
			height: 0.6,
			options: {						
				imgUrl: 'assets/ooqia_oficial.png'
			},
		}]
	},
	{
		id: 102,
		name: 'Lobby',
		imgUrl: 'assets/ooqia_lobby.jpg',
		hotspots: []
	},
	{
		id: 103,
		name: 'Pool',
		imgUrl: 'assets/ooqia_pool.jpg',
		hotspots: []
	}]
});

ooqiaStory.init({
	container: document.getElementsByTagName('body')[0],
	embedded: false,
	debug: false
}); 