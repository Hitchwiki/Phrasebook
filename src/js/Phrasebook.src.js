/**
 * Phrasebook AngularJS module
 */
var Phrasebook = angular.module('Phrasebook', [
        'ngAnimate',
        'ngResource',
        'ngRoute',
        'ngTouch',
        'ngCookies'
    ]);


/**
 * Routes
 */
Phrasebook.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/phrasebook.html',
        controller: 'listCtrl'
    }).
    when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'aboutCtrl'
    }).
    when('/translate', {
        templateUrl: 'partials/translate.html',
        controller: 'translateCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(false);
});


/**
 * Controller for main navigation
 */
Phrasebook.controller('navigationCtrl', function($rootScope, $scope, $location, $browser, $http, $log, $cookies, $cookieStore) {

    $rootScope.locales = locales;
    $rootScope.localeFrom = false;//$cookieStore.get('localeFrom') || false;
    $rootScope.localeTo = false;//$cookieStore.get('localeTo') || false;
    $rootScope.audio = false;//$cookieStore.get('audio') || false;
    $rootScope.voice = false;//$cookieStore.get('voice') || false;
    $rootScope.UI = {
                        'phrasebook': 'Phrasebook',
                        'translate-from': 'Translate from...',
                        'translate-to': 'Translate to...',
                        'search': 'Search...',
                        'about': 'About',
                        'contact-us': 'Contact us',
                        'choose': 'Choose',
                        'audio-off': 'Audio off',
                        'audio-on': 'Audio on',
                        'voice-off': 'Voice commands off',
                        'voice-on': 'Voice commands on'
                    };
    $rootScope.localeFromStrings = {};
    $rootScope.localeToStrings = {};

    $scope.location = $location;

    $rootScope.setLang = function($event, code, direction) {

        $log.log("->setLang: " + code + ', ' + direction);

        $event.preventDefault();

        if(!direction) return;

        // Set it
        if(direction == 'To') $rootScope.localeTo = code;
        else if(direction == 'From') $rootScope.localeFrom = code;

        if(code == false) {
            // Remove it
            $cookieStore.remove('locale' + direction);
        }
        else {
            // Store it
            $cookieStore.put('locale' + direction, code);

            // Get it!
            $scope.loadTranslation(direction);
        }

    };


    /**
     * Fetch translation json
     * Uses $rootScope.localeTo || $rootScope.localeFrom to determine which locale to load
     */
    $scope.loadTranslation = function(direction) {

        $log.log("->loadTranslation: " + direction);

        if(!direction) return;

        var code = (direction == 'To') ? $rootScope.localeTo : $rootScope.localeFrom;

        $http.get('/assets/locale/' + code + '.json')
            .then(function(res){

                 $log.log("->loadTranslation->get: " + code + ' ->success');

                 // Don't let UI translations end up to string list, grab them separate
                 if(direction == 'From') $rootScope.UI = res.data.UI;

                 delete res.data.UI;

                 if(direction == 'From') $rootScope.localeFromStrings = res.data;
                 else if(direction == 'To') $rootScope.localeToStrings = res.data;

            });
    };


    /**
     * Give nice countryname
     */
    $scope.langName = function(code, onFalse) {

        if(!onFalse) onFalse = '';

        return (code == false) ? onFalse : $scope.locales[code].name;
    };



    /**
     * Switch voice command support on/off
     */
    $scope.toggleVoice = function($event) {
        $event.preventDefault();
        if($rootScope.voice) {
            $rootScope.voice = false;
            $cookieStore.put('voice', false);
        }
        else {
            $rootScope.voice = true;
            $cookieStore.put('voice', true);
        }
    }


    /**
     * Switch audio support on/off
     */
    $scope.toggleAudio = function($event) {
        $event.preventDefault();
        if($rootScope.audio) {
            $rootScope.audio = false;
            $cookieStore.put('audio', false);
        }
        else {
            $rootScope.audio = true;
            $cookieStore.put('audio', true);
        }
    }


    $rootScope.flag = function(code) {

        // Duhh... (uk => gb)
        if(code == 'en_UK') return 'assets/img/flags/gb.svg';

        if(typeof code == 'string' || code instanceof String) return 'assets/img/flags/' + code.substring(3, code.length).toLowerCase() + '.svg';

        return '#';
    };


    /**
     * Finally, if this is cold start and we had locales set but nothing loaded, just go ang grab em...
     */
    if($rootScope.localeFrom != false) $scope.loadTranslation('from');

    if($rootScope.localeTo != false) $scope.loadTranslation('to');

});


/**
 * Ctrl for translations / language lists
 */
Phrasebook.controller('listCtrl', function($rootScope, $scope, $browser, $http, $log, $cookies, $cookieStore) {

    $scope.play = function(key, code) {
        $log.log("Obs! No audio yet: " + key + " / " + code);
        alert("Obs! No audio yet...");
    };

});



/**
 * Controller for community translators
 */
Phrasebook.controller('translateCtrl', function($scope) {

});


/**
 * Controller for about page
 */
Phrasebook.controller('aboutCtrl', function($scope) {

    $scope.localesVer = localesVer;

    $scope.ver = phrasebookVer;

    $scope.day = phrasebookDay;

    $scope.device = navigator.userAgent;

    $scope.back = function() {
        //$event.preventDefault();
        $location.path('/');
    }

});

