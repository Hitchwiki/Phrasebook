/**
 * Controller for community translators
 */
(function() {
  'use strict';

  angular
    .module('Phrasebook')
    .controller('translateCtrl', translateCtrl);

  /* @ngInject */
  function translateCtrl($scope) {

    $scope.back = function() {
      //$event.preventDefault();
      $location.path('/');
    };

  }

})();
