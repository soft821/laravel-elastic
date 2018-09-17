/**
 * Created by Admin on 10/26/2017.
 */
function UserCreateController($scope, User, $rootScope, sweetAlert)
{
    $scope.entityName = "user";
    $scope.entitiesName = "users";
    $scope.countries = countriesList;
    $scope.userRoles = [{"name": "General Admin", "id": 3}, {"name": "General User", "id": 1}];
    $scope.confirm = false;
    $scope.update = false;

    $scope.confirmMessages = "";
    $scope.notMatch = "Password Not Match";
    $scope.newPassword = '';

    $scope.entity = null;
    $scope.submit = function () {

        if ($scope.entity) {

            User.create($scope.entity).then(function (data, headers) {
                $scope.entity = null;
                var success = 'SuccessFully create' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage("", success);
                $scope.entity = null;
                $scope.user = null;
                $scope.passwordConfirm = '';
                $scope.planId = 0;
                sweetAlert.swal({
                    title: "Create Successful!",
                    html: "You've successfully create the user",
                    type: "success",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    $rootScope.go('/admin/user/management');
                });
                // $rootScope.go('userDetails');
                // $window.open('/#/userManagement', '_self');

            }, function (error) {
                sweetAlert.swal({
                    title: "Unable to Create",
                    html: error.data.message,
                    type: "error",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    $rootScope.go('userManagement');
                });
                //flash.message = error.data.error;
            });
        }
    };


}