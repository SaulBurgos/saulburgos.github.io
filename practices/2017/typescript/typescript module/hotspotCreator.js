define(["require", "exports", "./hotspotManager"], function (require, exports, hotspotsElement) {
    "use strict";
    /*with external modules isnot necessary use namespace*/
    //namespace hotspot {    
    var manager = (function () {
        function manager() {
            this.hotspots = [];
        }
        manager.prototype.createHotspot = function (type) {
            var newHotspot;
            switch (type) {
                case 'text':
                    newHotspot = new hotspotsElement.hotspotText({ id: 0, title: 'entrance' });
                    break;
                case 'video':
                    newHotspot = new hotspotsElement.hotspotVideo({ id: 0, title: 'entrance' });
                    break;
                case 'image':
                    newHotspot = new hotspotsElement.hotspotImage({ id: 0, title: 'entrance' });
                    break;
            }
            this.hotspots.push(newHotspot);
            return newHotspot;
        };
        return manager;
    }());
    exports.manager = manager;
});
//} 
//# sourceMappingURL=hotspotCreator.js.map