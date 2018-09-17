/**
 * Created by Admin on 11/14/2017.
 */
function ConfirmationModalController($scope, $modalInstance)
{

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}