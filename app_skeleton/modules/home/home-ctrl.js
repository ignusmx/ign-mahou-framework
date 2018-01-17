(function () {
	'use strict';

	angular
	.module('app')
	.controller('HomeCtrl', 
		function LoginController($scope, $mdSidenav) 
		{
			var self = this;
			
			$scope.editClick = function(model)
			{
				$scope.selectedObject = model;
				console.log($scope.selectedObject);

			}

			$scope.deleteClick = function(model)
			{
				alert("delete clicke!");
				console.log("model to delete is:", model);
			}

			$scope.action = function(){alert("title")}

			var leftDropDowns = [ 
									new MHButton({name:"housing", title:"Inmuebles"}),
									new MHButton({name:"contacts", title:"Contactos", action:function(){ console.log("btns:",$scope.menuButtons)}}),
									new MHButton({name:"about_usss", title:"Actividades", action:function(){ alert("nosotres seleccionado")}})
								];

			var rightDropDowns = [ 
									new MHButton({name:"users", title:"Usuarios", action:"eee"}),
									new MHButton({name:"roles", title:"Roles y permisos", action:function(){ console.log("btns:",$scope.menuButtons)}}),
								];


			var homeButton = new MHDropdownButton({name:"left", title:"Catálogo", action:function(){ console.log("home seleccionado")}, dropdownButtons:leftDropDowns});
			var rightButton = new MHDropdownButton({name:"right", title:"Configuración", action:function(){ console.log("home seleccionado")}, dropdownButtons:rightDropDowns});

			$scope.menuButtons = [
									homeButton
								];

			$scope.menuRightButtons = [
										rightButton
									];

			var collection = [
								{id:"33", name : "Penthouse cerca de andares", images: ["https://twistedsifter.files.wordpress.com/2010/06/st-regis-hotel-penthouse-san-francisco.jpg"], age:new Date(), email : "reg34554095", address:{city:"Guadalajara", state:"Jalisco", fierro:"url"}, price:5900000},
								{id:"12", name : "Casa en solares", images: ["http://casasenventaenguadalajara.com/images/casa-valeira-habitat-paseo-solares-zapopan.jpg"], email : "asd23452345234", address:{city:"Zapopan", state:"Jalisco"}, price:2500000},
								{id:"12", name : "Casa en solares", images: ["http://casasenventaenguadalajara.com/images/casa-valeira-habitat-paseo-solares-zapopan.jpg"], email : "asd23452345234", address:{city:"Zapopan", state:"Jalisco"}, price:2500000},
								{id:"12", name : "Casa en solares", images: ["http://casasenventaenguadalajara.com/images/casa-valeira-habitat-paseo-solares-zapopan.jpg"], email : "asd23452345234", address:{city:"Zapopan", state:"Jalisco"}, price:2500000},
								{id:"12", name : "Casa en solares", images: ["http://casasenventaenguadalajara.com/images/casa-valeira-habitat-paseo-solares-zapopan.jpg"], email : "asd23452345234", address:{city:"Zapopan", state:"Jalisco"}, price:2500000},
								{id:"12", name : "Casa en solares", images: ["http://casasenventaenguadalajara.com/images/casa-valeira-habitat-paseo-solares-zapopan.jpg"], email : "asd23452345234", address:{city:"Zapopan", state:"Jalisco"}, price:2500000},
								{id:"12", name : "Casa en solares", images: ["http://casasenventaenguadalajara.com/images/casa-valeira-habitat-paseo-solares-zapopan.jpg"], email : "asd23452345234", address:{city:"Zapopan", state:"Jalisco"}, price:2500000}
							];

			$scope.status = "no se pudo";

			$scope.rowButtons = [new MHButton({ name: "delete", title:MHDecorator.decorateIcon("", "glyphicon glyphicon-pencil", "i"), action : $scope.editClick, cssClasses:"btn btn-primary", styles:{"margin-right":"10px"} }),
								 new MHButton({ name: "edit", title:MHDecorator.decorateIcon("", "glyphicon glyphicon-trash", "i"), action : "eee", cssClasses:"btn btn-danger" })
								];

			$scope.fileprev = new MHFilePreview({file:collection[0].images[0]});
			$scope.datagridCols = 
				[
					new MHDatagridCol({ name:"id", title : "id", content : MHDecorator.decorateEval('row.model.id')}),
					new MHDatagridCol({ name:"name", title : "nombre", content :  MHDecorator.decorateEval('row.model.name') }),
					new MHDatagridCol({ name:"image", title : "imagen", content : MHDecorator.decorateFilePreview('row.model.images[0]')}),
					new MHDatagridCol({ name:"price", title : "Precio", content : MHDecorator.decorateEval('row.model.price | currency') }),
					new MHDatagridCol({ name:"address", title : "Dirección", content : MHDecorator.decorateEval("row.model.address.city + ', ' + row.model.address.state") }),
					new MHDatagridCol({ name:"actions", title : "Acciones", content : $scope.rowButtons}),
					new MHDatagridCheckboxCol({ name:"checkbox"})
					
				];

			$scope.thumbCols = 
				[
					new MHDatagridCol({ name:"name", title : "nombre", content :  MHDecorator.decorateEval('row.model.name') }),
					new MHDatagridCol({ name:"image", title : "imagen", content : MHDecorator.decorateFilePreview('row.model')}),
					
				]
			
			$scope.collection = collection;
			$scope.enableRowSelect = true;

			//FORM CONFIG:
			$scope.selectedObject = collection[0];

			$scope.pageSelected = function(page)
			{
				console.log("page:",page);
			}

			$scope.title = "Inmobiliaria App";

			$scope.toggleLeft = function()
			{
				$mdSidenav("left").toggle();
			}
			$scope.formElements = [
				new MHFormLabel({ name : "image", title:MHDecorator.decorateAttributes(MHDecorator.decorateResponsiveImage(""),{"ngf-thumbnail" : "model.images[0]"})}),
				new MHFormFieldInputText({ name : 'name', title:"Nombre de la propiedad", model:"name", required:true, invalidMessage:"error, nombre es requerido", itemText:"item",placeholder:"wers", querySearch:function(s){ return ["1","2","3"]} }),
				new MHFormFieldInputNumber({name:"price", title:"Precio", model:"price", required:true, invalidMessage:"error, debe especificar un precio"}),
				new MHFormFieldMDSelect({name:"city", title:"Ciudad", model:"address.city", options:["Guadalajara", "Zapopan"]}),
				new MHFormFieldDropfile({ name : 'photos', title:"Agregar fotos", model:"images", required:true, invalidMessage:"error, nombre es requerido", placeholder:"wers", multiple:true, accept:".pdf" }),
				new MHFormFieldMDDate({ name : 'date', title : "Fecha", model : "age", required:true, placeholder:"eee" }),
				new MHFormFieldInputEmail({ name : 'mail', title : "No. registro", model : "email", required : true, invalidMessage : "escriba por favor un correo valido" }),

				new MHFormButton({name : "accept", title : "Guardar", action : function(){
					console.log($scope.user.images)
				}, cssClasses : "btn-primary"}),
				new MHFormButton({name : "cancel", title : "Cancelar", action : $scope.deleteClick, disabledStatuses : ["modelUnchanged", "parentFormInvalid"]}),
			];

			$scope.onFormInit = function(api)
			{
				setTimeout(function(){
					api.disableForm();
				}, 1000)
				console.log();
			}

			var row0Elements = [new MHFormBSCol({elements : [$scope.formElements[0],
																			 $scope.formElements[0]], 
																			  vAlign:"bottom"}),
									new MHFormBSCol({elements:[
																	$scope.formElements[4],
																	$scope.formElements[5]]})
								]



			var profileRows = [new MHFormBSRow({elements:[new MHFormBSCol({ elements: [$scope.formElements[1]], colWidth:12, fill:true})]}),
							   new MHFormBSRow({elements:[new MHFormBSCol({ elements: [$scope.formElements[2], $scope.formElements[3]], colWidth:12, flex:true, fill:true, vAlign:"bottom"})]}),
							   new MHFormBSRow({elements:[new MHFormBSCol({ elements: [$scope.formElements[4]], colWidth:12, fill:true})]})];

			$scope.formLayout = [	
									new MHFormBSRow({elements : [
										new MHFormBSCol({elements:[$scope.formElements[0]], colWidth:4, vAlign:"middle", minHeight:70}),
										new MHFormBSCol({elements:profileRows, colWidth:8, vAlign:"middle", minHeight:70})

										]}),
									new MHFormBSRow({name:"testRow",elements: [new MHFormBSCol({ elements: [$scope.formElements[7], $scope.formElements[8]], colWidth:12, flex:true, hAlign:"center"})]})
								];

			$scope.gridRowsSelected = function(rows)
			{
				console.log("rows selected:", rows);
			}

			$scope.updateCollection = function()
			{
			
				$scope.collection.push(
								{id:"10", name : "https://media.giphy.com/media/eCHyG8RD7ezFC/giphy.gif", email : "elmail2@mail.com"}
								);
			}
		}
	);

})();
