'use strict';

var router = function($routeProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
    templateUrl: 'show/show-seabird-colony.html',
    controller: 'SeabirdColonyShowController'
  }).when('/', {
    templateUrl: 'search/search.html',
    controller: 'SeabirdColonySearchController',
    reloadOnSearch: false
  });
};

module.exports = router;
