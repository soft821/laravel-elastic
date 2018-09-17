function LoginController($scope, locale, $rootScope, AUTH_EVENTS, AuthService, $auth, PostRemind, sweetAlert, $modal)
{

    $rootScope.logo = false;
    $rootScope.isFooter = false;//hide show footer

    $scope.$parent.embed = false;
    $scope.isLoginPage = false;
    $scope.forgotPw = false;
    $scope.login = true;
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.loginAccount = function () {
        $scope.login = true;
        $scope.forgotPw = false;
    };

    $scope.forgotPassword = function () {
        $scope.forgotPw = true;
        $scope.login = false;
    };

    $scope.forgetPassword = function () {

        var modalInstance = $modal.open({
            size: 'md',
            templateUrl: 'views/user/contactAdmin.html',
            controller: 'ContactAdminController'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };
    $scope.sendEmail = function () {

        if ($scope.resetEmail) {
            var reset = {email: $scope.resetEmail};
            PostRemind.post(reset).then(function (data, headers) {
                sweetAlert.swal({
                    title: locale.getString('common.resetSent'),
                    html: locale.getString('common.resetMessage'),
                    type: "success",
                    confirmButtonText: "Ok"
                }, function () {
                });


                $scope.resetEmail = '';

            }, function (error) {
                sweetAlert.swal({
                    title: locale.getString('common.error'),
                    html: locale.getString('common.errorReset'),
                    type: "error",
                    confirmButtonText: "Ok"
                }, function () {
                });

            });
        }
    };


    $scope.signIn = function () {
        var credentials = {
            email: $scope.user.username,
            password: $scope.user.password
        };
        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }, function (error) {
            sweetAlert.swal({
                title: locale.getString('common.error'),
                html: locale.getString('common.credentialsWrong'),
                type: "error",
                confirmButtonText: "Ok"
            }, function () {
            });

            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.user = {
                username: '',
                password: ''
            };
        });
    };


    $scope.authenticate = function (provider) {


        $auth.authenticate(provider).then(function (response) {

            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        })
            .catch(function (response) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });

    };


}
