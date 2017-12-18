angular.module('mahou').directive('mhDatagridThemeBs', function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhDatagrid', 'mhDatagridThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<div class="container">\
                                            <table class="table">\
                                                <thead>\
                                                    <tr>\
                                                        <th class="mh-datagrid-checkbox-header">\
                                                            <input type="checkbox" class="mh-input">\
                                                        </th>\
                                                        <th class="mh-datagrid-data-header">\
                                                            <span class="mh-title"></span>\
                                                        </th>\
                                                        <th class="mh-datagrid-btns-header">acciones</th>\
                                                    </tr>\
                                                </thead>\
                                                <tbody>\
                                                    <tr class="mh-datagrid-row">\
                                                        <td class="mh-datagrid-checkbox-cell">\
                                                            <input type="checkbox" class="mh-datagrid-row-checkbox">\
                                                        </td>\
                                                        <td class="mh-datagrid-data-cell">\
                                                            <div class="mh-datagrid-value"></div>\
                                                        </td>\
                                                        <td class="mh-datagrid-row-btns-cell">\
                                                            <a class="mh-datagrid-row-btn">\
                                                                <span class="mh-title"></span>\
                                                            </a>\
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
            
            var templateElem = 
            $(themeCtrl.renderTheme(this.mhRawInnerTemplate, directiveCtrl.scope));
            directiveCtrl.compileTemplate(templateElem, el, themeCtrl.formElements);
        },
        controller : function($scope, $element, $attrs)
        {
            var self = this;
            self.formElements = [];

            this.renderTheme = function(template, scope)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);
                var btnsContainer = renderedTemplate.find(".mh-datagrid-row-btns-cell");
                var rowBtn = btnsContainer.find(".mh-datagrid-row-btn");
                rowBtn.remove();

                for(var i=0; i < scope.mhRowButtons.length; i++)
                {
                    var newRowBtn = rowBtn.clone();
                    newRowBtn.attr("data-mh-name", scope.mhRowButtons[i].name);
                    btnsContainer.append(newRowBtn);
                }

                return renderedTemplate.html();
            }
        }
    };
})