/**
 * Created by Admin on 10/26/2017.
 */
function PhotosCreateController($scope, Photos, $rootScope, sweetAlert)
{
    $scope.entityName = "photos";
    $scope.entitiesName = "photos";

    $scope.entity = null;
    $scope.submit = function () {

        if ($scope.entity) {

            Photos.create($scope.entity).then(function (data, headers) {
                $scope.entity = null;
                var success = 'SuccessFully create' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage("", success);
                $scope.photo = data.result;
                $scope.passwordConfirm = '';
                $scope.planId = 0;
                sweetAlert.swal({
                    title: "Create Successful!",
                    html: "You've successfully create the photo",
                    type: "success",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    $rootScope.go('/admin/user/photos');
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
                    $rootScope.go('/admin/user/photos');
                });
                //flash.message = error.data.error;
            });
        }
    };


}