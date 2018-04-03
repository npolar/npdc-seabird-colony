'use strict';
var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');
require('npdc-common/src/wrappers/leaflet');

var npdcSeabirdColonyApp = angular.module('npdcSeabirdColonyApp', ['npdcCommon','leaflet']);

npdcSeabirdColonyApp.controller('SeabirdColonyShowController', require('./show/SeabirdColonyShowController'));
npdcSeabirdColonyApp.controller('SeabirdColonySearchController', require('./search/SeabirdColonySearchController'));
npdcSeabirdColonyApp.controller('SeabirdColonyEditController', require('./edit/SeabirdColonyEditController'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/', 'resource': 'NpolarApi'},
  {'path': '/user', 'resource': 'User'},
  {'path': '/dataset', 'resource': 'Dataset'},
  {'path': '/project', 'resource': 'Project'},
    {'path': '/publication', 'resource': 'Publication'},
  {'path': '/seabird-colony', 'resource': 'SeabirdColony'}
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcSeabirdColonyApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
  return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcSeabirdColonyApp.config(require('./router'));

npdcSeabirdColonyApp.config(($httpProvider, npolarApiConfig) => {
  var autoconfig = new AutoConfig("production");
  angular.extend(npolarApiConfig, autoconfig, { resources });
  console.debug("npolarApiConfig", npolarApiConfig);

  $httpProvider.interceptors.push('npolarApiInterceptor');
});

npdcSeabirdColonyApp.run(($http, npdcAppConfig, NpolarTranslate, NpolarLang) => {
  NpolarTranslate.loadBundles('npdc-seabird-colony');
  npdcAppConfig.toolbarTitle = 'Seabird colony database';
});
