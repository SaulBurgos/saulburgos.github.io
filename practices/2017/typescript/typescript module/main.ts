/// <reference path="require.d.ts" />

require.config({
    baseUrl: './',
    shim: {
        // jquery: {
        //     export: '$'
        // }
        'jquery':['jquery']
    },
    paths: {
        'jquery': 'jquery-1.9.1.min'
    }
});

require(['hotspotBootstrapper','jquery'],(hotspotBootstrapper,$) => {
    hotspotBootstrapper.run();
});