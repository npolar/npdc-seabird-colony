'use strict';

var L = require('../../node_modules/leaflet');
L.Icon.Default.imagePath = "../assets/images/";

let leafletMap = function () {
"ngInject";

return   {
    restrict: 'EA',
    scope: {
            polygon: '@'
    },
    template: '<div local-map style="height: 300px;"></div>',
    link: function ($scope, element, attrs) {
       console.log("scope",$scope);
       console.log("element", element);
       console.log("attrs", attrs);
        var coord = [15.646944,78.223333];

        if ((attrs.polygon)&&(attrs.polygon.geometries)) {
        //Need to reverse coord because geojson use opposite listing
         coord = attrs.polygon.geometries[1].coordinates[0][0];
         console.log("coord", coord);

        }

        var map = L.map('map2').setView([coord[1],coord[0]], 9);

        L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}/', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
}).addTo(map);


         setTimeout(function () {
           map.invalidateSize();
         }, 0);

    L.geoJSON(attrs.polygon).addTo(map);
   L.marker([coord[1],coord[0]]).addTo(map);

     }
    };
};

module.exports = leafletMap;
