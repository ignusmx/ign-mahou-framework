angular
.module('mahou')
.controller('MHFormCtrl', 
    function MHFormCtrl($scope, $element, $attrs, $compile)
    {
        var self = this;
        $scope.test = "testdata";
        $scope.change = function(){
        	alert("change");
        }

        this.compileTemplate = function(scope, templateElem, directiveElem)
        {
        	for(var i = 0; i < scope.mhConfigs.length; i++)
        	{
        		var config = scope.mhConfigs[i];

        		templateElem.find("input[name="+config.name+"]").attr("ng-model", "model[mhConfigs["+i+"].model]");
        	}

            templateElem.find("md-checkbox").attr("ng-change", "change()");
            templateElem.find("md-checkbox").html("{{test}}");
            directiveElem.replaceWith($compile(templateElem)(scope));
        }
    }
);