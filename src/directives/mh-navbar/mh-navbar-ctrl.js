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
            
            var brandTitle = templateElem.find(".mh-brand > .mh-title");
            brandTitle.attr("mh-compile","mhNavbarTitle");
            for(var i = 0; i < scope.mhNavbarButtons.length; i++)
            {
                var config = scope.mhNavbarButtons[i];

                //render button
                var button = templateElem.find(".mh-navbar-button[data-mh-name="+config.name+"]");
                button.addClass(config.cssClasses);

                button.attr("ng-click", "mhNavbarButtons["+i+"].action()");
                button.find(".mh-title").attr("mh-compile", "mhNavbarButtons["+i+"].title");
                
                //if button has dropdownButtons, render dropdownButtons as well
                if(config.dropdownButtons != null && config.dropdownButtons.length > 0)
                {
                    for(var j = 0; j < config.dropdownButtons.length; j++)
                    {
                        var dropdownConfig = config.dropdownButtons[j];
                        var button = templateElem.find(".mh-navbar-button[data-mh-name="+dropdownConfig.name+"]");
                        button.addClass(dropdownConfig.cssClasses);
                        button.attr("ng-click", "mhNavbarButtons["+i+"].dropdownButtons["+j+"].action()");
                        button.find(".mh-title").attr("mh-compile","mhNavbarButtons["+i+"].dropdownButtons["+j+"].title");
                    }
                }                
            }

            directiveElem.replaceWith($compile(templateElem)(scope));
        }
    }
);