define(["require", "exports", "./hotspotCreator"], function (require, exports, hotspot) {
    "use strict";
    function run() {
        var manager = new hotspot.manager();
        var newHotspot = manager.createHotspot('text');
        console.log(newHotspot.getContent());
        newHotspot = manager.createHotspot('image');
        console.log(newHotspot.getContent());
        newHotspot = manager.createHotspot('video');
        console.log(newHotspot.getContent());
    }
    exports.run = run;
});
//# sourceMappingURL=hotspotBootstrapper.js.map