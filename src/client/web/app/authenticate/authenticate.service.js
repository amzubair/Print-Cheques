'use strict';

angular.module('app')
	.factory('AuthFactory', function (jwtHelper, $window, $state) {

		// Variable Declaratons
		var store = $window.localStorage;
		var key = 'token';

		// Return Functions
		return {
			getToken: getToken,
			setToken: setToken,
			decodeToken: decodeToken,
			hasToken: hasToken
		};

		// Functions
		function decodeToken() {
			if (getToken()) {
				return  jwtHelper.decodeToken(getToken());
			}
		}

		function getToken() {
			return store.getItem(key);
		}

		function setToken(token) {
			if (token) {
				store.setItem(key, token);
				
			} else {
				store.removeItem(key);
			}
		}

		function hasToken() {
			if (!getToken()) {
				$state.go('app.login');
			} 
		}

	});
