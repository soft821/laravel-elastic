/**
 * Created by Admin on 12/13/2017.
 */
function GroupModalController($scope, entity, $modalInstance, GroupTypes, sweetAlert, BlobTypes)
{
    $scope.isCreate = true;
    $scope.group = {};


    $scope.getBlobTypes = function () {
        BlobTypes.get().then(function (result) {
            $scope.blobTypes = result.data;
        });
    };
    $scope.getBlobTypes();

    $scope.getGroup = function () {
        GroupTypes.get($scope.entity).then(function (result) {
            $scope.group = result.data;
        });
    };

    if (entity.group) {
        $scope.entity = entity.group.id;
        $scope.isCreate = false;
        $scope.getGroup();

    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    $scope.ok = function () {
        $modalInstance.close();
        GroupTypes.update($scope.entity, $scope.group).then(function (result) {

            sweetAlert.swal({
                title: "Update Successful!",
                html: "You've successfully updated the group",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

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


    $scope.create = function () {
        $modalInstance.close();
        GroupTypes.create($scope.group).then(function (result) {

            sweetAlert.swal({
                title: "Create Successful!",
                html: "You've successfully created the group",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

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