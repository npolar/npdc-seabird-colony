'use strict';


var SeabirdColonyShowController = function($controller, $routeParams,
  $scope, $q, SeabirdColony, npdcAppConfig) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = SeabirdColony;



  let show = function() {

    $scope.show().$promise.then((seabirdColony) => {
      if ((seabirdColony.geometry)&&(seabirdColony.geometry.geometries)) {
         $scope.polygon = seabirdColony.geometry;
      }  //else undefined


    });

  };

  show();

};


module.exports = SeabirdColonyShowController;
