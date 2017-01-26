/// <reference path="require.d.ts" />
require.config({
    baseUrl: './',
    shim: {
        jquery: {
            export: '$'
        }
    },
    paths: {
        'jquery': 'jquery-1.9.1.min'
    }
});
require(['hotspotBootstrapper', 'jquery'], function (hotspotBootstrapper, $) {
    hotspotBootstrapper.run();
});
//# sourceMappingURL=main.js.map