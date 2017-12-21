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
    function MHFormCtrl($scope, $element, $attrs, $compile, $state)
    {
        var self = this;
        self.scope = $scope;
        self.modelCopy = angular.copy(self.scope.model);

        function renderInputField(input, elementTemplate, formName, elementIndex)
        {
            var inputElem = elementTemplate.find(".mh-input");
            inputElem.addClass(input.cssClasses);

            MHValidationHelper.validateRequiredTags(input, inputElem);
            inputElem.attr("ng-model", "model"+getModelAsHash(input.model));

            var inputErrorMessage = elementTemplate.find(".mh-input-error-message");
            if(input.required)
            {
                inputErrorMessage.html("{{mhFormElements["+elementIndex+"].invalidMessage}}")
                inputErrorMessage.attr("ng-show", "controller.fieldIsValid("+formName+"."+input.name+", "+formName+")");
                inputElem.attr("ng-required", true);

                if(self.scope.mhClassInvalid != null)
                {
                    inputElem.attr("ng-class", 
                    "{'"+self.scope.mhClassInvalid+"' : controller.fieldIsValid("+formName+"."+input.name+", "+formName+")}");
                }
            }
            else
            {
                inputErrorMessage.remove();
            }
            
            inputElem.attr("name", input.name);

            if(input instanceof MHFormFieldInput
                && input.type != null && input.type.length > 0)
            {
                inputElem.attr("type", input.type);
                inputElem.attr("placeholder", input.placeholder);
            }
            else if(input instanceof MHFormFieldSelect)
            {
                if(input.defaultOption == null)
                {
                    inputElem.find(".mh-select-default-option").remove();
                }
                else
                {
                    inputElem.find(".mh-select-default-option").html("{{mhFormElements["+elementIndex+"].default}}");
                    inputElem.find(".mh-select-default-option").attr("ng-value", "{{null}}")
                }
                
                inputElem.find(".mh-select-option").attr("ng-repeat","option in mhFormElements["+elementIndex+"].options");
                inputElem.find(".mh-select-option").attr("value","{{option}}");
                inputElem.find(".mh-select-option").html("{{option}}");
            }
        }

        function renderFormButton(button, elementTemplate, formName, elementIndex)
        {
            var buttonElement = elementTemplate.find(".mh-form-button");
            buttonElement.addClass(button.cssClasses);

            if(button.disabledStatuses != null)
            {
                var disabledExpression = "";
                var disabledStatuses = button.disabledStatuses.split(",");

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
                
                buttonElement.attr("ng-disabled", disabledExpression);    
            }
            
            buttonElement.attr("ng-click", "controller.executeStateOrAction(mhFormElements["+elementIndex+"].action, model, "+formName+")");
        }

        this.executeStateOrAction = function(action, model, formName)
        {
            if(typeof(action) == "string")
            {
                $state.go(action);
            }
            else if(typeof(action) == "function")
            {
                action(model, formName);
            }
        }

        this.compileTemplate = function(templateElem, directiveElem, formElements)
        {
            var scope = self.scope;
            var formName = self.scope.mhFormName;
            scope.mhFormElements = formElements;

            templateElem.attr("name", self.scope.mhFormName);
            
        	for(var i = 0; i < scope.mhFormElements.length; i++)
        	{
        		var formElement = scope.mhFormElements[i];
                MHValidationHelper.validateType(formElement, formElement.name, [MHFormLabel, MHAbstractFormField, MHFormButton]);

                var elementTemplate = templateElem.find("[data-mh-name="+formElement.name+"]");
                elementTemplate.find(".mh-title").html(formElement.title);

                if(formElement instanceof MHAbstractFormField)
                {
                    renderInputField(formElement, elementTemplate, formName, i);
                }
                else if(formElement instanceof MHFormButton)
                {
                    renderFormButton(formElement, elementTemplate, formName, i);
                }
        	}

            directiveElem.replaceWith($compile(templateElem)(scope));
            if(scope.mhOnFormInit != null)
             {
                scope.mhOnFormInit({ disableForm: function(){
                    //console.log("disable form!", directiveElem);
                    //templateElem.remove("asd");
                }});
             }
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
            if(model == null)
            {
                return null;
            }

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