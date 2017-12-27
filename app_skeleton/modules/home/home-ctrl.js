(function () {
	'use strict';

	angular
	.module('app')
	.controller('HomeCtrl', 
		function LoginController($scope, $mdSidenav) 
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
			$scope.action = function(){alert("title")}

			var homeDropDowns = [ 
									new MHButton({name:"calendario", title:"Calendario", action:"eee"}),
									new MHButton({name:"ganado", title:"Ganado", action:function(){ console.log("btns:",$scope.menuButtons)}}),
									new MHButton({name:"about_usss", title:"Bitácoras", function(){ alert("nosotres seleccionado")}}),
									new MHButton({name:"about_ussss", title:"Nuevo sub menu", function(){ alert("nosotres seleccionado")}})
								];


			var homeButton = new MHDropdownButton({name:"home", title:"Ganado", action:function(){ console.log("home seleccionado")}, dropdownButtons:homeDropDowns});

			$scope.menuButtons = [
									homeButton
								];

			$scope.menuRightButtons = [
										homeButton
									];

			var collection = [
								{id:"33", name : "Vaca 1", image: "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/21730881_1308579019264089_2141273733422467777_n.jpg?oh=00acfee51ce92a1f866319ace44dc362&oe=5ACE89F2", age:new Date(), email : "reg34554095", address:{city:"Macho", ctry:"pais", fierro:"url"}},
								{id:"12", name : "Vaca 2", image: "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/21730881_1308579019264089_2141273733422467777_n.jpg?oh=00acfee51ce92a1f866319ace44dc362&oe=5ACE89F2", email : "asd23452345234", address:{city:"Hembra", ctry:"mx"}}
							];
			$scope.status = "no se pudo";
			$scope.datagridCols = 
				[
					new MHDatagridCol({ name:"id", title : '<span style="color:#0FFF0F">'+MHBsDecorator.decorateIcon("id", "glyphicon glyphicon-plus", "i")+"</span>", value : '<span style="color:#0FFF0F">'+MHBsDecorator.decorateEval('row.model.id')+"<span>"}),
					new MHDatagridCol({ name:"name", title : "nombre", value :  MHBsDecorator.decorateEval('row.model.name') }),
					new MHDatagridCol({ name:"image", title : "imagen", value : MHBsDecorator.decorateResponsiveImage(MHBsDecorator.decorateEval('row.model.image'))}),
					new MHDatagridCol({ name:"email", title : "no. registro", value : MHBsDecorator.decorateEval('row.model.email') }),
					new MHDatagridCol({ name:"address", title : "dirección", value : MHBsDecorator.decorateEval("row.model.address.city + ', ' + row.model.address.ctry") })
				]
				
				
			$scope.rowButtons = 
				[
					new MHButton({ name: "edit", title:"Editar", action : "eee" }),
					new MHButton({ name: "delete", title:"Borrar", action : $scope.deleteClick })
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

			$scope.toggleLeft = function()
			{
				$mdSidenav("left").toggle();
			}

			$scope.formElements = [
				new MHFormLabel({ name : "image", title:MHBsDecorator.decorateResponsiveImage("https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/21730881_1308579019264089_2141273733422467777_n.jpg?oh=00acfee51ce92a1f866319ace44dc362&oe=5ACE89F2")}),
				new MHFormFieldMDAutocomplete({ name : 'user_name', title:"asdasd", model:"address.city", required:true, invalidMessage:"error, nombre es requerido", itemText:"item",placeholder:"wers", querySearch:function(s){ return ["1","2","3"]} }),
				new MHFormFieldInputText({ name : 'eee', title:"asdasd", model:"name", required:true, invalidMessage:"error, nombre es requerido", placeholder:"wers" }),
				new MHFormFieldMDDate({ name : 'date', title : "Fecha", model : "age", required:true, placeholder:"eee" }),
				new MHFormFieldInputEmail({ name : 'mail', title : "No. registro", model : "email", required : true, invalidMessage : "escriba por favor un correo valido" }),

				new MHFormButton({name : "accept", title : "Guardar", action : "eee", cssClasses : "btn-primary"}),
				new MHFormButton({name : "cancel", title : "Cancelar", action : $scope.deleteClick, disabledStatuses : "modelUnchanged, formInvalid"}),
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



			var profileRows = [new MHFormBSRow({elements:[new MHFormBSCol({ elements: [$scope.formElements[1], $scope.formElements[1]], colWidth:12, fill:false})]}),
							   new MHFormBSRow({elements:[new MHFormBSCol({ elements: [$scope.formElements[1]], colWidth:12, fill:true})]}),
							   new MHFormBSRow({elements:[new MHFormBSCol({ elements: [$scope.formElements[1]], colWidth:12, fill:true})]})];

			$scope.formLayout = [	
									new MHFormBSRow({elements : [
										new MHFormBSCol({elements:[$scope.formElements[0]], colWidth:2, vAlign:"middle", minHeight:70}),
										new MHFormBSCol({elements:profileRows, colWidth:4, vAlign:"middle", minHeight:70})

										]}),
									new MHFormBSRow({name:"testRow",elements: [new MHFormBSCol({ elements: [$scope.formElements[5], $scope.formElements[6]], colWidth:12, flex:true, hAlign:"center"})]})
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
