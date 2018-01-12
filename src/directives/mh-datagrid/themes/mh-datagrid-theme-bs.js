 /**
 * @class mhDatagridThemeBs
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhDatagrid mhDatagrid} directive. Used to define a bootstrap table theme.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhDatagrid mhDatagrid}
 * ### ** HTML declaration **
    <mh-datagrid mh-datagrid-theme-bs
        {datagrid-attributes}
        mh-responsive="{boolean}">
    </mh-datagrid>
 * @property {boolean}      mhResponsive     - if true, theme will add an extra div container with the bootstrap class "table-responsive"
 */
angular.module('ign.Mahou').directive('mhDatagridThemeBs', function ( $templateRequest, $parse ) {
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
                                                        <th class="mh-datagrid-header">\
                                                            <span class="mh-title"></span>\
                                                            <input type="checkbox" class="mh-input">\
                                                        </th>\
                                                    </tr>\
                                                </thead>\
                                                <tbody>\
                                                    <tr class="mh-datagrid-row">\
                                                        <td class="mh-datagrid-cell">\
                                                            <div class="mh-cell-checkbox-container">\
                                                                <input type="checkbox" class="mh-input">\
                                                            </div>\
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

                for(var i = 0; i < scope.mhCols.length; i++)
                {
                    var col = scope.mhCols[i];
                    MHValidationHelper.validateType(col, col.name, MHDatagridCol);

                    if(col.content instanceof Array)
                    {
                        for(var j = 0; j < col.content.length; j++)
                        {
                            col.content[j].styles = col.content[j].styles || {};
                            angular.extend(col.content[j].styles, { cursor : "pointer" });
                        }
                    }
                }

                return renderedTemplate.html();
            }
        }
    };
})