/**
 * Controller for about page
 */
Phrasebook.controller('aboutCtrl', function($scope) {

    $scope.localesVer = localesVer;

    $scope.ver = phrasebookVer;

    $scope.day = phrasebookDay;

    $scope.device = navigator.userAgent;

    $scope.showLisence = false;

    $scope.back = function() {
        //$event.preventDefault();
        $location.path('/');
    }

});