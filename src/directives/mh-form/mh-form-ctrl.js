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
        	for(var i = 0; i < scope.mhFormFields.length; i++)
        	{
        		var config = scope.mhFormFields[i];

                var inputContainer = templateElem.find("[data-mh-name="+config.name+"]");
                inputContainer.find(".mh-title").html(config.title);

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
                        input.find(".mh-select-default-option").html("{{mhFormFields["+i+"].default}}");
                    }
                    
                    input.find(".mh-select-option").attr("ng-repeat","option in mhFormFields["+i+"].options");
                    input.find(".mh-select-option").attr("ng-value","option");
                    input.find(".mh-select-option").html("{{option}}");
                }
        	}

            for(var i = 0; i < scope.mhFormButtons.length; i++)
            {
                var config = scope.mhFormButtons[i];
                var button = templateElem.find(".mh-form-button[data-mh-name="+config.name+"]");

                button.attr("ng-click", "mhFormButtons["+i+"].action(model)");
                button.addClass(config.cssClasses);
                console.log(config.cssClasses)
                button.find(".mh-title").html(config.title);
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