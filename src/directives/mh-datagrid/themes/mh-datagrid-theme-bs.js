angular.module('mahou').directive('mhDatagridThemeBs', function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhDatagrid', 'mhDatagridThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<div class="mh-responsive-table-container">\
                                            <table class="table">\
                                                <thead>\
                                                    <tr class="mh-datagrid-headers-container">\
                                                        <th class="mh-datagrid-checkbox-header">\
                                                            <input type="checkbox" class="mh-input">\
                                                        </th>\
                                                        <th class="mh-datagrid-header">\
                                                            <span class="mh-title"></span>\
                                                        </th>\
                                                    </tr>\
                                                </thead>\
                                                <tbody>\
                                                    <tr class="mh-datagrid-row">\
                                                        <td class="mh-datagrid-checkbox-cell">\
                                                            <input type="checkbox" class="mh-datagrid-row-checkbox">\
                                                        </td>\
                                                        <td class="mh-datagrid-cell">\
                                                            <div class="mh-cell-content"></div>\
                                                            <div class="mh-cell-buttons-container">\
                                                                <a class="mh-button">\
                                                                    <span class="mh-title"></span>\
                                                                </a>\
                                                            </div>\
                                                        </td>\
                                                    </tr>\
                                                </tbody>\
                                            </table>\
                                        </div>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var directiveCtrl = ctrls[0];
            var themeCtrl = ctrls[1];

            var isResponsiveTable = attrs.mhResponsive;
            
            var templateElem = 
            $(themeCtrl.renderTheme(this.mhRawInnerTemplate, directiveCtrl.scope, isResponsiveTable));
            directiveCtrl.compileTemplate(templateElem, el, themeCtrl.formElements);
        },
        controller : function($scope, $element, $attrs)
        {
            var self = this;
            self.formElements = [];

            this.renderTheme = function(template, scope, isResponsiveTable)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);

                var responsiveTableContainer = renderedTemplate.find(".mh-responsive-table-container");
                if(isResponsiveTable != "false")
                {
                    responsiveTableContainer.addClass("table-responsive");
                }

                return renderedTemplate.html();
            }
        }
    };
})