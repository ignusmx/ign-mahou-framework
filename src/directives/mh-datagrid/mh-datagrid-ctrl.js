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
            //validate colTypes:
            for(var i = 0; i < scope.mhCols.length; i++)
            {
                var col = scope.mhCols[i];
                MHValidationHelper.validateType(col, col.name, MHDatagridCol);
            }

            var checkboxHeader = templateElem.find(".mh-datagrid-checkbox-header");
            checkboxHeader.attr("ng-if","mhEnableRowSelect !== false");

            var selectAllCheckbox = templateElem.find(".mh-input");
            selectAllCheckbox.attr("ng-change","controller.selectAll()");
            selectAllCheckbox.attr("ng-model","controller.allRowsSelected");

            var dataHeader = templateElem.find(".mh-datagrid-data-header");
            dataHeader.attr("ng-repeat", "col in mhCols");
            dataHeader.find(".mh-title").attr("mh-compile","col.title");

            var buttonsHeader = templateElem.find(".mh-datagrid-btns-header");
            buttonsHeader.attr("ng-if","mhEnableRowButtons !== false");

            var row = templateElem.find(".mh-datagrid-row");
            row.attr("ng-repeat", "row in controller.internalCollection");

            var dataCell = templateElem.find(".mh-datagrid-data-cell");
            dataCell.attr("ng-repeat", "col in mhCols");
            dataCell.find(".mh-datagrid-value").attr("mh-compile", "col.value");

            var checkboxCell = templateElem.find(".mh-datagrid-checkbox-cell");
            checkboxCell.attr("ng-if","mhEnableRowSelect !== false");

            var rowCheckbox = templateElem.find(".mh-datagrid-row-checkbox");
            rowCheckbox.attr("ng-change","controller.rowSelectChange(row)");
            rowCheckbox.attr("ng-model", "row.selected");

            var rowButtonsCell = templateElem.find(".mh-datagrid-row-btns-cell");
            rowButtonsCell.attr("ng-if","mhEnableRowButtons !== false");

            for(var i=0; i < scope.mhRowButtons.length; i++)
            {
                var button = scope.mhRowButtons[i];
                MHValidationHelper.validateType(button, button.name, MHButton);
                var rowButtonElement = templateElem.find(".mh-datagrid-row-btn[data-mh-name="+button.name+"]");
                rowButtonElement.attr("ng-click", "controller.executeStateOrAction(mhRowButtons["+i+"].action, row.model)");
                rowButtonElement.find(".mh-title").html("{{mhRowButtons["+i+"].title}}");
            }

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