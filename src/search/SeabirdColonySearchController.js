'use strict';


var SeabirdColonySearchController = function ($scope, $location, $controller, $filter, SeabirdColony, npdcAppConfig,  NpdcSearchService, NpolarTranslate) {
  'ngInject';

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = SeabirdColony;

 npdcAppConfig.search.local.results.detail = (entry) => {
     let updatedText = NpolarTranslate.translate('start date');
     //let r = (entry.colony_name).charAt(0).toUpperCase() +  (entry.colony_name).slice(1) + ", "+ updatedText +":";
     let r =  updatedText +":";
     return r+` ${(entry.start_date.split('T')[0])}`;

 };

  npdcAppConfig.cardTitle = "Seabird Colony Archive";
  npdcAppConfig.search.local.results.subtitle = "species";
  npdcAppConfig.search.local.results.title = "colony_name"; //"species";


  let query = function() {
    let defaults = {
      limit: "50",
      sort: "colony_name,species,-start_date",
      fields: 'species,id,updated,zone,colony_name,start_date',
      facets: 'colony_name,species,start_date'};

    let invariants = $scope.security.isAuthenticated() ? {} : {} ;
    return Object.assign({}, defaults, invariants);
  };

  $scope.search(query());

  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search(query());
  });

};

module.exports = SeabirdColonySearchController;
