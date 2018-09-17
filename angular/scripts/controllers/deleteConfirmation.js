function DeleteConfirmModalInstanceController($scope, $modalInstance, entityName)
{
    $scope.entityName = entityName;

    $scope.deleteEntity = function () {
        $modalInstance.close(); //close modal
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');//close modal
    };
}