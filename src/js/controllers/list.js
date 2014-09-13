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

    $scope.playing = false;

    $scope.play = function(string, key, locale, $event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.playing = key + locale;

        // Initialize speech synthesis, we use polyfill only when speech synthesis is not available
        var fallbackSpeechSynthesis = window.getSpeechSynthesis();
        var fallbackSpeechSynthesisUtterance = window.getSpeechSynthesisUtterance();

        // To use polyfill directly call
        // var fallbackSpeechSynthesis = window.speechSynthesisPolyfill;
        // var fallbackSpeechSynthesisUtterance = window.SpeechSynthesisUtterancePolyfill;

        var u = new fallbackSpeechSynthesisUtterance( string );
        u.lang = locale.replace('_','-');
        u.volume = 1.0;
        u.rate = 1.0;
        u.onend = function(event) {
            $scope.playing = false;
            $log.log('Finished speech synthesis in ' + event.elapsedTime + ' seconds.');
        };
        fallbackSpeechSynthesis.speak(u);
    };

    $scope.back = function($event) {
        $event.preventDefault();
        $scope.selectedTranslation = false;
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