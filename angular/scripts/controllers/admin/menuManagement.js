function MenuManagementController($scope, $rootScope, AllMenuesByRole, AddRemoveMenuToRole)
{

    var getEntities = function () {

        AllMenuesByRole.customGET('', {}).then(function (data, headers) {
            $scope.entities = data;
        }, function (error) {

        });
    };
    getEntities();

    $scope.update = function (entity, menu) {

        var params = {roleId: entity.id, menuId: menu.id, permission: menu.permission};
        AddRemoveMenuToRole.post(params).then(function (data) {
            var success = 'Successfully updated';
            //$rootScope.successMessage("",success);
        }, function (error) {
            //$rootScope.errorMessage (error,"update");
        });
    };

}