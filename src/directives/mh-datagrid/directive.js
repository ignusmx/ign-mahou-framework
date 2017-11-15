angular.module('mahou').directive('mhDatagrid', function ( $compile ) {
  return {
    restrict: 'E',
    scope: { config: '=' },
    templateUrl: function(elem,attrs)
    {
        if(attrs.templateUrl == null)
        {
            throw "mhDatagrid template not defined"; 
        }
        return attrs.templateUrl;
    },
    compile : function(elem, attrs)
    {
        var row = elem.find(".mh-datagrid-row");
        row.attr("ng-repeat", "row in config.collection");

        var col = elem.find(".mh-datagrid-col");
        col.attr("ng-repeat", "column in config.columns");

        var columnName = elem.find(".mh-datagrid-col-name");
        columnName.html("{{column.name}}");

        var rowData = elem.find(".mh-datagrid-row-text");
        rowData.attr("ng-if","column.type != 'image'")
        rowData.html("{{ row[column.modelKey] }}");

        var rowData = elem.find(".mh-datagrid-row-image");
        rowData.attr("ng-if","column.type == 'image'")
        rowData.attr("ng-src", "{{ row[column.modelKey] }}")

        var selectAll = elem.find(".mh-datagrid-col-select-all");
        selectAll.attr("ng-if","config.enableRowSelect !== false");

        var selectRow = elem.find(".mh-datagrid-col-select");
        selectRow.attr("ng-if","config.enableRowSelect !== false");

        var selectAllCheckbox = elem.find(".mh-datagrid-select-all-checkbox");
        selectAllCheckbox.attr("ng-click","controller.selectAll()");

        var selectCheckbox = elem.find(".mh-datagrid-select-checkbox");
        selectCheckbox.attr("ng-click","controller.selectRow(row)");
    },
    controller: 'MHDatagridCtrl as controller'
  };
});