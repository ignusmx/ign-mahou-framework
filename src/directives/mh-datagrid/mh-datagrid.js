angular.module('mahou').directive('mhDatagrid', function ( $compile, $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope: 
        { 
            mhEnableRowSelect : "=",
            mhEnableRowButtons : "=",
            mhTemplateUrl : "=",
            mhCellsConfig : "=",
            mhRowButtons : "=",
            mhCollection : "=",
            mhSelectAllChange : "&",
            mhSelectRowChange : "&",
        },
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            return "";
        },
        link : function(scope, el, attrs, ctrl)
        {
            function compileTemplate(templateElem)
            {
                var checkboxHeader = templateElem.find(".mh-datagrid-checkbox-header");
                checkboxHeader.attr("ng-if","mhEnableRowSelect !== false");

                var selectAllCheckbox = templateElem.find(".mh-datagrid-header-checkbox");
                selectAllCheckbox.attr("ng-change","controller.selectAll()");
                selectAllCheckbox.attr("ng-model","controller.allRowsSelected");

                var dataHeader = templateElem.find(".mh-datagrid-data-header");
                dataHeader.attr("ng-repeat", "cellConfig in mhCellsConfig");
                var customHeaderContent = templateElem.find(".mh-datagrid-custom-content");

                for(var i=0; i < scope.mhCellsConfig.length; i++)
                {
                    var customContentElem = dataHeader.find("mh-datagrid-custom-content[name="+scope.mhCellsConfig[i].name+"]");
                    var label = customContentElem.find(".mh-datagrid-label");
                    label.html("{{ cellConfig.name }}");
                    scope.mhCellsConfig[i].customContent = customContentElem.html();
                }

                dataHeader.attr("mh-compile","cellConfig.customContent == null ? cellConfig.label : cellConfig.customContent");

                var buttonsHeader = templateElem.find(".mh-datagrid-btns-header");
                buttonsHeader.attr("ng-if","mhEnableRowButtons !== false");

                var row = templateElem.find(".mh-datagrid-row");
                row.attr("ng-repeat", "row in controller.internalCollection");

                var dataCell = templateElem.find(".mh-datagrid-data-cell");
                dataCell.attr("ng-repeat", "cellConfig in mhCellsConfig");

                for(var i=0; i < scope.mhCellsConfig.length; i++)
                {
                    var customContentElem = dataCell.find("mh-datagrid-custom-content[name="+scope.mhCellsConfig[i].name+"]");
                    
                    if(customContentElem.length > 0)
                    {
                        var expressionElem = customContentElem.find(".mh-datagrid-value-expression");
                        var expressionElemType = expressionElem.prop("tagName");

                        if(expressionElemType.toUpperCase() == "IMG")
                        {
                            expressionElem.attr("ng-src", "{{$eval(cellConfig.valueExpression)}}");
                        }
                        else
                        {
                            expressionElem.html("{{$eval(cellConfig.valueExpression)}}");
                        }

                        scope.mhCellsConfig[i].customCellContent = customContentElem.html();
                    }
                    
                }

                dataCell.attr("mh-compile","cellConfig.customCellContent == null ? '{{$eval(cellConfig.valueExpression)}}' : cellConfig.customCellContent");

                var checkboxCell = templateElem.find(".mh-datagrid-checkbox-cell");
                checkboxCell.attr("ng-if","mhEnableRowSelect !== false");

                var rowCheckbox = templateElem.find(".mh-datagrid-row-checkbox");
                rowCheckbox.attr("ng-change","controller.rowSelectChange(row)");
                rowCheckbox.attr("ng-model", "row.selected");

                var rowButtonsCell = templateElem.find(".mh-datagrid-row-btns-cell");
                rowButtonsCell.attr("ng-if","mhEnableRowButtons !== false");

                for(var i=0; i < scope.mhRowButtons.length; i++)
                {
                    var rowButtonElement = templateElem.find(".mh-datagrid-row-btn[name="+scope.mhRowButtons[i].name+"]");
                    rowButtonElement.attr("ng-click", "mhRowButtons["+i+"].action(row.model)");
                }

                return templateElem;
            }

            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                var compiledTemplateElem = compileTemplate(templateElem);
                el.replaceWith($compile(compiledTemplateElem)(scope));
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateRaw = response;
                    var templateElem = $(templateRaw);

                    var compiledTemplateElem = compileTemplate(templateElem);
                    el.replaceWith($compile(compiledTemplateElem)(scope));                   
                });
            }
        },
        controller: 'MHDatagridCtrl',
        controllerAs : 'controller'
    };
});