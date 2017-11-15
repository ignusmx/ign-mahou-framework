(function () {
	'use strict';

	angular
	.module('app')
	.controller('HomeCtrl', 
		function LoginController($scope) 
		{
			var self = this;
			var collection = [
								{id:"33", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail@mail.com"},
								{id:"12", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail@mail.com"}
							];
			$scope.status = "no se pudo";
			$scope.config = {
				columns: 
				[
					{ name : "id", modelKey : "id", type: "text"},
					{ name : "nombre", modelKey : "name", type: "image"},
					{ name : "correo", modelKey : "email", type: "text"}
				]
				,
				collection : collection,
				enableRowSelect : true
			};

			$scope.updateCollection = function(){
				$scope.config.collection = [
								{id:"10", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail2@mail.com"},
								{id:"5", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail3@mail.com"}
							];
			}
		}
	);

})();
