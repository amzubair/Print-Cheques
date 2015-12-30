angular.module('app.authenticate', [])

	.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

		$stateProvider
			.state('app.login', {
				url: 'login',
				templateUrl: 'app/authenticate/views/login.html',
				controller: 'AuthenticateController',
				controllerAs: 'authenticate',
			})
			.state('app.signup', {
				url: 'signup',
				templateUrl: 'app/authenticate/views/signup.html',
				controller: 'AuthenticateController',
				controllerAs: 'authenticate',
		
			});
			
	});

