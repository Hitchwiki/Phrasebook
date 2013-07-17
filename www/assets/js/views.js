var listView = Backbone.View.extend({

	events: {
		'click #button-info': 'goInfo',
		'click #button-settings': 'goSettings',
		'click #languagelist a': 'langSelected'
	},

	initialize: function () {
	    console.log("->listView");
	
		this.template = _.template($('#template-list-view').html());
	},

	render: function () {

		this.$el.html(this.template({
    		UItitle: languages[UILang].ui['phrasebook'],
    		UISearch: languages[UILang].ui['search']
		}));

		this.renderLanguageList();

		return this;
	},
	
	renderLanguageList: function () {
    
	    console.log("->listView.renderLanguageList");

		var $languageList = this.$el.find('ul');
        
		_.map(languages, function(language, langCode){ 

			$languageList.append(
			    '<li data-icon="false">' +
			        '<a href="#" data-lang="' + langCode + '">' +
			            '<img src="assets/images/flags/' + language.flag + '.png" alt="" class="ui-li-icon" />' +
			            language.name +
			        '</a>' +
                '</li>'
			    );
		
		});
		
		return this;

	},

	langSelected: function (event) {
		var selectedLanguage = $(event.target).data('lang');
		//this.$el.find('ul').addClass('ui-disabled');
		//app.language.set('active', activeLanguage);
		location.hash = selectedLanguage;
		app.translationPage(selectedLanguage);
	},
	
	goSettings: function () {
    	console.log("->listView.goSettings");
    	app.settingsPage('list');
	},
	
	goInfo: function () {
    	console.log("->listView.goInfo");
    	app.infoPage();
	}
	
 
});


var settingsView = Backbone.View.extend({

	events: {
		'click #button-back': 'goBack',
		'click #languagelist a': 'langSelected'
	},

	initialize: function () {
	    console.log("->settingsView");
	    
	    console.log("->settingsView.returnPage: " + this.options.returnPage);

		this.template = _.template($('#template-settings-view').html());
	},

	render: function () {
		this.$el.html(this.template({
    		UItitle: languages[UILang].ui['interface'],
    		UISearch: languages[UILang].ui['search']
		}));
		
		this.renderLanguageList();

		return this;
	},

    
	renderLanguageList: function () {
    
	    console.log("->listView.renderLanguageList");

		var $languageList = this.$el.find('ul');
        
		_.map(languages, function(language, langCode){ 
		    
			$languageList.append(
			    '<li data-icon="' + ( ( UILang == langCode ) ? 'check' : 'false'  )  + '">' +
			        '<a href="#" data-lang="' + langCode + '">' +
			            '<img src="assets/images/flags/' + language.flag + '.png" alt="" class="ui-li-icon">' +
			            language.name +
			        '</a>' +
                '</li>'
			 );

		});//map
		
		return this;

	},

	langSelected: function (event) {
        console.log("->settingsView.langSelected");
		app.setUILang( $(event.target).data('lang') );
		this.goBack();
	},
	
	goBack: function () {
        console.log("->settingsView.goBack");
	    if(this.options.returnPage == 'translation') {
        	app.translationPage( app.getLang() );
	    }
	    else {
        	app.listPage();
	    }
	}
 
});


var infoView = Backbone.View.extend({

	events: {
		'click #button-back': 'goList'
	},

	initialize: function () {
	    console.log("->infoView");
	    
		this.template = _.template($('#template-info-view').html());
	},

	render: function () {
		this.$el.html(this.template({
    		UItitle: languages[UILang].ui['info'],
    		infoAppVer: appVer,
    		infoLangVer: languagesVer + " (" + app.niceTime(languagesVer) + ")"
		}));

        // Scrollable map area
        //.
      //  var scroller = new IScroll( this.$el.find('#map') );

		return this;
	},
	
	goList: function () {
        console.log("->infoView.goList");
		app.listPage();
	}
});



var translationView = Backbone.View.extend({

	events: {
		'click #button-translation-change': 'goLanguagelist',
		'click #button-settings': 'goSettings',
		'click .original': 'showTranslation',
		'click h1': 'scrollTop'
	},

	initialize: function () {
		this.template = _.template($('#template-translation-view').html());

		this.flag = this.model.attributes.flag;
		this.name = this.model.attributes.name;
		this.strings = this.model.attributes.strings;
	},

	render: function () {
		this.$el.html(this.template({
    		flag: this.flag,
    		languageName: this.name,
    		UISearch: languages[UILang].ui['search']
		}));

		this.renderTranslations();

		return this;
	},

	renderTranslations: function () {
	    console.log("->translationView.renderTranslations");

		var $translationList = this.$el.find('ul');
        
        var translationView = this; //ugh... just to pass that one function to each loop.
        
		_.each(this.strings, function (translation, i) {
		    
		    // Line is an array, so it should be put under previous line as sub translations
		    if( _.isArray( translation ) ) {

		        _.each(translation, function (subtranslation, i2) {
		        
    		        var $subtranslations = $('<div class="subtranslation"></div>');

                    $subtranslations.html( translationView.translationLine(languages[ UILang ].strings[i][i2], subtranslation) );

                    $subtranslations.appendTo( $translationList.find("li:last") );
                });
                
			    
		    } 
		    // Produce normal translation line
		    else {
    		    
		        var $li = $("<li>");
		        
                $li.html( translationView.translationLine(languages[ UILang ].strings[i], translation) );
                
			    $li.appendTo( $translationList );
            
            }

		});

		return this;

	},
	
	/**
	 * Produce row with original and translated text
	 * @param {String} original Text in original language
	 * @param {String} translation Text in translated language 
	 */
	translationLine: function (original, translation) {
	
	    if( _.isString(original) && _.isString(translation) ) {

            var divider = '<span class="di">|</span>';
	
    	    return '<h3><a class="original" href="#">' + original.split('|').join(divider) + '</a></h3>' +
                   '<div class="translation">' + translation.split('|').join(divider) + '</div>';
        }
        else return "";
	},
	
	showTranslation: function (event) {
	
        // Hide all previously open translations
        $(".translation:visible").slideUp('fast');
        $(".translationOpen").removeClass("translationOpen");

        // Make sure we're not clicking divider
	    var eventTarget = ( $(event.target).hasClass("di") ) ? $(event.target).parent() : $(event.target);
	    
	    $translationRow = eventTarget.parent().parent();
	    $translation = $translationRow.find(".translation");
        
        // Show translation
        if($translation.is(":hidden")) {
            $translationRow.addClass("translationOpen");
            $translation.slideDown('fast');
        }
	
	},

	goLanguagelist: function () {
	    app.resetLang();
		app.listPage();
	},
	
	goSettings: function () {
    	console.log("->translationView.goSettings");
    	app.settingsPage('translation');
    },
    
    scrollTop: function () {
        jQuery('html,body').animate({scrollTop: 0}, 200);
    }
 
});

