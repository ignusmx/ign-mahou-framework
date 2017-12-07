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

			var homeDropDowns = [ 
									new MHButton("about_us", MHBsDecorator.decorateIcon("{{$parent.user.name}}","glyphicon glyphicon-eur", "span"), function(){ alert("nosotros seleccionado")}),
									new MHButton("about_uss", "nosotros", function(){ alert("nosotros seleccionado")}),
									new MHButton("about_usss", "nosotres", function(){ alert("nosotres seleccionado")})
								];


			var homeButton = new MHDropdownButton("home", "inicio", function(){ console.log("home seleccionado")}, homeDropDowns);

			$scope.menuButtons = [
									homeButton
								];

			$scope.menuRightButtons = [
										{
											name:"user", 
											title:"usuario", 
											action : function(){ console.log("usuario seleccionado")}, 
											dropdown_buttons : [
																	{
																		name : "logout", 
																		title: "cerrar sesión", 
																		action:function(){alert("cerrar sesion seleccionado!")}
																	},
																	{
																		name : "config", 
																		title: "Configuración", 
																		action:function(){alert("config seleccionado!")}
																	}
																]
										}
									];

			var collection = [
								{id:"33", name : "Juan perez", image: "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", age:"20", email : "juanperez@mail.com", address:{city:"Guadalajara", ctry:"pais"}},
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

			$
			$scope.title = MHBsDecorator.decorateImage("{{$parent.user.name}}");

			$scope.formFields = [
				{ name : 'user_name', title : "nombre", model : "name", type:"text", cols:2, required:true, invalidMessage:"error, nombre es requerido" },
				{ name : 'age', title : "Edad", model : "age", type:"text", cols:4 },
				{ name : 'mail', title : "correo", model : "email", type :"email", required : true, invalidMessage : "escriba por favor un correo valido" },
				{ name : 'image', title : "Imagen", model : "image", type :"text"},
				{ name : 'city', title : "ciudad", model : "address.city", type :"select", required:true, invalidMessage:"test", invalidClass: "is-invalid", options : ["Guadalajara", "Monterrey", "Guanajuato"] }
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
