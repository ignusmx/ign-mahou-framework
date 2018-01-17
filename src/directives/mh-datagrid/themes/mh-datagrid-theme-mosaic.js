 /**
 * @class mhDatagridThemeMosaic
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhDatagrid mhDatagrid} directive. Used to define a mosaic grid theme.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhDatagrid mhDatagrid}
 * ### ** HTML declaration **
    <mh-datagrid mh-datagrid-theme-mosaic
        {datagrid-attributes}
        mh-responsive="{boolean}">
    </mh-datagrid>
 */
angular.module('ign.Mahou').directive('mhDatagridThemeMosaic', function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhDatagrid', 'mhDatagridThemeMosaic'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<div class="mh-responsive-table-container">\
                                            <div class="row">\
                                                <div class="col-md-12">\
                                                    <div class="mh-datagrid-headers-container">\
                                                        <div class="mh-datagrid-header">\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                            <div class="mh-rows-container">\
                                                <div class="mh-datagrid-row">\
                                                    <div style="padding:10px">\
                                                        <div class="mh-datagrid-cell">\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                            <div class="mh-header-content-templates">\
                                                <div class="mh-title-header-container">\
                                                    <span class="mh-title"></span>\
                                                </div>\
                                                <div class="mh-checkbox-header-container">\
                                                    <span class="mh-title"></span> <input type="checkbox" class="mh-input">\
                                                </div>\
                                            </div>\
                                            <div class="mh-cell-content-templates">\
                                                <div class="mh-cell-checkbox-container">\
                                                    <input type="checkbox" class="mh-input">\
                                                </div>\
                                                <div class="mh-cell-content"></div>\
                                                <div class="mh-cell-elements-container">\
                                                    <a class="mh-button">\
                                                        <span class="mh-title"></span>\
                                                    </a>\
                                                    <img class="mh-image-file-preview">\
                                                </div>\
                                            </div>\
                                        </div>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var directiveCtrl = ctrls[0];
            var themeCtrl = ctrls[1];

            var direction = attrs.mhDirection;
            
            var templateElem = 
            $(themeCtrl.renderTheme(this.mhRawInnerTemplate, directiveCtrl.scope, direction));
            directiveCtrl.compileTemplate(templateElem, el, themeCtrl.formElements);
        },
        controller : function($scope, $element, $attrs)
        {
            var self = this;
            self.formElements = [];

            this.renderTheme = function(template, scope, direction)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);

                var headersContainer = renderedTemplate.find(".mh-datagrid-headers-container");
                var headerTemplate = headersContainer.find(".mh-datagrid-header");
                headerTemplate.remove();

                var rowsContainer = renderedTemplate.find(".mh-rows-container");
                var row = rowsContainer.find(".mh-datagrid-row");
                var cellTemplate = row.find(".mh-datagrid-cell");
                var cellTemplateParent = cellTemplate.parent();

                cellTemplate.remove();

                if(direction == MHDatagridMosaicDirection.VERTICAL)
                {
                    rowsContainer.css("flex-direction", "column");
                }
                else
                {
                    rowsContainer.css("flex-direction", "row");
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

                    if(col instanceof MHDatagridCheckboxCol)
                    {
                        var colHeaderTemplate = headerTemplate.clone();
                        colHeaderTemplate.attr("data-mh-name", col.name);
                        headersContainer.append(colHeaderTemplate);
                    }

                    var colCellTemplate = cellTemplate.clone();
                    colCellTemplate.attr("data-mh-name", col.name);
                    cellTemplateParent.append(colCellTemplate);
                }

                return renderedTemplate.html();
            }
        }
    };
});

 /** 
* Defines the type of preview of {@link Themes.mhDatagridThemeBs mhDatagridThemeBs}
* @enum {string}
* @memberof Enumerators
*/
var MHDatagridMosaicDirection = 
{
    /** value: "horizontal" (align items horizontally) */
    HORIZONTAL : "horizontal",
    /** value: "vertical" (align items vertically)  */
    VERTICAL : "vertical", 
}