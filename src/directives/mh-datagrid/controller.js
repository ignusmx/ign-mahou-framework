angular
.module('mahou')
.controller('MHDatagridCtrl', 
    function MHDatagridCtrl($scope, $element, $attrs) 
    {
        var self = this;

        this.allRowsSelected = false;
        this.collection = $scope.config.collection;
        this.checkboxModels = [];
        this.selectedRows = [];
        this.internalCollection = [];

        for(var i = 0; i < this.collection.length; i++)
        {
            this.internalCollection.push({ selected : false, model : this.collection[i]});
        }

        this.testModel = false;

        $scope.$watchCollection("config.collection", 
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
            console.log("select all!");
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

        this.getSetRowCheckboxModel = function()
        {
            return self.testModel;
        }

        this.evaluatePropertyExpression = function(model, expression)
        {
            console.log(expression, $scope.$eval(expression));
            return $scope.$eval(expression);
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