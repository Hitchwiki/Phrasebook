/**
 * Controller for pictograms
 */
Phrasebook.controller('pictogramsCtrl', function($scope, $log, $routeParams) {

    $scope.back = function() {
        //$event.preventDefault();
        $location.path('/');
    };

    $scope.pictogramSelected = ($routeParams.pictogram) ? $routeParams.pictogram : false;

    $scope.pictogramSize = 3;

    $scope.pictograms = [
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


    $scope.pictogram = function(icon) {
        return 'icon-' + icon + ' ' + 'pictogram-size-' + $scope.pictogramSize;
    }

    $scope.pictogramSelect = function(icon, $event) {
        $event.preventDefault();
        $scope.pictogramSelected = icon;
    };

});