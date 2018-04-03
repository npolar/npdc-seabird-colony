'use strict';

var SeabirdColonyShowController = function($controller, $routeParams,
  $scope, $q, SeabirdColony, npdcAppConfig, Dataset, Project, Publication) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = SeabirdColony;


  $scope.mapOptions = {};

  let show = function() {

    $scope.show().$promise.then((stationBooking) => {



      //Location on map should be the research station
      var bounds =[];
      switch($scope.document.research_station) {
        case 'sverdrup':
            bounds = [[[78.91,11.93],[78.91,11.93]]];
            break;
        case 'norvegia':
           // bounds = [[[-54.40, 3.28],[-54.40, 3.28]]];
             bounds = [[[-54.4097, 3.2886889],[-54.4097, 3.2886889]]];
            break;
        default: //troll
            bounds = [[[-72.01, 2.53],[-72.01, 2.53]]];
      }
      $scope.mapOptions.coverage = bounds;
      $scope.mapOptions.geojson = "geojson";

    });

  };


  show();

};

module.exports = SeabirdColonyShowController;
