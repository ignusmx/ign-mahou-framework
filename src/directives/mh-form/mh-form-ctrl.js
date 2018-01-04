/**
 * @class MHFormCtrl
 * @memberof Controllers
 * @classdesc
 * controller used by mhForm directive to compile and bind events to create a fully functional angularJS form.
 * @description
 * #### ** Directive: ** {@link Directives.mhForm mhForm}
 *
 * @property {object}                   scope                       - Isolated scope.
 * @property {object}                   scope.ngModel               - The ngModel to be used with the form.
 * @property {string}                   scope.mhFormName            - The name (HTML 'name' attribute) of the form.
 * @property {MHAbstractUIElement[]}    scope.mhFormLayout          - An array of {@link UIElements.MHAbstractUIElement MHAbstractUIElement} objects used to display, edit and update the ngModel.
 * @property {string}                   scope.mhClassInvalid        - A string of classes to be added to fields when form is invalid.
 * @property {Function}                 scope.mhOnFormInit          - A function to be executed when form is initialized. Used to expose the form API as parameter.
 * @property {object}                   modelCopy                   - A copy of the model to detect if model has changed or not.
 * @property {MHAbstractUIElement[]}    formElements                - List of all rendereable form elements.
 */
angular
.module('ign.Mahou')
.controller('MHFormCtrl', 
    function MHFormCtrl($scope, $element, $attrs, $compile, $state)
    {
        var self = this;
        self.scope = $scope;
        self.modelCopy = angular.copy(self.scope.model);
        self.formElements = null;

        /** @function executeStateOrAction
         * @memberof Controllers.MHFormCtrl
         * @instance
         * @param action {function | string} the action to execute or state to transition
         * @param model {Object} the form ng-model to be passed as parameter to the action function
         * @param formName {string} the name of the form to be passed as parameter to the action function
         * @returns {void} Nothing
         * @description executes a function or transitions to an ui-router state
         */
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

        /** @function compileTemplate
         * @memberof Controllers.MHFormCtrl
         * @instance
         * @param templateElem {Object} jQuery element with the template provided by the theme directive.
         * @param directiveElem {Object} default jQuery element created for this directive which will be replaced with theme template.
         * @param formElements {MHAbstractUIElement[]} array with all the elements in the form.
         * @returns {void} Nothing
         * @description compiles the directive theme and setups all elements (this method should be called from the theme directive itself).
         */
        this.compileTemplate = function(templateElem, directiveElem, formElements)
        {
            var scope = self.scope;
            var formName = self.scope.mhFormName;
            self.formElements = formElements;

            templateElem.attr("name", self.scope.mhFormName);
            
        	for(var i = 0; i < self.formElements.length; i++)
        	{
        		var formElement = self.formElements[i];
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

        /** @function fieldIsInvalid
         * @memberof Controllers.MHFormCtrl
         * @instance
         * @param field {Object} the field passed from the angular directive view
         * @param form {Object} the form passed from the angular directive view
         * @return {boolean} returns if field is invalid
         * @description validates field
         */
        this.fieldIsInvalid = function(field, form)
		{
            if(field == null)
            {
                return false;
            }

			return field.$invalid && (field.$dirty || field.$touched || form.$submitted);
		}

        /** @function modelChanged
         * @memberof Controllers.MHFormCtrl
         * @instance
         * @return {boolean} returns if model has changed
         * @description checks if form model has changed
         */
        this.modelChanged = function()
        {
            return !angular.equals(self.scope.model, self.modelCopy);
        }

        //private functions

        /** 
         * @memberof Controllers.MHFormCtrl
         * @param model {string} the model propoerty as string to be converted to array style
         * @description converts a dot notation access to array style
         * @access private
         */
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

        /** 
         * @memberof Controllers.MHFormCtrl
         * @param input {MHAbstractFormField} the input to be rendered
         * @param elementTemplate {Object} a jQuery html element to be used as template for rendering the input
         * @param formName {string} the name of the form, used for adding field validations
         * @param elementIndex {number} the input position inside the elements array
         * @description renders an {@link UIElements.MHAbstractFormField MHAbstractFormField}
         * @access private
         */
        function renderInputField(input, elementTemplate, formName, elementIndex)
        {
            var inputElem = elementTemplate.find(".mh-input");
            MHDecorator.decorateEltCSS(inputElem, input.cssClasses, input.styles);

            MHValidationHelper.validateRequiredTags(input, inputElem);

            if(!(input instanceof MHFormFieldMDAutocomplete))
            {            
                inputElem.attr("ng-model", "model"+getModelAsHash(input.model));
            }

            var inputErrorMessage = elementTemplate.find(".mh-input-error-message");
            if(input.required)
            {
                inputErrorMessage.html("{{controller.formElements["+elementIndex+"].invalidMessage}}")
                inputErrorMessage.attr("ng-show", "controller.fieldIsInvalid("+formName+"."+input.name+", "+formName+") && controller.formElements["+elementIndex+"].invalidMessage != null");
                inputElem.attr("required", true);

                if(self.scope.mhClassInvalid != null)
                {
                    elementTemplate.attr("ng-class", 
                    "{'"+self.scope.mhClassInvalid+"' : controller.fieldIsInvalid("+formName+"."+input.name+", "+formName+")}");
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
            else if(input instanceof MHFormFieldMDAutocomplete)
            {
                inputElem.attr("md-selected-item", "model"+getModelAsHash(input.model));
                inputElem.attr("md-search-text", input.name+"SearchText");
                inputElem.attr("md-items", "item in controller.formElements["+elementIndex+"].querySearch("+input.name+"SearchText)");
                inputElem.attr("md-item-text", input.itemText);
                inputElem.attr("md-min-length", input.minLength);
                inputElem.attr("placeholder", input.placeholder);
                inputElem.attr("md-require-match", input.required);
                inputElem.attr("md-input-name", input.name);
                inputElem.find("md-item-template > span").html("{{"+input.itemText+"}}");
            }
            else if(input instanceof MHFormFieldSelect)
            {
                if(input.defaultOption == null)
                {
                    inputElem.find(".mh-select-default-option").remove();
                }
                else
                {
                    inputElem.find(".mh-select-default-option").html("{{controller.formElements["+elementIndex+"].default}}");
                    inputElem.find(".mh-select-default-option").attr("ng-value", "{{null}}")
                }
                
                inputElem.find(".mh-select-option").attr("ng-repeat","option in controller.formElements["+elementIndex+"].options");
                inputElem.find(".mh-select-option").attr("value","{{option}}");
                inputElem.find(".mh-select-option").html("{{option}}");
            }
        }

        /** 
         * @memberof Controllers.MHFormCtrl
         * @param button {MHFormButton} the button to be rendered
         * @param elementTemplate {Object} a jQuery html element to be used as template for rendering the button
         * @param formName {string} the name of the form, used for adding button validations
         * @param elementIndex {number} the button position inside the elements array
         * @description renders an {@link UIElements.MHFormButton MHFormButton}
         * @access private
         */
        function renderFormButton(button, elementTemplate, formName, elementIndex)
        {
            var buttonElement = elementTemplate.find(".mh-form-button");
            MHDecorator.decorateEltCSS(buttonElement, button.cssClasses, button.styles);

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
            
            buttonElement.attr("ng-click", "controller.executeStateOrAction(controller.formElements["+elementIndex+"].action, model, "+formName+")");
        }
    }
);