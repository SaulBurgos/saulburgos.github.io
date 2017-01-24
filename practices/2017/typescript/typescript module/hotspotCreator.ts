import hotspotsElement = require('./hotspotManager');

/*with external modules isnot necessary use namespace*/
//namespace hotspot {    

    export class manager  {
        
        hotspots: hotspotsElement.IhotspotClass [] = [];

        createHotspot(type:string) {            
            let newHotspot;

            switch(type) {
                case 'text':
                    newHotspot = new hotspotsElement.hotspotText({ id: 0,title: 'entrance'});
                break
                case 'video':
                    newHotspot = new hotspotsElement.hotspotVideo({ id: 0,title: 'entrance'});
                break
                case 'image':
                    newHotspot = new hotspotsElement.hotspotImage({ id: 0,title: 'entrance'});
                break
            }

            this.hotspots.push(newHotspot);
            return newHotspot;
        }
    }
//}