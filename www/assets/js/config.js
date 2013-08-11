/**
 * Hitchwiki Phrasebook configuration
 */

// App Settings
var appVer = '1.0.1',
    nativeReady = false, // Use cordova to bridge native device?
    defaultUILang = 'en_UK';


// Underscore config
_.templateSettings = {
	interpolate : /\{\{=(.+?)\}\}/g,
	escape : /\{\{-(.+?)\}\}/g,
	evaluate : /\{\{(.+?)\}\}/g
};


// Jquery Mobile config
$(document).bind("mobileinit", function () {
	$.mobile.ajaxEnabled = false;
	$.mobile.linkBindingEnabled = false;
	$.mobile.hashListeningEnabled = false;
	$.mobile.pushStateEnabled = false;
 	$.mobile.touchOverflowEnabled = true;
	$.mobile.defaultPageTransition = 'slide';
	$.extend($.mobile, {
	    metaViewportContent: "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi"
	});
});