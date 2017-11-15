angular
.module('mahou')
.controller('MHDatagridCtrl', 
    function MHDatagridCtrl($scope, $element, $attrs) 
    {
        var self = this;
        
        this.selectAll = function(){
        	console.log("select all rows!");
        }

        this.selectRow = function(model){
        	console.log("selected model is:", model);
        }
    }
);