angular.module('mahou').directive('mhDatagrid', function ( $compile, $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        { 
            mhEnableRowSelect : "=",
            mhEnableRowButtons : "=",
            mhTemplateUrl : "=",
            mhColumns : "=",
            mhRowButtons : "=",
            mhCollection : "=",
            mhSelectAllChange : "&",
            mhSelectRowChange : "&",
        },
        transclude : true,
        link : function(scope, el, attrs, ctrl, transclude)
        {
            function compileGridTemplate(elem)
            {
                var checkboxHeader = elem.find(".mh-datagrid-checkbox-header");
                checkboxHeader.attr("ng-if","mhEnableRowSelect !== false");

                var selectAllCheckbox = elem.find(".mh-datagrid-header-checkbox");
                selectAllCheckbox.attr("ng-change","controller.selectAll()");
                selectAllCheckbox.attr("ng-model","controller.allRowsSelected");

                var dataHeader = elem.find(".mh-datagrid-data-header");
                dataHeader.attr("ng-repeat", "column in mhColumns");

                var headerName = elem.find(".mh-datagrid-header-name");
                headerName.html("{{column.name}}");

                var buttonsHeader = elem.find(".mh-datagrid-btns-header");
                buttonsHeader.attr("ng-if","mhEnableRowButtons !== false");

                var row = elem.find(".mh-datagrid-row");
                row.attr("ng-repeat", "row in controller.internalCollection");

                var dataCell = elem.find(".mh-datagrid-data-cell");
                dataCell.attr("ng-repeat", "column in mhColumns");

                var rowData = elem.find(".mh-datagrid-row-text");
                rowData.attr("ng-if","column.type != 'image'")
                rowData.html("{{$eval(column.valueExpression)}}");

                var rowData = elem.find(".mh-datagrid-row-image");
                rowData.attr("ng-if","column.type == 'image'")
                rowData.attr("ng-src", "{{$eval(column.valueExpression)}}")

                var checkboxCell = elem.find(".mh-datagrid-checkbox-cell");
                checkboxCell.attr("ng-if","mhEnableRowSelect !== false");

                var rowCheckbox = elem.find(".mh-datagrid-row-checkbox");
                rowCheckbox.attr("ng-change","controller.rowSelectChange(row)");
                rowCheckbox.attr("ng-model", "row.selected");

                var rowButtonsCell = elem.find(".mh-datagrid-row-btns-cell");
                rowButtonsCell.attr("ng-if","mhEnableRowButtons !== false");

                for(var i=0; i < scope.mhRowButtons.length; i++)
                {
                    var rowButtonElement = elem.find(".mh-datagrid-row-btn[name="+scope.mhRowButtons[i].name+"]");
                    rowButtonElement.attr("ng-click", "mhRowButtons["+i+"].action(row.model)");
                }

                return elem;
            }

            if(attrs.mhTemplateUrl == null)
            {
                transclude(function(clone)
                {
                    var transcludeTemplateCopy = angular.copy(clone);
                    var compiledGridTempalte = compileGridTemplate(transcludeTemplateCopy);
                    var compiledElement = $compile(compiledGridTempalte)(scope);
                    el.append(compiledElement);
                });
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var template = response;
                    var compiledElement = compileGridTemplate($compile(template)(scope));
                    // compile the html, then link it to the scope
                    $elem = $compile(compiledElement)(scope);
                    // append the compiled template inside the element
                    el.append($elem);                    
                }); 
            }
        },
        controller: 'MHDatagridCtrl',
        controllerAs : 'controller'
    };
})