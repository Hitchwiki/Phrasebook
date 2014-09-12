/**
 * navigationCtrl Controller
 *
 * Controller for header menu, UI and much of the app's global behaviour
 *
 * @todo: Separate some of this to mainCtrl or something?
 */
Phrasebook.controller('navigationCtrl', function($rootScope, $scope, $location, $browser, $http, $log, $cookies, $cookieStore) {

    $rootScope.locales = locales;
    $rootScope.localesStructure = localesStructure;
    $rootScope.localeFrom = ($cookieStore.get('localeFrom')) ? $cookieStore.get('localeFrom') : false;
    $rootScope.localeTo = ($cookieStore.get('localeTo')) ? $cookieStore.get('localeTo') : false;
    $rootScope.audio = ($cookieStore.get('audio')) ? $cookieStore.get('audio') : false;
    $rootScope.voice = ($cookieStore.get('voice')) ? $cookieStore.get('voice') : false;
    $rootScope.localeFromStrings = {};
    $rootScope.localeToStrings = {};

    $scope.location = $location;

    $rootScope.translateUI = function(key) {
        return $rootScope.localeFromStrings.UI[key];
    };

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

        $http({
                method: 'GET',
                cache: true,
                url: 'assets/locale/' + code + '.json'
              })
              .success(function(data, status, headers, config) {

                  $log.log("->loadTranslation->get: " + code + ' ->success');

                  if(direction == 'From') $rootScope.localeFromStrings = data;
                  else if(direction == 'To') $rootScope.localeToStrings = data;

              })
              .error(function(data, status, headers, config) {
                  $log.error("->loadTranslation->get: " + code + ' ->error');
                  alert("Obs! Something went wrong. Translations couldn't be loaded.");
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
    if($rootScope.localeFrom != false) $scope.loadTranslation('From');

    if($rootScope.localeTo != false) $scope.loadTranslation('To');

});

