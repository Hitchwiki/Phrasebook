/**
 * Ctrl for translations / language lists
 */
Phrasebook.controller('listCtrl', function($scope, $browser, $http, $log, $cookies, $cookieStore, $routeParams) {

    // http://stackoverflow.com/questions/19287716/skip-ng-repeat-json-ordering-in-angular-js
    $scope.notSorted = function(obj){
        if (!obj) {
            return [];
        }
        return Object.keys(obj);
    }

    /*
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
        u.volume = 1.0; // 0 to 1
        u.rate = 1.0; // 0.1 to 10
        u.onend = function(event) {
            $scope.playing = false;
            $log.log('Finished speech synthesis in ' + event.elapsedTime + ' seconds.');
        };
        u.onerror = function(event) {
            $scope.playing = false;
            $log.log('Error on speech synthesis.');
        };
        fallbackSpeechSynthesis.speak(u);
    };
    */

    $scope.back = function($event) {
        $event.preventDefault();
        $scope.selectedTranslation = false;
        $scope.selectedCategory = false;
    };

    // Currently open translation string
    $scope.selectedTranslation = ($routeParams.key) ? $routeParams.key : false;

    // Toggle translations open/close
    $scope.selectTranslationString = function($event, key) {
        $scope.selectedTranslation = ($scope.selectedTranslation == key) ? false : key;
        $log.log(key);
        $event.preventDefault();
    };

    // Currently open category
    $scope.selectedCategory = ($routeParams.selectedCategory) ? $routeParams.selectedCategory : false;

    // Open category
    $scope.selectCategory = function($event, category) {
        $scope.selectedCategory = ($scope.selectedCategory === category) ? false : category;
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


    /**
     * Test if Text to speech is supported for this language (basically what Google Translate supports
     */
     /*
    $scope.textToSpeechSupported = function(lang) {
        return $scope.supportedTextToSpeechLanguages.indexOf(lang) > -1;
    };
    */


    /**
     * Full list of languages.
     * @type {Object}
     *
     * List from google-tts lib, Copyright (c) 2014 Ramesh Nair, MIT licensed
     * @link https://github.com/hiddentao/google-tts/blob/master/src/google-tts.js#L52
     */
     /*
    $scope.supportedTextToSpeechLanguages = {
      'af' : 'Afrikaans',
      'sq' : 'Albanian',
      'ar' : 'Arabic',
      'hy' : 'Armenian',
      'ca' : 'Catalan',
      'zh-CN' : 'Mandarin (simplified)',
      'zh-TW' : 'Mandarin (traditional)',
      'hr' : 'Croatian',
      'cs' : 'Czech',
      'da' : 'Danish',
      'nl' : 'Dutch',
      'en' : 'English',
      'eo' : 'Esperanto',
      'fi' : 'Finnish',
      'fr' : 'French',
      'de' : 'German',
      'el' : 'Greek',
      'ht' : 'Haitian Creole',
      'hi' : 'Hindi',
      'hu' : 'Hungarian',
      'is' : 'Icelandic',
      'id' : 'Indonesian',
      'it' : 'Italian',
      'ja' : 'Japanese',
      'ko' : 'Korean',
      'la' : 'Latin',
      'lv' : 'Latvian',
      'mk' : 'Macedonian',
      'no' : 'Norwegian',
      'pl' : 'Polish',
      'pt' : 'Portuguese',
      'ro' : 'Romanian',
      'ru' : 'Russian',
      'sr' : 'Serbian',
      'sk' : 'Slovak',
      'es' : 'Spanish',
      'sw' : 'Swahili',
      'sv' : 'Swedish',
      'ta' : 'Tamil',
      'th' : 'Thai',
      'tr' : 'Turkish',
      'vi' : 'Vietnamese',
      'cy' : 'Welsh'
    }
    */

});
