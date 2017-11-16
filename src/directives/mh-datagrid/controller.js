angular
.module('mahou')
.controller('MHDatagridCtrl', 
    function MHDatagridCtrl($scope, $element, $attrs) 
    {
        var self = this;

        this.selectAllModel = false;
        
        this.selectAll = function()
        {
            self.selectAllModel = true;

            if($scope.mhSelectAllChange != null)
            {
                $scope.mhSelectAllChange();
            }
        }

        this.selectRow = function(model)
        {
        	console.log("selected model is:", model);
        }

        this.evaluatePropertyExpression = function(model, expression)
        {
            console.log(expression, $scope.$eval(expression));
            return $scope.$eval(expression);
        }
    }
);