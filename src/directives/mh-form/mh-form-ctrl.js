angular
.module('mahou')
.controller('MHFormCtrl', 
    function MHFormCtrl($scope, $element, $attrs, $compile)
    {
        var self = this;
        self.scope = $scope;

        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;
        	for(var i = 0; i < scope.mhConfigs.length; i++)
        	{
        		var config = scope.mhConfigs[i];

                var inputContainer = templateElem.find("[data-mh-name="+config.name+"]");
                inputContainer.find("label").html(config.label);

                var input = inputContainer.find(".mh-input");


        		input.attr("ng-model", "model"+getModelAsHash(config.model));

                if(input.prop("tagName") == "input"
                 && config.type != null && config.type.length > 0)
                {
                    inputContainer.attr("type", config.type);
                }
                else if(config.type == "select")
                {
                    if(config.default == null)
                    {
                        input.find(".mh-select-default-option").remove();
                    }
                    else
                    {
                        input.find(".mh-select-default-option").html("{{mhConfigs["+i+"].default}}");
                    }
                    
                    input.find(".mh-select-option").attr("ng-repeat","option in mhConfigs["+i+"].options");
                    input.find(".mh-select-option").attr("ng-value","option");
                    input.find(".mh-select-option").html("{{option}}");
                }
        	}

            directiveElem.replaceWith($compile(templateElem)(scope));
        }

        $scope.showFieldErrorMessage = function(field, form)
		{
			return field.$invalid && (field.$dirty || field.$touched || form.$submitted);
		}

        //private functions
        function getModelAsHash(model)
        {
            var modelTree = model.split(".");
            var hashedTree = "";
            for(var i = 0; i < modelTree.length; i++)
            {
                hashedTree += "['"+modelTree[i]+"']";
            }

            return hashedTree;
        }
    }
);