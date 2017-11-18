angular
.module('mahou')
.controller('MHFormCtrl', 
    function MHFormCtrl($scope, $element, $attrs, $sce) 
    {
        var self = this;
        $scope.test = "testdata";
        $scope.change = function(){
        	alert("change");
        }
    }
);