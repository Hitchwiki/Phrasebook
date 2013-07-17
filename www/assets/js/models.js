/**
 * Single translation
 */
var Translation = Backbone.Model.extend({

    
	initialize: function () {
		console.log('-> Translation.initialize');
	},
	
	translate: function (language) {
        
        console.log( languages[language] );
        this.set( languages[language] );
        
	}

});