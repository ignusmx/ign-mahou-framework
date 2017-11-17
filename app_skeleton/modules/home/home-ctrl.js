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
								{id:"33", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail@mail.com", address:{city:"ciudad", ctry:"pais"}},
								{id:"12", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail@mail.com", address:"eee"}
							];
			$scope.status = "no se pudo";
			$scope.config = {
				columns: 
				[
					{ name : "id", valueExpression : "row.model.id", type: "text"},
					{ name : "nombre", valueExpression : "row.model.name", type: "image"},
					{ name : "correo", valueExpression : "row.model.email", type: "text"},
					{ name : "dirección", valueExpression : "row.model.address.city + ', ' + row.model.address.ctry", type: "text"}
				]
				,
				rowButtons : 
				[
					{ name : "edit", action : $scope.editClick },
					{ name : "delete", action : $scope.deleteClick }
				],
				collection : collection,
				enableRowSelect : true
			};			

			$scope.selectAllEvent = function()
			{
				//alert("home ctrl select all event!");
			}

			$scope.log = function()
			{
				console.log("asd");
			}

			$scope.updateCollection = function()
			{
				$scope.config.collection.push(
								{id:"10", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail2@mail.com"},
								);
			}
		}
	);

})();
