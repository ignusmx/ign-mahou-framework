angular.module('app').directive('appGrid', function ( $compile )
{
    return {
        restrict: 'E',
        scope: 
        { 
            config : '=',
            selectAllChange : '&'
        },
        templateUrl : "modules/home/app-grid.html",
        link: function(scope, el, attrs, ctrl, transclude)
        {
            scope.selectRowChange = function(eee){
                console.log("eee:", eee);
            }   
        }
    };
});