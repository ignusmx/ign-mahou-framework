/**
 * @class MHFormCtrl
 * @memberof Controllers
 * @description
 * use this directive to create a fully functional AngularJS form.<br>
 * Includes fields validation, events callbacks and UI customization using themes.
 *
 * **directive types:** Element only
 * 
 * @property {object}  scope                - Isolated scope.
 * @property {object}  scope.model          - The ngModel to be used with the form.
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
            console.log(formName);
            templateElem.attr("name", self.scope.mhFormName);
            
        	for(var i = 0; i < scope.mhFormFields.length; i++)
        	{
        		var config = scope.mhFormFields[i];
                var inputContainer = templateElem.find("[data-mh-name="+config.name+"]");
                inputContainer.find(".mh-title").html(config.title);
                
                var input = inputContainer.find(".mh-input");
        		input.attr("ng-model", "model"+getModelAsHash(config.model));

                var inputErrorMessage = inputContainer.find(".mh-input-error-message");
                if(config.required)
                {
                    inputErrorMessage.html("{{mhFormFields["+i+"].invalidMessage}}")
                    inputErrorMessage.attr("ng-show", "controller.fieldIsValid("+formName+"."+config.name+", "+formName+")");
                    input.attr("required", true);
                    if(config.invalidClass != null)
                    {
                        input.attr("ng-class", 
                        "{'"+config.invalidClass+"' : controller.fieldIsValid("+formName+"."+config.name+", "+formName+")}");
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

                if(config.disabledEvents != null)
                {
                    var disabledExpression = "";
                    var disabledEvents = config.disabledEvents.split(",");

                    for(var j = 0; j < disabledEvents.length; j++)
                    {
                        if(j > 0)
                        {
                            disabledExpression +=" || ";
                        }

                        switch(disabledEvents[j].trim())
                        {
                            case "onFormValid" : disabledExpression += formName+".$valid";
                            break;
                            case "onFormInvalid" : disabledExpression += "!"+formName+".$valid";
                            break;
                            case "onModelChanged" : disabledExpression += "controller.modelChanged()";
                            break;
                            case "onModelUnchanged" : disabledExpression += "!controller.modelChanged()";
                            break;
                        }
                    }

                    console.log(disabledExpression);
                    button.attr("ng-disabled", disabledExpression);    
                }
                
                button.attr("ng-click", "mhFormButtons["+i+"].action(model, "+formName+")");
                button.addClass(config.cssClasses);
                button.find(".mh-title").html(config.title);
            }

            console.log("compiledTempalte:", templateElem.html())
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