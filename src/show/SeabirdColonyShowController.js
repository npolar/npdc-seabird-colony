'use strict';

var L = require('leaflet');
L.Icon.Default.imagePath = 'node_modules/dist/images/';

var SeabirdColonyShowController = function($controller, $routeParams,
  $scope, $q, SeabirdColony, npdcAppConfig) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = SeabirdColony;

  var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 18,
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
     }),
     latlng = L.latLng(78.000, 16.000);

  var map = L.map('mapid', {center: latlng, zoom: 4, layers: [tiles]});


  setTimeout(function () {
    map.invalidateSize();
  }, 0);


  let show = function() {

    $scope.show().$promise.then((seabirdColony) => {
      if ((seabirdColony.geometry)&&(seabirdColony.geometry.geometries)) {
         console.log("test", JSON.stringify(seabirdColony.geometry.geometries[1]));
      }

      var places = [{
                 "type": "Feature",
                 "geometry": {
                 "type": "Point",
                 "coordinates": [16.000, 78.000]
               },
                 "properties": {
                 "name": "Svalbard"
              }
              },
              {
                "type": "Feature",
                "geometry": {
                "type": "LineString",
                "coordinates": [
                      [16.000, 78.000], [18.56, 79.89], [17.56, 78.67], [18.78, 79.45]
                      ]
                },
                "properties": {
                "name": "Svalbard"
              }
              },
              {
                "type": "Feature",
                "geometry": {
                "type": "Polygon",
                "coordinates": [ [
                      [20.000, 88.000], [18.56, 79.89], [17.56, 78.67], [18.78, 79.45], [20.000, 88.000]
                ]  ]
              },
              "properties": {
                "id": "old"
              }
          } ];


      L.geoJSON(seabirdColony.geometry).addTo(map);


/*      var polygon = L.polygon([
        [78.000, 16.000],
        [78.000, 17.000],
        [79.000, 17.000]
    ]).addTo(map); */


      //$scope.mapOptions.geojson = "geojson";
    });

  };

  show();

};


module.exports = SeabirdColonyShowController;
