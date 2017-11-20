angular.module('mahou').directive('mhForm', function ( $templateRequest ) {

    return {
        restrict: 'E',
        scope: 
        { 
            model : '=ngModel',
            mhConfigs : '='
        },
        controller: 'MHFormCtrl',
        controllerAs : 'controller'
    };
})