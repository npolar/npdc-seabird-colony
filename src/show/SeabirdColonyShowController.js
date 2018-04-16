'use strict';

//var L = require('../../node_modules/leaflet');
require('npdc-common/src/wrappers/leaflet');
L.Icon.Default.imagePath = "../assets/images/";



var SeabirdColonyShowController = function($controller, $routeParams,
  $scope, $q, SeabirdColony, npdcAppConfig) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = SeabirdColony;




  let show = function() {

    $scope.show().$promise.then((seabirdColony) => {

       var coord = (78.223333, 15.646944);
      if ((seabirdColony.geometry)&&(seabirdColony.geometry.geometries)) {
      //   console.log("test", seabirdColony.geometry.geometries[1].coordinates[0][0]);

      //Need to reverse coord because geojson use opposite listing
       coord = (seabirdColony.geometry.geometries[1].coordinates[0][0]);

      }

      var tiles = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}/', {
           maxZoom: 18,
           attribution: 'Esmapri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community'
         }),

         latlng = L.latLng(coord[1],coord[0]);

      var map = L.map('mapid2', {center: latlng, zoom: 9, layers: [tiles]});



      L.geoJSON(seabirdColony.geometry).addTo(map);


        setTimeout(function () {
          map.invalidateSize();
        }, 0);

    });

  };

  show();

};


module.exports = SeabirdColonyShowController;
