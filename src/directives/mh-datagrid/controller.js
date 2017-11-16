angular
.module('mahou')
.controller('MHDatagridCtrl', 
    function MHDatagridCtrl($scope, $element, $attrs) 
    {
        var self = this;

        this.selectAllModel = false;
        
        this.selectAll = function(){
            self.selectAllModel = true;
        	console.log("select all rows!");
        }

        this.selectRow = function(model){
        	console.log("selected model is:", model);
        }
    }
);