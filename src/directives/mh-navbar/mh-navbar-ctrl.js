/**
 * @class MHNavbarCtrl
 * @memberof Controllers
 * @description
 * controller used by mhNavbar directive to compile and bind events to create a fully functional angularJS navbar.
 *
 * 
 * @property {object}  scope                   - Isolated scope.
 * @property {array}  scope.mhNavbarButtons    - An array of mhNavbarButton
 */
angular
.module('mahou')
.controller('MHNavbarCtrl', 
    function MHNavbarCtrl($scope, $element, $attrs, $compile)
    {
        var self = this;
        self.scope = $scope;

        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;

            console.log(scope.mhNavbarButtons);
            for(var i = 0; i < scope.mhNavbarButtons.length; i++)
            {
                var config = scope.mhNavbarButtons[i];

                //render button
                var button = templateElem.find(".mh-navbar-button[data-mh-name="+config.name+"]");
                button.attr("ng-click", "mhNavbarButtons["+i+"].action()");
                button.find(".mh-title").html(config.title);
                
                //if button has dropdown_buttons, render dropdown_buttons as well
                if(config.dropdown_buttons != null && config.dropdown_buttons.length > 0)
                {
                    for(var j = 0; j < config.dropdown_buttons.length; j++)
                    {
                        var dropdownConfig = config.dropdown_buttons[j];
                        var button = templateElem.find(".mh-navbar-button[data-mh-name="+dropdownConfig.name+"]");
                        button.attr("ng-click", "mhNavbarButtons["+i+"].dropdown_buttons["+j+"].action()");
                        button.find(".mh-title").html(dropdownConfig.title);
                    }
                }
                
                
            }

            directiveElem.replaceWith($compile(templateElem)(scope));
        }
    }
);