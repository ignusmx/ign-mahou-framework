angular
.module('mahou')
.controller('MHDatagridCtrl', 
    function MHDatagridCtrl($scope, $element, $attrs, $compile, $state) 
    {
        var self = this;
        self.scope = $scope;
        self.allRowsSelected = false;
        self.collection = $scope.mhCollection;
        self.checkboxModels = [];
        self.selectedRows = [];
        self.internalCollection = [];

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

        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;

            //retrieve elements to be cloned
            var headersContainer = templateElem.find(".mh-datagrid-headers-container");
            var header = headersContainer.find(".mh-datagrid-header");
            header.remove();

            var row = templateElem.find(".mh-datagrid-row");
            var cell = row.find(".mh-datagrid-cell");
            cell.remove();

            var cellContent = cell.find(".mh-cell-content");
            cellContent.remove();

            var cellButtonsContainer = cell.find(".mh-cell-buttons-container")
            cellButtonsContainer.remove();

            var cellButton = cellButtonsContainer.find(".mh-button");
            cellButton.remove();


            //validate colTypes:
            for(var i = 0; i < scope.mhCols.length; i++)
            {
                var col = scope.mhCols[i];
                MHValidationHelper.validateType(col, col.name, MHDatagridCol);

                var colHeader = header.clone();
                colHeader.find(".mh-title").attr("mh-compile","mhCols["+i+"].title");
                colHeader.attr("ng-show","mhCols["+i+"].visible !== false");
                headersContainer.append(colHeader);

                var colCell = cell.clone();
                if(col.content instanceof Array)
                {
                    var colCellButtonsContainer = cellButtonsContainer.clone();

                    for(var j = 0; j < col.content.length; j++)
                    {
                        var button = col.content[j];
                        MHValidationHelper.validateType(button, button.name, MHButton);
                        var colCellButton = cellButton.clone();
                        colCellButton.addClass(button.cssClasses);
                        colCellButton.attr("data-mh-name", button.name);
                        colCellButton.attr("ng-click", "controller.executeStateOrAction(mhCols["+i+"].content["+j+"].action, row.model)");
                        colCellButton.find(".mh-title").html("{{mhCols["+i+"].content["+j+"].title}}");
                        colCellButtonsContainer.append(colCellButton);
                    }

                    colCell.append(colCellButtonsContainer);
                }
                else
                {
                    var colCellContent = cellContent.clone();
                    colCellContent.attr("mh-compile", "mhCols["+i+"].content");
                    colCell.append(colCellContent);
                }

                colCell.attr("ng-show","mhCols["+i+"].visible !== false");
                row.append(colCell);
            }

            var checkboxHeader = templateElem.find(".mh-datagrid-checkbox-header");
            checkboxHeader.attr("ng-if","mhEnableRowSelect !== false");

            var selectAllCheckbox = templateElem.find(".mh-input");
            selectAllCheckbox.attr("ng-change","controller.selectAll()");
            selectAllCheckbox.attr("ng-model","controller.allRowsSelected");

            var row = templateElem.find(".mh-datagrid-row");
            row.attr("ng-repeat", "row in controller.internalCollection");

            var checkboxCell = templateElem.find(".mh-datagrid-checkbox-cell");
            checkboxCell.attr("ng-if","mhEnableRowSelect !== false");

            var rowCheckbox = templateElem.find(".mh-datagrid-row-checkbox");
            rowCheckbox.attr("ng-change","controller.rowSelectChange(row)");
            rowCheckbox.attr("ng-model", "row.selected");            

            directiveElem.replaceWith($compile(templateElem)(scope));
        }

        this.executeStateOrAction = function(action, model)
        {
            if(typeof(action) == "string")
            {
                $state.go(action);
            }
            else if(typeof(action) == "function")
            {
                action(model);
            }
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