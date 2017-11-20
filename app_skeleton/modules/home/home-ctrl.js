(function () {
	'use strict';

	angular
	.module('app')
	.controller('HomeCtrl', 
		function LoginController($scope) 
		{
			var self = this;
			
			$scope.editClick = function(model)
			{
				alert("edit clicke!");
				console.log("model to edit is:", model);
			}

			$scope.deleteClick = function(model)
			{
				alert("delete clicke!");
				console.log("model to delete is:", model);
			}

			var collection = [
								{id:"33", name : "Juan perez", image: "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "juanperez@mail.com", address:{city:"Guanajuato", ctry:"pais"}},
								{id:"12", name : "topollilo", image: "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "topollilo@mail.com", address:{city:"Guadalajara", ctry:"mx"}}
							];
			$scope.status = "no se pudo";
			$scope.cellsConfig = 
				[
					{ name:"id", label : "id", valueExpression : "row.model.id", type: "text"},
					{ name:"name", label : "nombre", valueExpression : "row.model.name", type: "text"},
					{ name:"image", label : "imagen", valueExpression : "row.model.image", type: "image"},
					{ name:"email", label : "correo", valueExpression : "row.model.email", type: "text"},
					{ name:"address", label : "dirección", valueExpression : "row.model.address.city + ', ' + row.model.address.ctry", type: "text"}
				]
				
			$scope.rowButtons = 
				[
					{ name: "edit", action : $scope.editClick },
					{ name: "delete", action : $scope.deleteClick }
				]
			$scope.collection = collection;
			$scope.enableRowSelect = true;

			//FORM CONFIG:
			$scope.user = collection[0];

			$scope.config = [
				{ name : 'user_name', label : "nombre", model : "name", type:"text" },
				{ name : 'mail', label : "correo", model : "email", type :"email", required : "true" },
				{ name : 'city', label : "ciudad", model : "address.city", type :"select", default:"Seleccione", options : ["Guadalajara", "Monterrey", "Guanajuato"] }
			];

			$scope.selectAllEvent = function(rows)
			{
				console.log("all selected:", rows);
			}

			$scope.selectRowEvent = function(asd)
			{
				console.log("a row was selected:", asd);
			}

			$scope.updateCollection = function()
			{
			
				$scope.collection.push(
								{id:"10", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail2@mail.com"},
								);
			}
		}
	);

})();
