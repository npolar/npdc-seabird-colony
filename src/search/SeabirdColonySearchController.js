'use strict';


var SeabirdColonySearchController = function ($scope, $location, $controller, $filter, SeabirdColony, npdcAppConfig,  NpdcSearchService, NpolarTranslate) {
  'ngInject';

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = SeabirdColony;

 npdcAppConfig.search.local.results.detail = (entry) => {
     let updatedText = NpolarTranslate.translate('updated');
     let r = (entry.colony_name).charAt(0).toUpperCase() +  (entry.colony_name).slice(1) + ", "+ updatedText +":";
     return r+` ${(entry.updated.split('T')[0])}`;
 };

  npdcAppConfig.cardTitle = "Seabird Colony Archive";
  npdcAppConfig.search.local.results.subtitle = "zone";


  let query = function() {
    let defaults = {
      limit: "50",
      sort: "-updated",
      fields: 'species,collection,updated,zone,colony_name,id',
      facets: 'species,zone'};

    let invariants = $scope.security.isAuthenticated() ? {} : {} ;
    return Object.assign({}, defaults, invariants);
  };

  $scope.search(query());

  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search(query());
  });

};

module.exports = SeabirdColonySearchController;
