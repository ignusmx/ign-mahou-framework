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
                    renderField(formElement, elementTemplate, formName, i);
                }
                else if(formElement instanceof MHFormButton)
                {
                    renderFormButton(formElement, elementTemplate, formName, i);
                }
        	}

            directiveElem.append(templateElem);
            $compile(directiveElem.contents())(scope);
            
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

			return field.$invalid && (field.$dirty || field.$touched || form.$submitted ||  (self.scope.parentForm != null && self.scope.parentForm.$submitted));
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
         * @param model {string} the model property as string to be converted to array style
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
         * @param field {MHAbstractFormField} the field to be rendered
         * @param elementTemplate {Object} a jQuery html element to be used as template for rendering the field
         * @param formName {string} the name of the form, used for adding field validations
         * @param elementIndex {number} the field position inside the elements array
         * @description renders an {@link UIElements.MHAbstractFormField MHAbstractFormField}
         * @access private
         */
        function renderField(field, elementTemplate, formName, elementIndex)
        {
            var inputElem = elementTemplate.find(".mh-input");
            MHDecorator.decorateEltCSS(inputElem, field.cssClasses, field.styles);
            MHDecorator.decorateEltAttributes(inputElem, field.attributes);

            MHValidationHelper.validateRequiredTags(field, inputElem);

            if(!(field instanceof MHFormFieldMDAutocomplete))
            {            
                inputElem.attr("ng-model", "model"+getModelAsHash(field.model));
            }

            var inputErrorMessage = elementTemplate.find(".mh-input-error-message");
            if(field.required || field.customValidation)
            {
                inputErrorMessage.html("{{controller.formElements["+elementIndex+"].invalidMessage}}")
                inputErrorMessage.attr("ng-show", "controller.fieldIsInvalid("+formName+"."+field.name+", "+formName+") && controller.formElements["+elementIndex+"].invalidMessage != null");
                inputElem.attr("ng-required", field.required);
                inputElem.attr("mh-custom-field-validation", "controller.formElements["+elementIndex+"].customValidation(modelValue)");

                if(self.scope.mhClassInvalid != null)
                {
                    elementTemplate.attr("ng-class", 
                    "{'"+self.scope.mhClassInvalid+"' : controller.fieldIsInvalid("+formName+"."+field.name+", "+formName+")}");
                }
            }
            else
            {
                inputErrorMessage.remove();
            }
            
            inputElem.attr("name", field.name);

            if(field instanceof MHFormFieldInput
                && field.type != null && field.type.length > 0)
            {
                inputElem.attr("type", field.type);
                inputElem.attr("placeholder", field.placeholder);
            }
            else if(field instanceof MHFormFieldMDAutocomplete)
            {
                inputElem.attr("md-selected-item", "model"+getModelAsHash(field.model));
                inputElem.attr("md-search-text", field.name+"SearchText");
                inputElem.attr("md-items", "item in controller.formElements["+elementIndex+"].searchQuery("+field.name+"SearchText)");
                inputElem.attr("md-item-text", field.itemText);
                inputElem.attr("md-min-length", field.minLength);
                inputElem.attr("placeholder", field.placeholder);
                inputElem.attr("md-require-match", field.required);
                inputElem.attr("md-input-name", field.name);
                inputElem.attr("md-no-cache", !field.cache);
                inputElem.attr("md-delay", field.delay);
                inputElem.find("md-item-template > span").html("{{"+field.itemText+"}}");
            }
            else if(field instanceof MHFormFieldSelect)
            {
                inputElem.attr("ng-change", "controller.formElements["+elementIndex+"].onChange(model"+getModelAsHash(field.model)+")");
                if(field.emptyOption == null || field instanceof MHFormFieldMDSelect)
                {
                    inputElem.find(".mh-select-empty-option").remove();
                }
                else
                {
                    inputElem.find(".mh-select-empty-option").attr("value", "");
                    inputElem.find(".mh-select-empty-option").html("{{controller.formElements["+elementIndex+"].emptyOption}}");
                }
                
                if(field instanceof MHFormFieldMDSelect)
                {
                    inputElem.attr("ng-model-options", "{trackBy: '$value."+field.trackBy+"'}");
                    inputElem.find(".mh-select-option").attr("ng-repeat","option in controller.formElements["+elementIndex+"].options");
                    inputElem.find(".mh-select-option").attr("ng-value","$eval(controller.formElements["+elementIndex+"].value)");
                    inputElem.find(".mh-select-option").html("{{$eval(controller.formElements["+elementIndex+"].text)}}");
                }
                else
                {
                    inputElem.attr("ng-options", field.value+" as "+field.text+" for option in controller.formElements["+elementIndex+"].options track by option."+field.trackBy); 
                }
            }
            else if(field instanceof MHFormFieldTextArea)
            {
                inputElem.attr("placeholder", field.placeholder);
                MHDecorator.decorateEltCSS(inputElem, null, { resize: field.resize });
            }
            else if(field instanceof MHFormFieldDropfile)
            {
                inputElem.attr("ngf-drag-over-class", field.dragOverClass);
                inputElem.attr("ngf-multiple", field.multiple);
                inputElem.attr("ngf-allow-dir", field.allowDir);
                inputElem.attr("accept", field.accept);
                inputElem.find(".mh-placeholder").html(field.placeholder);
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
            MHDecorator.decorateEltAttributes(buttonElement, button.attributes);

            if(button.disabledStatuses != null)
            {
                var disabledExpression = "";

                for(var j = 0; j < button.disabledStatuses.length; j++)
                {
                    if(j > 0)
                    {
                        disabledExpression +=" || ";
                    }

                    switch(button.disabledStatuses[j].trim())
                    {
                        case MHFormStatus.FORM_VALID : disabledExpression += formName+".$valid";
                        break;
                        case MHFormStatus.FORM_INVALID : disabledExpression += formName+".$invalid";
                        break;
                        case MHFormStatus.PARENT_FORM_VALID : disabledExpression += "(parentForm == null || parentForm.$valid)";
                        break;
                        case MHFormStatus.PARENT_FORM_INVALID : disabledExpression += "(parentForm != null && parentForm.$invalid)";
                        break;
                        case MHFormStatus.MODEL_CHANGED : disabledExpression += "controller.modelChanged()";
                        break;
                        case MHFormStatus.MODEL_UNCHANGED : disabledExpression += "!controller.modelChanged()";
                        break;
                    }
                }
                
                var ngDisabledAttrVal = buttonElement.attr("ng-disabled");

                if(ngDisabledAttrVal)
                {
                    buttonElement.attr("ng-disabled", ngDisabledAttrVal + " || " + disabledExpression); 
                }
                else
                {
                    buttonElement.attr("ng-disabled", disabledExpression); 
                }   
            }
            
            buttonElement.attr("ng-click", "controller.executeStateOrAction(controller.formElements["+elementIndex+"].action, model, "+formName+")");
        }
    }
);