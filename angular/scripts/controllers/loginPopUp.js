function LoginPopUpController($scope, AUTH_EVENTS, AuthService, flash, $modalInstance, $rootScope)
{


    $scope.login = true;
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.close = function () {
        $modalInstance.dismiss('cancel');//close modal
        $rootScope.go('login');
    };

    $scope.signIn = function () {//sign in

        var credentials = {
            username: $scope.user.username,
            password: $scope.user.password,
            client_id: 2,
            client_secret: 'RX586LXPT8nFzNEQcwXYIvn7bzA9NLoYOKGiaikd',
            grant_type: 'password',
            scope: ""
        };

        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $modalInstance.close();

        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.user = {
                username: '',
                password: ''
            };
            flash.error = 'Username or Password is invalid. Or User is banned. Contact admin.';
        });
    };


    $scope.goRegister = function () {
        $rootScope.go('register');
        $modalInstance.dismiss('cancel');

    };

}
