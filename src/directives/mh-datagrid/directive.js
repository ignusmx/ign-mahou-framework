angular.module('mahou').directive('mhDatagrid', function ( $compile ) {
    return {
        restrict: 'E',
        scope: 
        { 
            config : '=',
            mhSelectAllChange : '&',
        },
        transclude : true,
        link: function(scope, el, attrs, ctrl, transclude)
        {
            transclude(function(elem)
            {
                var elem = angular.copy(elem);
                var row = elem.find(".mh-datagrid-row");
                row.attr("ng-repeat", "row in controller.internalCollection");

                var col = elem.find(".mh-datagrid-col");
                col.attr("ng-repeat", "column in config.columns");

                var columnName = elem.find(".mh-datagrid-col-name");
                columnName.html("{{column.name}}");

                var rowData = elem.find(".mh-datagrid-row-text");
                rowData.attr("ng-if","column.type != 'image'")
                rowData.html("{{$eval(column.valueExpression)}}");

                var rowData = elem.find(".mh-datagrid-row-image");
                rowData.attr("ng-if","column.type == 'image'")
                rowData.attr("ng-src", "{{$eval(column.valueExpression)}}")

                var selectAll = elem.find(".mh-datagrid-col-select-all");
                selectAll.attr("ng-if","config.enableRowSelect !== false");

                var selectRow = elem.find(".mh-datagrid-col-select");
                selectRow.attr("ng-if","config.enableRowSelect !== false");

                var selectAllCheckbox = elem.find(".mh-datagrid-select-all-checkbox");
                selectAllCheckbox.attr("ng-change","controller.selectAll()");
                selectAllCheckbox.attr("ng-model","controller.allRowsSelected");

                var selectCheckbox = elem.find(".mh-datagrid-select-checkbox");
                selectCheckbox.attr("ng-change","controller.selectRow(row)");
                selectCheckbox.attr("ng-model", "row.selected");

                for(var i=0; i < scope.config.rowButtons.length; i++)
                {
                    var rowButtonElement = elem.find(".mh-datagrid-row-btn[name="+scope.config.rowButtons[i].name+"]");
                    rowButtonElement.attr("ng-click", "config.rowButtons["+i+"].action(row.model)");
                }
                

                $compile(elem)(scope);
                el.html(elem);
            }); 
        },
        controller: 'MHDatagridCtrl',
        controllerAs : 'controller'
    };
});