/**
 * Ctrl for translations / language lists
 */
Phrasebook.controller('listCtrl', function($rootScope, $scope, $browser, $http, $log, $cookies, $cookieStore) {

    $scope.play = function(key, code) {
        $log.log("Obs! No audio yet: " + key + " / " + code);
        alert("Obs! No audio yet...");
    };

    // Currently open translation string
    $scope.selectedTranslation = false;

    // Toggle translations open/close
    $scope.selectTranslationString = function($event, key) {
        $scope.selectedTranslation = ($scope.selectedTranslation == key) ? false : key;
        $log.log(key);
        $event.preventDefault();
    };

    $scope.translationString = function(string) {
        if(typeof string == 'object') {
            var formated = '',
                first = true,
                //divider = '<span class="fa fa-ellipsis-h"></span>';
                divider = ' | ';
            angular.forEach(string, function(value, key){

                if(!first) formated += divider;
                else first = false;

                formated += value;
            });
            return formated;
        }
        else return string;
    }

});