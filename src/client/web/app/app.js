'use strict';

angular.module('app', [
    
// 3rd Party Modules
    'app.core',
    
// Application Modules
    'app.authenticate'
]);

angular.module('app')
    .config(function config($httpProvider, jwtInterceptorProvider) {
        jwtInterceptorProvider.tokenGetter = ['$window', function ($window) {
            return $window.localStorage.getItem('token');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');

    });

angular.module('app')
    .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {


        $stateProvider
            .state('app', {
                url: '/',
                templateUrl: 'app/layout/layout.html',
                data: {
                    requiresLogin: false
                }
            })

            .state('404', {
                url: '/404',
                templateUrl: 'app/404.html'
            });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/404');
    })


angular.module('app')
    .run(function ($state, $window, $rootScope) {
		
        // making $state availbale globally 
        // this can be used in ng-click directly 
        $rootScope.$state = $state;
        $rootScope.title = 'SAK Farms Management';

        $rootScope.$on('$stateChangeStart', function (e, to, toParams, fromState, fromParams) {

            $rootScope.$previousState = fromState;
            $rootScope.$previousStateParams = fromParams;

            if (to.data && to.data.requiresLogin) {
                if (!$window.localStorage.getItem('token')) {
                    e.preventDefault();
                    $state.go('login');
                }
            }
        });
    });


