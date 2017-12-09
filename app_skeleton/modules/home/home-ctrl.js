(function () {
	'use strict';

	angular
	.module('app')
	.controller('HomeCtrl', 
		function LoginController($scope) 
		{
			var self = this;
			
			$scope.editClick = function(model, form)
			{
				alert("edit clicke!");
				console.log("model to edit is:", form);
				form.$setPristine();
			}

			$scope.deleteClick = function(model)
			{
				alert("delete clicke!");
				console.log("model to delete is:", model);
			}

			//var title = MHBsDecorator.decorateTitleIcon(new MHTitle("{{$parent.user.name}}"),"glyphicon glyphicon-eur", "span");
			//console.log(title);

			var homeDropDowns = [ 
									new MHButton("calendario", "Calendario", function(){ alert("nosotros seleccionado")}),
									new MHButton("ganado", "Ganado", function(){ alert("nosotros seleccionado")}),
									new MHButton("about_usss", "Bitácoras", function(){ alert("nosotres seleccionado")}),
									new MHButton("about_ussss", "Nuevo sub menu", function(){ alert("nosotres seleccionado")})
								];


			var homeButton = new MHDropdownButton("home", "Ganado", function(){ console.log("home seleccionado")}, homeDropDowns);

			$scope.menuButtons = [
									homeButton
								];

			$scope.menuRightButtons = [
										
									];

			var collection = [
								{id:"33", name : "Vaca 1", image: "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/21730881_1308579019264089_2141273733422467777_n.jpg?oh=00acfee51ce92a1f866319ace44dc362&oe=5ACE89F2", age:"20", email : "reg34554095", address:{city:"Hembra", ctry:"pais", fierro:"url"}},
								{id:"12", name : "Vaca 2", image: "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/21730881_1308579019264089_2141273733422467777_n.jpg?oh=00acfee51ce92a1f866319ace44dc362&oe=5ACE89F2", email : "asd23452345234", address:{city:"Macho", ctry:"mx"}}
							];
			$scope.status = "no se pudo";
			$scope.cellsConfig = 
				[
					{ name:"id", label : "id", valueExpression : "row.model.id", type: "text"},
					{ name:"name", label : "nombre", valueExpression : "row.model.name", type: "text"},
					{ name:"image", label : "imagen", valueExpression : "row.model.image", type: "image"},
					{ name:"email", label : "no. registro", valueExpression : "row.model.email", type: "text"},
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

			$scope.title = "{{$parent.user.name}}";

			$scope.formFields = [
				{ name : 'user_name', title : "nombre", model : "name", type:"text", cols:2, required:true, invalidMessage:"error, nombre es requerido" },
				{ name : 'age', title : "Edad", model : "age", type:"text", cols:4 },
				{ name : 'mail', title : "No. registro", model : "email", type :"email", required : true, invalidMessage : "escriba por favor un correo valido" },
				{ name : 'image', title : "Imagen", model : "image", type :"text"},
				{ name : 'city', title : "Sexo", model : "address.city", type :"select", cols:2, required:true, invalidMessage:"test", options : ["Hembra", "Macho"] },
				{ name : 'fierro', title : "Fierro", model : "fierro", type :"text", cols:2 }
			];

			$scope.formButtons = [
				{name : "accept", title : "Guardar", action : $scope.editClick, cssClasses : "btn-primary"},
				{name : "cancel", title : "Cancelar", action : $scope.deleteClick, disabledStatuses : "modelUnchanged, formInvalid"},
				{name : "delete", title : "eliminar", action : $scope.deleteClick, cssClasses : "btn-danger"},
				{name : "clean", title : "limpiar", action : $scope.deleteClick},
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
