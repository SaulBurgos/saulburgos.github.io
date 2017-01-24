import hotspot = require('./hotspotCreator');

export function run () {
    let manager = new hotspot.manager();
    let newHotspot = manager.createHotspot('text');
    console.log(newHotspot.getContent());

    newHotspot = manager.createHotspot('image');
    console.log(newHotspot.getContent());

    newHotspot = manager.createHotspot('video');
    console.log(newHotspot.getContent());
}

