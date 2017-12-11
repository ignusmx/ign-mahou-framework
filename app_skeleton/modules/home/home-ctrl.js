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
									new MHButton({name:"calendario", title:"Calendario", action:function(){ alert("nosotros seleccionado")}}),
									new MHButton("ganado", "Ganado", function(){ alert("nosotros seleccionado")}),
									new MHButton("about_usss", "Bitácoras", function(){ alert("nosotres seleccionado")}),
									new MHButton("about_ussss", "Nuevo sub menu", function(){ alert("nosotres seleccionado")})
								];


			var homeButton = new MHDropdownButton({name:"home", title:"Ganado", action:function(){ console.log("home seleccionado")}, dropdownButtons:homeDropDowns});

			$scope.menuButtons = [
									homeButton
								];

			$scope.menuRightButtons = [
										
									];

			var collection = [
								{id:"33", name : "Vaca 1", image: "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/21730881_1308579019264089_2141273733422467777_n.jpg?oh=00acfee51ce92a1f866319ace44dc362&oe=5ACE89F2", age:new Date(), email : "reg34554095", address:{city:"Macho", ctry:"pais", fierro:"url"}},
								{id:"12", name : "Vaca 2", image: "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/21730881_1308579019264089_2141273733422467777_n.jpg?oh=00acfee51ce92a1f866319ace44dc362&oe=5ACE89F2", email : "asd23452345234", address:{city:"Hembra", ctry:"mx"}}
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

			$scope.pageSelected = function(page)
			{
				console.log("page:",page);
			}

			$scope.title = "{{$parent.user.name}}";

			$scope.formElements = [
				new MHFormFieldInput({ name : 'user_name', title : "nombre", model : "name", type:"text", required:true, invalidMessage:"error, nombre es requerido", placeholder:"wers" }),
				new MHFormFieldMDDate({ name : 'date', title : "Fecha", model : "age", required:true, placeholder:"eee" }),
				new MHFormFieldInput({ name : 'mail', title : "No. registro", model : "email", type :"email", required : true, invalidMessage : "escriba por favor un correo valido" }),
				new MHFormFieldSelect({ name : 'city', title : "Sexo", model : "address.city", required:true, invalidMessage:"test", options : ["Hembra", "Macho"] }),
				new MHFormButton({name : "accept", title : "Guardar", action : $scope.editClick, cssClasses : "btn-primary"}),
				new MHFormButton({name : "cancel", title : "Cancelar", action : $scope.deleteClick, disabledStatuses : "modelUnchanged, formInvalid"}),
			];

			$scope.onFormInit = function(api)
			{
				setTimeout(function(){
					api.disableForm();
				}, 1000)
				console.log();
			}

			$scope.containers = [	new MHFormBSElementContainer({elements : [$scope.formElements[0],
																			 $scope.formElements[1]], 
																			  align:"bottom"}),
									new MHFormBSElementContainer({elements:[
																	$scope.formElements[4],
																	$scope.formElements[5]]})
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
