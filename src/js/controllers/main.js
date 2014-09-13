/**
 * mainCtrl Controller
 *
 * Controller for header menu, UI and much of the app's global behaviour
 *
 */
Phrasebook.controller('mainCtrl', function($scope, $location, $browser, $http, $log, $cookies, $cookieStore) {

    $scope.locales = locales;
    $scope.localesStructure = localesStructure;
    $scope.localeFrom = ($cookieStore.get('localeFrom')) ? $cookieStore.get('localeFrom') : false;
    $scope.localeTo = ($cookieStore.get('localeTo')) ? $cookieStore.get('localeTo') : false;
    $scope.audio = ($cookieStore.get('audio')) ? $cookieStore.get('audio') : false;
    $scope.voice = ($cookieStore.get('voice')) ? $cookieStore.get('voice') : false;
    $scope.localeFromStrings = {};
    $scope.localeToStrings = {};

    $scope.location = $location;

    $scope.defaultUI = {
        "translate_from": "Translate from...",
        "visibility_off": "Hide translations",
        "about": "About",
        "contact_us": "Contact us",
        "help_translating": "Help translating",
        "voice_off": "Voice commands off",
        "visibility_on": "Show translations",
        "search": "Search...",
        "voice_on": "Voice commands on",
        "audio_on": "Audio on",
        "phrasebook": "Phrasebook",
        "translate_to": "Translate to...",
        "audio_off": "Audio off",
        "choose": "Choose"
    };

    $scope.UI = function(key) {

        if( $scope.localeFromStrings.UI[key] ) {
            return $scope.localeFromStrings.UI[key];
        }
        else if( $scope.defaultUI[key] ) {
            return $scope.defaultUI[key];
        }
        else return key;
    };

    $scope.setLang = function($event, code, direction) {

        $log.log("->setLang: " + code + ', ' + direction);

        $event.preventDefault();

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

        var cache = new Date().getTime() / 1000;

        $log.log('cache:' + cache);

        $http({
                method: 'GET',
                cache: true,
                url: 'assets/locale/' + code + '.json?c=' + cache
              })
              .success(function(data, status, headers, config) {

                  $log.log("->loadTranslation->get: " + code + ' ->success');


                  $log.log(data);

                  if(direction == 'From') $scope.localeFromStrings = data;
                  else if(direction == 'To') $scope.localeToStrings = data;

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
        if($scope.voice) {
            $scope.voice = false;
            $cookieStore.put('voice', false);
        }
        else {
            $scope.voice = true;
            $cookieStore.put('voice', true);
        }
    }


    /**
     * Switch audio support on/off
     */
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

