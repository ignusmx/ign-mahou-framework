angular.module('mahou').directive('mhForm', function ( $templateRequest ) {

    return {
        restrict: 'E',
        scope: 
        { 
            model : '=ngModel',
            mhFormFields : '=',
            mhFormButtons : '='
        },
        controller: 'MHFormCtrl',
        controllerAs : 'controller'
    };
})