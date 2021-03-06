/**
 * Route configuration
 */
(function() {
  'use strict';

  angular
    .module('Phrasebook')
    .config(PhrasebookRoutesConfig);

  /* @ngInject */
  function PhrasebookRoutesConfig($routeProvider, $locationProvider) {

      $locationProvider.html5Mode(false);

      $routeProvider
      .when('/', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl'
      })
      .when('/:localFrom/:localeTo', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl'
      })
      .when('/:localFrom/:localeTo/:selectedCategory', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl'
      })
      .when('/:localFrom/:localeTo/:selectedCategory/:key', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl'
      })
      .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'aboutCtrl'
      })
      .when('/translate', {
        templateUrl: 'partials/translate.html',
        controller: 'translateCtrl'
      })
      .when('/pictograms/:pictogram', {
        templateUrl: 'partials/pictograms.html',
        controller: 'pictogramsCtrl'
      })
      .when('/pictograms', {
        templateUrl: 'partials/pictograms.html',
        controller: 'pictogramsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }

})();
