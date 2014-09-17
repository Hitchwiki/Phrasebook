/**
 * mainCtrl Controller
 *
 * Controller for header menu, UI and much of the app's global behaviour
 *
 */
Phrasebook.controller('mainCtrl', function($scope, $location, $browser, $http, $log, $cookies, $cookieStore, $routeParams) {

    // Language meta
    $scope.locales = locales || {};
    $scope.localesStructure = localesStructure || {};

    /*
     * Language - from
     */
    if($routeParams.localeFrom) {
        $scope.localeFrom = $routeParams.localeFrom;
    }
    else if($cookieStore.get('localeFrom')) {
        $scope.localeFrom = $cookieStore.get('localeFrom');
    }
    else {
        $scope.localeFrom = false;
    }
    $scope.langFrom = ($scope.localeFrom) ? $scope.localeFrom.substr(0,2) : false;
    $scope.$watch('localeFrom', function(newValue, oldValue) {
        $scope.langFrom = newValue.substr(0,2) || false;
    });


    /*
     * Language - to
     */
    if($routeParams.localeTo) {
        $scope.localeFrom = $routeParams.localeTo;
    }
    else if($cookieStore.get('localeTo')) {
        $scope.localeTo = $cookieStore.get('localeTo');
    }
    else {
        $scope.localeTo = false;
    }
    $scope.langTo = ($scope.localeTo) ? $scope.localeTo.substr(0,2) : false;
    $scope.$watch('localeTo', function(newValue, oldValue) {
        $scope.langTo = newValue.substr(0,2) || false;
    });


    // Menu toggles
    $scope.audio = ($cookieStore.get('audio')) ? $cookieStore.get('audio') : false;
    $scope.voice = ($cookieStore.get('voice')) ? $cookieStore.get('voice') : false;
    $scope.visibility = ($cookieStore.get('visibility')) ? $cookieStore.get('visibility') : true;

    // Translation contrainers
    $scope.localeFromStrings = {};
    $scope.localeToStrings = {};

    $scope.location = $location;

    $scope.UI = function(key) {

        if( $scope.localeFrom !== false && $scope.localeFromStrings.length > 0 && $scope.localeFromStrings.UI[key] ) {
            return $scope.localeFromStrings.UI[key];
        }

        // Fall back into default UI translations if we don't have language file loaded.
        // @see scripts/fetch-translations.py and /src/js/locales-default-ui.js for more
        else if( defaultUI[key] ) {
            return defaultUI[key];
        }

        else return '';
    };

    $scope.setLang = function($event, code, direction) {

        $log.log("->setLang: " + code + ', ' + direction);

        if($event !== false) $event.preventDefault();

        if(!direction) return;

        // Set it
        if(direction == 'To') $scope.localeTo = code;
        else if(direction == 'From') $scope.localeFrom = code;

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
     * Uses $scope.localeTo || $scope.localeFrom to determine which locale to load
     */
    $scope.loadTranslation = function(direction) {

        $log.log("->loadTranslation: " + direction);

        if(!direction) return;

        var code = (direction == 'To') ? $scope.localeTo : $scope.localeFrom;

        $http({
                method: 'GET',
                cache: true,
                url: 'assets/locale/' + code + '.json?ver=' + localesVer
              })
              .success(function(data, status, headers, config) {

                  $log.log("->loadTranslation->get: " + code + ' ->success');

                  $log.log(data);

                  if(direction == 'From') $scope.localeFromStrings = data;
                  else if(direction == 'To') $scope.localeToStrings = data;

              })
              .error(function(data, status, headers, config) {
                  $log.error("->loadTranslation->get: " + code + ' ->error');
                  alert("Obs! Something went wrong. Translations for " + $scope.langName(code, 'the chosen language') + " couldn't be loaded. Falling back to English.");
                  $scope.setLang(false, 'en_UK', direction);
              });
    };


    /**
     * Give nice countryname
     */
    $scope.langName = function(code, onFalse) {

        if(!onFalse) onFalse = '';

        return (!code) ? onFalse : $scope.locales[code].name;
    };



    /**
     * Switch voice command support on/off
     */
     /*
    $scope.toggleVoice = function($event) {
        $event.preventDefault();
        if($scope.voice) {
            $scope.voice = false;
            $cookieStore.put('voice', false);
        }
        else {
            $scope.voice = true;
            $cookieStore.put('voice', true);
        }
    }
    */


    /**
     * Switch audio support on/off
     */
     /*
    $scope.toggleAudio = function($event) {
        $event.preventDefault();
        if($scope.audio) {
            $scope.audio = false;
            $cookieStore.put('audio', false);
        }
        else {
            $scope.audio = true;
            $cookieStore.put('audio', true);
        }
    }
    */


    /**
     * Switch visibility of translations on/off
     */
    $scope.toggleVisibility = function($event) {
        $event.preventDefault();
        if($scope.visibility) {
            $scope.visibility = false;
            $cookieStore.put('visibility', false);
        }
        else {
            $scope.visibility = true;
            $cookieStore.put('visibility', true);
        }
    }


    $scope.flag = function(code) {

        // Duhh... (uk => gb)
        if(code == 'en_UK') return 'assets/img/flags/gb.svg';

        if(typeof code == 'string' || code instanceof String) return 'assets/img/flags/' + code.substring(3, code.length).toLowerCase() + '.svg';

        return '#';
    };


    /**
     * Finally, if this is cold start and we had locales set but nothing loaded, just go ang grab em...
     */
    if($scope.localeFrom != false) $scope.loadTranslation('From');

    if($scope.localeTo != false) $scope.loadTranslation('To');


});

