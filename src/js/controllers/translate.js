/**
 * Controller for community translators
 */
Phrasebook.controller('translateCtrl', function($scope) {

    $scope.back = function() {
        //$event.preventDefault();
        $location.path('/');
    }

});
