angular
.module('mahou')
.controller('MHDatagridCtrl', 
    function MHDatagridCtrl($scope, $element, $attrs, $compile) 
    {
        var self = this;

        this.allRowsSelected = false;
        this.collection = $scope.mhCollection;
        this.checkboxModels = [];
        this.selectedRows = [];
        this.internalCollection = [];

        for(var i = 0; i < this.collection.length; i++)
        {
            this.internalCollection.push({ selected : false, model : this.collection[i]});
        }

        $scope.$watchCollection("mhCollection", 
            function( newCollection, oldCollection ) 
            {
                var tempInternalCollection = [];
                for(var i = 0; i < newCollection.length; i++)
                {
                    var existingRow = null;
                    for(var j = 0; j < self.internalCollection.length; j++)
                    {
                        var internalRow = self.internalCollection[j];
                        var internalModel = internalRow.model;
                        if(internalModel === newCollection[i])
                        {
                            existingRow = internalRow;
                            break;
                        }
                    }

                    if(existingRow == null)
                    {
                        tempInternalCollection.push({ selected : false, model : newCollection[i]});
                    }
                    else
                    {
                        tempInternalCollection.push(existingRow);
                    }
                }

                self.internalCollection  = tempInternalCollection;
                updateAllRowsSelected();
            });
        
        this.selectAll = function()
        {
            if(self.allRowsSelected)
            {
                self.selectedRows = [];
                for(var i=0; i< self.internalCollection.length; i++)
                {
                    self.selectedRows.push(self.internalCollection[i]);
                }
            }
            else
            {
                self.selectedRows = [];
            }

            for(var i = 0; i < self.internalCollection.length; i++)
            {
                self.internalCollection[i].selected = self.allRowsSelected;
            }

            $scope.mhSelectAllChange({selectedRows : self.selectedRows});
        }

        this.rowSelectChange = function(row)
        {
            if(row.selected)
            {
                self.selectedRows.push(row);
            }
            else
            {
                var index = self.selectedRows.indexOf(row);
                self.selectedRows.splice(index,1);
            }

            updateAllRowsSelected();
            $scope.mhSelectRowChange({row:row});
        }

        this.evaluatePropertyExpression = function(model, expression)
        {
            return $scope.$eval(expression);
        }

        this.compileTemplate = function(scope, templateElem, directiveElem)
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

            directiveElem.replaceWith($compile(templateElem)(scope));
        }

        //private functions
        function updateAllRowsSelected()
        {
            if(self.selectedRows.length == self.internalCollection.length)
            {
                self.allRowsSelected = true;
            }
            else
            {
                self.allRowsSelected = false;
            }
        }
    }
);