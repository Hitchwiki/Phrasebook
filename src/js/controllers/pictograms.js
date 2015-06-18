/**
 * Controller for pictograms
 */
(function() {
  'use strict';

  angular
    .module('Phrasebook')
    .controller('pictogramsCtrl', pictogramsCtrl);

  /* @ngInject */
  function pictogramsCtrl($scope, $log, $routeParams, $location) {

    $scope.pictogramSelected = ($routeParams.pictogram) ? $routeParams.pictogram : false;

    $scope.pictogramSize = 3;

    $scope.pictograms = [
        "category-places",
        "category-sleep",
        "category-food",
        "coffee",
        "pump",
        "fish",
        "fire",
        "tree",
        "campsite",
        "swimming",
        "phone",
        "tap",
        "bicycle",
        "cab",
        "taxi",
        "truck",
        "female",
        "male",
        "scooter",
        "ship",
        "flight",
        "train",
        "clock",
        "bus",
        "suitcase",
        "locker",
        "lock-open-alt",
        "key",
        "ambulance",
        "home",
        "shower",
        "haircut",
        "basket",
        "official1",
        "official2",
        "bug",
        "bed", // Keep this last, it's a bit wider than others
    ];

    $scope.back = function() {
      if($scope.pictogramSelected === false) {
        $log.log('back to list');
        $location.path('/');
      }
      else {
        $log.log('close picto');
        $scope.pictogramSelected = false;
      }
    };

    $scope.pictogram = function(icon) {
        return 'icon-' + icon + ' ' + 'pictogram-size-' + $scope.pictogramSize;
    };

    $scope.pictogramSelect = function(icon, $event) {
        $event.preventDefault();
        $scope.pictogramSelected = icon;
    };

  }
})();
