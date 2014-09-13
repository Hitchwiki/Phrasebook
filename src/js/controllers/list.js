/**
 * Ctrl for translations / language lists
 */
Phrasebook.controller('listCtrl', function($scope, $browser, $http, $log, $cookies, $cookieStore) {

    // http://stackoverflow.com/questions/19287716/skip-ng-repeat-json-ordering-in-angular-js
    $scope.notSorted = function(obj){
        if (!obj) {
            return [];
        }
        return Object.keys(obj);
    }

    $scope.play = function(key, code) {
        $log.log("Obs! No audio yet: " + key + " / " + code);
        alert("Obs! No audio yet...");
    };

    $scope.back = function($event) {
        $event.preventDefault();
        $scope.selectedCategory = false;
    };

    // Currently open translation string
    $scope.selectedTranslation = false;

    // Toggle translations open/close
    $scope.selectTranslationString = function($event, key) {
        $scope.selectedTranslation = ($scope.selectedTranslation == key) ? false : key;
        $log.log(key);
        $event.preventDefault();
    };


    // Currently open category
    $scope.selectedCategory = false;

    // Open category
    $scope.selectCategory = function($event, category) {

        $scope.selectedCategory = ($scope.selectedCategory == category) ? false : category;
        $log.log('Category: ' + category);
        $event.preventDefault();
    };

    /*
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
    */


});