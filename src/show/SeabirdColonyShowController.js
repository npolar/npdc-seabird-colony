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
      if (seabirdColony.geometry) {
             $scope.polygon = seabirdColony.geometry;
      };

    });

  };

  show();

};


module.exports = SeabirdColonyShowController;
