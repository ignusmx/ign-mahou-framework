angular.module('mahou').directive('mhDatagrid', function ( $compile, $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        { 
            mhEnableRowSelect : "=",
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
            console.log(scope.mhCollection);
            function compileGridTemplate(elem)
            {
                var row = elem.find(".mh-datagrid-row");
                console.log(row);
                row.attr("ng-repeat", "row in controller.internalCollection");

                var col = elem.find(".mh-datagrid-col");
                col.attr("ng-repeat", "column in mhColumns");

                var columnName = elem.find(".mh-datagrid-col-name");
                columnName.html("{{column.name}}");

                var rowData = elem.find(".mh-datagrid-row-text");
                rowData.attr("ng-if","column.type != 'image'")
                rowData.html("{{$eval(column.valueExpression)}}");

                var rowData = elem.find(".mh-datagrid-row-image");
                rowData.attr("ng-if","column.type == 'image'")
                rowData.attr("ng-src", "{{$eval(column.valueExpression)}}")

                var selectAll = elem.find(".mh-datagrid-col-select-all");
                selectAll.attr("ng-if","mhEnableRowSelect !== false");

                var selectRow = elem.find(".mh-datagrid-col-select");
                selectRow.attr("ng-if","mhEnableRowSelect !== false");

                var selectAllCheckbox = elem.find(".mh-datagrid-select-all-checkbox");
                selectAllCheckbox.attr("ng-change","controller.selectAll()");
                selectAllCheckbox.attr("ng-model","controller.allRowsSelected");

                var selectCheckbox = elem.find(".mh-datagrid-select-checkbox");
                selectCheckbox.attr("ng-change","controller.rowSelectChange(row)");
                selectCheckbox.attr("ng-model", "row.selected");

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