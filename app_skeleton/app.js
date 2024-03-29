(function(){
	'use strict';

	angular.module('app', ['ui.router', 'ngMaterial', 'ngFileUpload', 'ign.Mahou'])
	.config(
		function($stateProvider, $urlRouterProvider, $locationProvider)
		{
			$urlRouterProvider.otherwise('/home');

			$stateProvider
			.state('home',{
				url: "/home",
				templateUrl: "modules/home/index.html",
				controller: "HomeCtrl as homeCtrl"
			})
			$stateProvider
			.state('eee',{
				url: "/eee",
				templateUrl: "modules/home/form-template.html"
			})

			$locationProvider.hashPrefix('!');
			$locationProvider.html5Mode(true);
		}
	)
	.run(
		function($rootScope) 
		{

	  	}
  	);

})();