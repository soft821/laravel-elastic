function PhotosEditController($scope, $stateParams, Photos, sweetAlert, $rootScope, $modal)
{
    $scope.entityName = "photos";
    $scope.entitiesName = "photos";
    $scope.confirm = false;
    $scope.change = false;
    $scope.update = true;
    $rootScope.createCases = true;
    $scope.companyExist = false;
    $scope.hideBack = true;
    $scope.sortedBy = 'desc';
    $scope.orderBy = 'created_at';
    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalItems = 0;

    $scope.getPhoto = function () {
        Photos.get($stateParams.entityID).then(function (result) {
            $scope.entity = result.data;
        });

    };
    $scope.getPhoto();

    $scope.updatePhoto = function () {


        Photos.update($stateParams.entityID, $scope.entity).then(function (result) {
            $scope.entity = result.data;
            $scope.change = false;
            sweetAlert.swal({
                title: "Update Successful!",
                html: "You've successfully updated the photo",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                $rootScope.go('/admin/user/photo');
            });

        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Update",
                html: error.data.message,
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                //$rootScope.go('userManagement');
            });

            //flash.message = error.data.error;

        });

    };


}