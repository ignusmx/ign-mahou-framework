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
        		console.log(templateElem.find(".input-container."+scope.mhConfigs[i].name));
        		
        		templateElem.find("[name="+config.name+"]")
        		.attr("ng-model", "model[mhConfigs["+i+"].model]");
        	}

            templateElem.find("md-checkbox").attr("ng-change", "change()");
            templateElem.find("md-checkbox").html("{{test}}");
            directiveElem.replaceWith($compile(templateElem)(scope));
        }

        $scope.showFieldErrorMessage = function(field, form)
		{
			console.log("asd");
			return field.$invalid && (field.$dirty || field.$touched || form.$submitted);
		}
    }
);