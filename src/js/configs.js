/**
 * Route configuration
 */
Phrasebook.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl'
    })
    .when('/:localFrom/:localeTo/', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl'
    })
    .when('/:localFrom/:localeTo/:selectedCategory/', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl'
    })
    .when('/:localFrom/:localeTo/:selectedCategory/:key/', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl'
    })
    .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'aboutCtrl'
    })
    .when('/translate', {
        templateUrl: 'partials/translate.html',
        controller: 'translateCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(false);
});