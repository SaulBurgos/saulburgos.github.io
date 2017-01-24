/// <reference path="require.d.ts" />

require.config({
    baseUrl: './'
});

require(['hotspotBootstrapper'],(hotspotBootstrapper) => {
    hotspotBootstrapper.run();
});