/**
 * Hitchwiki Phrasebook
 */

/**
 * The App Router
 */
var Phrasebook = Backbone.Router.extend({

     /**
      * Construct router
      */
    initialize: function () {
        console.log('->AppRouter.initialize');
        
        var isFirstLaunch = $.cookie("phrasebook" + appVer);

        // Is this first start of the app?
        if(isFirstLaunch  == null ) {
            console.log('->AppRouter.initialize: first start of the app');

            $.cookie('phrasebook' + appVer, '1', { path: '/', expires: 999 });
            
            
            this.userPreferredLanguage();
            this.listPage()
        }
        
        // Not first start...
        else {
            console.log('->AppRouter.initialize: NOT first start of the app');
        
            // Get UI lang
            UILang = this.getUILang();
            
            // If user has opened some phrasebook already and left it open, open it again
            var selectedLang = this.getLang();
            if(selectedLang) {
                console.log("->AppRouter.initialize: previously selected phrasebook language: " + selectedLang);
                this.translationPage(selectedLang);
            }
            else {
                // Just list all phrasebooks
                this.listPage();
            }
            
        }

    }, // initialize


    /**
     * Show page listing languages
     */
    listPage: function () {
        console.log('->AppRouter.listPage');

        var view = new listView({id: 'list-view'});
        this.changePage(view);//, {transition: 'flip', reverse: false}
    },


    /**
     * Show settings page
     * @param {String} returnPage Where should back button lead from this page ("list" or "translation") 
     */
    settingsPage: function (returnPage) {
        console.log('->AppRouter.settingsPage');

        var view = new settingsView({id: 'settings-view', returnPage: returnPage});

        this.changePage(view);
        
    },


    /**
     * Show info page
     */
    infoPage: function () {
        console.log('->AppRouter.infoPage');

        var view = new infoView({id: 'info-view'});

        this.changePage(view);
        
    },


    /**
     * Show translations for language page
     * @param {String} language Language code
     */
    translationPage: function (language) {
        console.log('->AppRouter.translationPage: ' + language);
        
        this.setLang( language );

        this.translation = new Translation();
        this.translation.translate(language);

        var view = new translationView({
            model: this.translation
        });
        
        this.changePage(view);
    
    },


    /**
     * Wrapper for jQuery Mobile changePage
     * @param  {Backbone View} page    View to be displayed
     * @param  {Object} options Options
     */
    changePage: function (page, options) {
        console.log('->AppRouter.changePage');

        var $el = page.$el;

        $el.attr('data-role', 'page');
        $el.attr('data-theme', 'a');
        $el.attr('id', page.id);
        page.render();
        $el.appendTo('body');

        options = $.extend(options, { transition: 'fade' });

        $.mobile.changePage($el, $.extend({ changeHash: false }, options));
    },


    /**
     * Check user language from device/browser and set it
     */
    userPreferredLanguage: function () {
        console.log('->AppRouter.getUserPreferredLanguage');
        
        // Get preferred language from the device
        if(nativeReady) {

            var thisApp = this;

            navigator.globalization.getPreferredLanguage(
                function (language) {
                
                    console.log('->AppRouter.getUserPreferredLanguage: device: ' + language.value);
                    
                    this.setUserPreferredLanguage(language.value);
                },
                // Failed to get device language, try with browser info
                function () {
                    console.log('->AppRouter.getUserPreferredLanguage: Error getting getPreferredLanguage from device');
                    this.setUserPreferredLanguage(window.navigator.userLanguage || window.navigator.language);
                }
            );

        } // nativeReady

        // Get preferred language from the browser
        else {
            this.setUserPreferredLanguage(window.navigator.userLanguage || window.navigator.language);
        }
    },
    

    /**
     * Checks if language exists and sets if
     */
    setUserPreferredLanguage: function (language) {
        console.log('->AppRouter.setUserPreferredLanguage: '+language);
    
        // Got false, set language to default
        if(!_.isString(language)) {
            UILang = this.getUILang();
            this.setUILang(UILang);
        }
        // Got language, check if it's available. We're getting language codes in various formats: en, en-us, en_US
        else {
            
            language = language.replace('-','_');
            
            // Check if we have this language
            userPreferredLanguage = _.isObject(languages[ language ]) ? language : false;
            
            // Check if we can find language with two letter code instead
            if(userPreferredLanguage == false) {

                // Make sure it's 2
                language = language.substr(0,2);

                // Retrieve all the keys of the languagelist object
                var languageCodes = _.keys(languages);
                
                // Find first language code that matches that of user preferred
                userPreferredLanguage = _.find(_.toArray(languageCodes), function(langCode){
                    // In languageCodes array languages are in "en_US" format and user tells language in short "en" format.
                    return langCode.substr(0, 2) == language; 
                });
                
            }

            // Device language is on our language list, use it
            if(userPreferredLanguage) {
                console.log("->setUserPreferredLanguage: found " + userPreferredLanguage);
                UILang = userPreferredLanguage;
                this.setUILang(userPreferredLanguage);
            }
            // No dice... set to default
            else {
                console.log("->setUserPreferredLanguage: not found, set default");
                UILang = this.getUILang();
                this.setUILang(UILang);
            }
            
           return true;
            
        }
        
    },

    /**
     * Wrapper for jQuery Cookie to set language
     * @param  {String} lang Language code
     */
    setLang: function(language) {
        $.cookie('phrasebook_selectedLang', language, { path: '/', expires: 365 });
    },

    /**
     * Wrapper for jQuery Cookie to get language
     */
    getLang: function() {
        var language = $.cookie("phrasebook_selectedLang"); 
        return (language != '') ? language : false;
    },
    
    /**
     * Wrapper for jQuery Cookie to reset language
     */
    resetLang: function() {
        $.cookie('phrasebook_selectedLang', '', { path: '/', expires: -1 });
    },
    

    /**
     * Wrapper for jQuery Cookie to set UI language
     * @param  {String} lang Language code
     */
    setUILang: function(language) {
        UILang = language;
        $.cookie('phrasebook_UILang', language, { path: '/', expires: 999 });
    },

    /**
     * Wrapper for jQuery Cookie to get UI language
     */
    getUILang: function() {
        var language = $.cookie("phrasebook_UILang"); 
        return (_.isString(language)) ? language : defaultUILang;
    },
    
    /*
     * Return nice time out of unix timestamp
     */
    niceTime: function(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp*1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date+', '+month+' '+year+' '+hour+':'+min+':'+sec;

        return time;
    }

});

// Globals
var app, UILang;

$(window).load(function() {

    app = new Phrasebook();

});//window.load