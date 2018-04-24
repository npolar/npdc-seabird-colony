'use strict';

var L = require('../../node_modules/leaflet');
L.Icon.Default.imagePath = "../assets/images/";


let leafletMap = function () {
"ngInject";


return   {
    restrict: 'A',
    scope: {
            polygon: '@'
    },
    template: '<div local-map style="height: 300px;"></div>',
  controller:  ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

      var coord = [15.646944,78.223333]; //std coord

      var map = L.map('map2').setView([coord[1],coord[0]], 9);

      L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}/', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
      }).addTo(map);

       setTimeout(function () {
         map.invalidateSize();
       }); //setTimeout

      $scope.$watch('polygon', function() {
             console.log("scopecontr", $scope.polygon);
             var places = $scope.polygon;


            //  console.log("scopecontr2", $scope.polygon['geometries']);
            if (places) {
                 console.log("places", places);
                L.geoJSON(places).addTo(map);

            }

             //Need to reverse coord because geojson use opposite listing
            //  var  coord = $scope.polygon[0].geometries[1].coordinates[0][0];
            //  console.log("coord", coord);
            //   L.geoJSON($scope.polygon).addTo(map);
            //  L.marker([coord[1],coord[0]]).addTo(map);

      });
  }]
};
};

module.exports = leafletMap;
