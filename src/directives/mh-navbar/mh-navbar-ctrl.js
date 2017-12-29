/**
 * @class MHNavbarCtrl
 * @memberof Controllers
 * @classdesc
 * controller used by {@link Directives.mhNavbar mhNavbar} directive to compile and bind events to create a fully functional navbar.
 * @description
 * #### ** Directive: ** {@link Directives.mhNavbar mhNavbar}
 *
 * @property {object}                           scope                       - Isolated scope.
 * @property {MHButton[] | MHDropDownButton[]}  scope.mhNavbarElements      - An array of {@link UIElements.MHButton MHButton} or {@link UIElements.MHDropDownButton MHDropDownButton}
 * @property {string}                           scope.mhNavbarTitle         - Title to be displayed on the navbar (can be decorated to show an image using {@link Decorators.MHBsDecorator MHBsDecorator})
 * @property {function|string}                  scope.mhNavbarTitleAction   - a function to be called or a ui-router state to transition when user clicks on the title.
 */
angular
.module('mahou')
.controller('MHNavbarCtrl', 
    function MHNavbarCtrl($scope, $element, $attrs, $compile, $state)
    {
        var self = this;
        self.scope = $scope;
        self.allNavbarElements = self.scope.mhNavbarElements;
        if(self.scope.mhNavbarElements == null)
        {
            self.scope.mhNavbarElements = [];
        }

        MHValidationHelper.validateType(self.scope.mhNavbarElements, "mhNavbarElements", Array);

        if(self.scope.mhNavbarTitleAction != null)
        {
            MHValidationHelper.validateType(self.scope.mhNavbarTitleAction, "mhNavbarTitleAction", [Function, String]);
        }

        /** @function compileTemplate
         * @memberof Controllers.MHNavbarCtrl
         * @instance
         * @param templateElem {Object} jQuery element with the template provided by the theme directive.
         * @param directiveElem {Object} default jQuery element created for this directive which will be replaced with theme template.
         * @returns {void} Nothing
         * @description compiles the directive theme and setups all elements (this method should be called from the theme directive itself).
         */
        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;
            var brand = templateElem.find(".mh-brand");
            brand.attr("ng-click", "controller.executeStateOrAction(mhNavbarTitleAction)");
            var brandTitle = brand.find(".mh-title");
            brandTitle.attr("mh-compile","mhNavbarTitle");

            for(var i = 0; i < self.allNavbarElements.length; i++)
            {
                var config = self.allNavbarElements[i];
                //render button
                MHValidationHelper.validateType(config, "controller.allNavbarElements["+i+"]", MHButton);
                var button = templateElem.find(".mh-navbar-button[data-mh-name="+config.name+"]");

                //render only if button has been found
                if(button.length > 0)
                {
                    button.addClass(config.cssClasses);
                    MHValidationHelper.validateRequiredTags(config, button);

                    button.attr("ng-click", "controller.allNavbarElements["+i+"].action()");
                    button.find(".mh-title").attr("mh-compile", "controller.allNavbarElements["+i+"].title");
                    
                    //if button has dropdownButtons, render dropdownButtons as well
                    if(config.dropdownButtons != null && config.dropdownButtons.length > 0)
                    {
                        for(var j = 0; j < config.dropdownButtons.length; j++)
                        {
                            var dropdownConfig = config.dropdownButtons[j];
                            var button = templateElem.find(".mh-navbar-button[data-mh-name="+dropdownConfig.name+"]");
                            //render only if button has been found
                            if(button.length > 0)
                            {
                                button.addClass(dropdownConfig.cssClasses);
                                MHValidationHelper.validateRequiredTags(dropdownConfig, button);
                                button.attr("ng-click", "controller.executeStateOrAction(controller.allNavbarElements["+i+"].dropdownButtons["+j+"].action)");
                                button.find(".mh-title").attr("mh-compile","controller.allNavbarElements["+i+"].dropdownButtons["+j+"].title");
                            }
                        }
                    } 
                }               
            }

            directiveElem.replaceWith($compile(templateElem)(scope));
        }

        /** @function executeStateOrAction
         * @memberof Controllers.MHNavbarCtrl
         * @instance
         * @param action {function | string} the action to execute or state to transition
         * @returns {void} Nothing
         * @description executes a function or transitions to an ui-router state
         */
        this.executeStateOrAction = function(action)
        {
            if(typeof(action) == "string")
            {
                $state.go(action);
            }
            else if(typeof(action) == "function")
            {
                action();
            }
        }
    }
);