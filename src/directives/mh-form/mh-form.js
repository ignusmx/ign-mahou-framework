angular.module('mahou').directive('mhForm', function ( $templateRequest ) {

    return {
        restrict: 'E',
        scope: 
        { 
            model : '=ngModel',
            mhFormName : "=",
            mhFormFields : '=',
            mhFormButtons : '='
        },
        controller: 'MHFormCtrl',
        controllerAs : 'controller'
    };
})