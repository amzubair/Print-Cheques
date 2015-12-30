angular.module('app.authenticate')
    .controller('AuthenticateController', AuthenticateController);

function AuthenticateController($http, $state, AuthFactory) {
    var authenticate = this;

    authenticate.tokenPayLoad =  AuthFactory.decodeToken() || null;


    authenticate.login = function (username, password) {
        if (username && password) {
            $http.post('/api/login', {
                'username': username,
                'password': password
            }).then(function (response) {
                if (response.data.token) {
                    AuthFactory.setToken(response.data.token);
                    // $state.go('app.logedin');
                    authenticate.message = authenticate.tokenPayLoad;
                } else {
                    AuthFactory.setToken();
                    authenticate.password = '';
                    authenticate.message = 'Invalid Username or Password';
                }

            }, handleError);


        } else {
            authenticate.message = "Please provide a valid username and password";
        }
    }

    authenticate.signout = function () {
        if (AuthFactory.getToken()) {
            AuthFactory.setToken();
            authenticate.message = "Loged Out"
            $state.go('app.login');
        }
    }

    return authenticate;

    function handleError(response) {
        authenticate.message = 'Error: ' + response.data;
    }
}