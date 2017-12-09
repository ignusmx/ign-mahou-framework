/**
 * @class MHFormCtrl
 * @memberof Controllers
 * @description
 * controller used by mhForm directive to compile and bind events to create a fully functional angularJS form.
 *
 * 
 * @property {object}  scope                - Isolated scope.
 * @property {object}  scope.modelCopy      - The ngModel to be used with the form.
 * @property {string}  scope.mhFormName     - The name (HTML 'name' attribute) of the form.
 * @property {array}   scope.mhFormFields   - An array of mhFormFields.
 * @property {number}  scope.mhFormButtons  - How much gold the party starts with.
 */
angular
.module('mahou')
.controller('MHFormCtrl', 
    function MHFormCtrl($scope, $element, $attrs, $compile)
    {
        var self = this;
        self.scope = $scope;
        self.modelCopy = angular.copy(self.scope.model);

        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;

            var formName = self.scope.mhFormName;
            
            templateElem.attr("name", self.scope.mhFormName);
            
        	for(var i = 0; i < scope.mhFormFields.length; i++)
        	{
        		var config = scope.mhFormFields[i];
                var inputContainer = templateElem.find("[data-mh-name="+config.name+"]");
                inputContainer.find(".mh-title").html(config.title);
                
                var input = inputContainer.find(".mh-input");
                input.addClass(config.cssClasses);
        		input.attr("ng-model", "model"+getModelAsHash(config.model));

                var inputErrorMessage = inputContainer.find(".mh-input-error-message");
                if(config.required)
                {
                    inputErrorMessage.html("{{mhFormFields["+i+"].invalidMessage}}")
                    inputErrorMessage.attr("ng-show", "controller.fieldIsValid("+formName+"."+config.name+", "+formName+")");
                    input.attr("required", true);

                    if(self.scope.mhClassInvalid != null)
                    {
                        input.attr("ng-class", 
                        "{'"+self.scope.mhClassInvalid+"' : controller.fieldIsValid("+formName+"."+config.name+", "+formName+")}");
                    }
                }
                else
                {
                    inputErrorMessage.remove();
                }
                
                input.attr("name", config.name);

                if(input.prop("tagName") != null 
                    && input.prop("tagName").toLowerCase() == "input"
                    && config.type != null && config.type.length > 0)
                {
                    input.attr("type", config.type);
                }
                else if(config.type == "select")
                {
                    if(config.defaultOption == null)
                    {
                        input.find(".mh-select-default-option").remove();
                    }
                    else
                    {
                        input.find(".mh-select-default-option").html("{{mhFormFields["+i+"].default}}");
                        input.find(".mh-select-default-option").attr("ng-value", "{{null}}")
                    }
                    
                    input.find(".mh-select-option").attr("ng-repeat","option in mhFormFields["+i+"].options");
                    input.find(".mh-select-option").attr("value","{{option}}");
                    input.find(".mh-select-option").html("{{option}}");
                }
        	}

            for(var i = 0; i < scope.mhFormButtons.length; i++)
            {
                var config = scope.mhFormButtons[i];
                var button = templateElem.find(".mh-form-button[data-mh-name="+config.name+"]");

                if(config.disabledStatuses != null)
                {
                    var disabledExpression = "";
                    var disabledStatuses = config.disabledStatuses.split(",");

                    for(var j = 0; j < disabledStatuses.length; j++)
                    {
                        if(j > 0)
                        {
                            disabledExpression +=" || ";
                        }

                        switch(disabledStatuses[j].trim())
                        {
                            case MHFormStatus.FORM_VALID : disabledExpression += formName+".$valid";
                            break;
                            case MHFormStatus.FORM_INVALID : disabledExpression += "!"+formName+".$valid";
                            break;
                            case MHFormStatus.MODEL_CHANGED : disabledExpression += "controller.modelChanged()";
                            break;
                            case MHFormStatus.MODEL_UNCHANGED : disabledExpression += "!controller.modelChanged()";
                            break;
                        }
                    }
                    
                    button.attr("ng-disabled", disabledExpression);    
                }
                
                button.attr("ng-click", "mhFormButtons["+i+"].action(model, "+formName+")");
                button.addClass(config.cssClasses);
                button.find(".mh-title").html(config.title);
            }

            directiveElem.replaceWith($compile(templateElem)(scope));
        }

        this.fieldIsValid = function(field, form)
		{
			return field.$invalid && (field.$dirty || field.$touched || form.$submitted);
		}

        this.modelChanged = function()
        {
            return !angular.equals(self.scope.model, self.modelCopy);
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