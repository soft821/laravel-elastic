function ForgetPasswordController($scope, PostReset, $stateParams, sweetAlert, locale)
{
    $scope.goToLogin = function () {
        $window.open('/#/login', '_self');
    };

    $scope.user = {};

    if ($stateParams.code) {
        $scope.codeHash = $stateParams.code;
    }

    $scope.resetPassword = function () {

        if ($scope.user) {
            var reset = {
                email: $scope.user.email,
                password: $scope.user.password,
                password_confirmation: $scope.user.password,
                token: $scope.codeHash
            };

            PostReset.post(reset).then(function (data, headers) {
                // Success
                $scope.user = null;
                $scope.resetSuccess = true;
                sweetAlert.swal({
                    title: locale.getString('common.success'),
                    html: locale.getString('common.resetPasswordSuccess'),
                    type: "success",
                    confirmButtonText: "Ok"
                }, function () {
                });
            }, function (error) {
                // failure
                sweetAlert.swal({
                    title: locale.getString('common.error'),
                    html: locale.getString('common.resetPasswordError'),
                    type: "error",
                    confirmButtonText: "Ok"
                }, function () {
                });

            });
        }
    };
}