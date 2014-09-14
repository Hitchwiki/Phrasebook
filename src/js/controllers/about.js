/**
 * Controller for about page
 */
Phrasebook.controller('aboutCtrl', function($scope) {

    $scope.localesVer = localesVer;

    $scope.ver = phrasebookVer;

    $scope.day = phrasebookDay;

    $scope.device = navigator.userAgent;

    $scope.showLisence = false;

    $scope.back = function() {
        //$event.preventDefault();
        $location.path('/');
    }


    /*
     * Different link depending on environment
     * @link http://developer.android.com/distribute/tools/promote/linking.html#android-app
     * @link https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md
     * @todo
     */
    $scope.linkAppleApp = 'https://itunes.apple.com/us/app/hitchwiki.org-phrasebook/id679023494?ls=1&mt=8';
    $scope.linkAndroidApp = 'https://play.google.com/store/apps/details?id=com.hitchwiki.phrasebook';
    $scope.linkAndroidSearch = 'https://play.google.com/store/search?q=hitchwiki';

});