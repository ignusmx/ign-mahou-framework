(function(){
	'use strict';

	angular.module('app', ['ui.router'])
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