(function () {
	'use strict';

	angular
	.module('app')
	.controller('HomeCtrl', 
		function LoginController($scope) 
		{
			var self = this;
			var collection = [
								{id:"33", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail@mail.com", address:{city:"ciudad", ctry:"pais"}},
								{id:"12", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail@mail.com", address:"eee"}
							];
			$scope.status = "no se pudo";
			$scope.config = {
				columns: 
				[
					{ name : "id", valueExpression : "model.id", type: "text"},
					{ name : "nombre", valueExpression : "model.name", type: "image"},
					{ name : "correo", valueExpression : "model.email", type: "text"},
					{ name : "dirección", valueExpression : "model.address.city + ', ' + model.address.ctry", type: "text"}
				]
				,
				collection : collection,
				enableRowSelect : true
			};

			$scope.selectAllEvent = function()
			{
				alert("home ctrl select all event!");
			}

			$scope.log = function()
			{
				console.log("asd");
			}

			$scope.updateCollection = function()
			{
				$scope.config.collection = [
								{id:"10", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail2@mail.com"},
								{id:"5", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail3@mail.com"}
							];
			}
		}
	);

})();
