/**
 * Phrasebook AngularJS module
 */
var Phrasebook = angular.module('Phrasebook', [
        'ngAnimate',
        'ngResource',
        'ngRoute',
        'ngTouch',
        'ngCookies'
    ])
    .run(function() {
        /*
         * Fastclick removes 300ms delay on tap clicks
         * @link https://github.com/ftlabs/fastclick
         * ngTouch already does this for ng-click directive but we need it everywhere else, too
         */
        FastClick.attach(document.body);
    });
