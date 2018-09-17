function MenusController($scope, $rootScope, $modal, MenuRepository)
{

    var EnitityRepository = MenuRepository;
    $scope.entityName = "menu";
    $scope.entitiesName = "menus";
    $scope.createEntity = 1;
    $scope.entity = null;
    $scope.search = '';
    $scope.currentPage = 1;

    $scope.getEntities = function () {
        var params = {page: this.currentPage, search: $scope.search};
        EnitityRepository.getList(params).then(function (result) {
            $scope.entities = result.data.data;
            $scope.itemsPerPage = result.data.per_page;
            $scope.currentPage = result.data.current_page;
            $scope.totalItems = result.data.total;
            $scope.maxSize = 0;

        }, function (error) {

        });
    };
    $scope.getEntities();

    $scope.selectedCategoryId = 0;
    $scope.setEntity = function (entity) {
        EnitityRepository.get(entity.id).then(function (result) {
            $scope.entity = result;
            $scope.createEntity = 0;
        }, function (error) {
        });
    };
    $scope.create = function () {

        if ($scope.entity) {

            $scope.entity.order_number = 40;

            EnitityRepository.create($scope.entity).then(function (result, headers) {
                var action = 'Successfully Created ' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage(result, action);
                $scope.entity = null;
                $scope.getEntities();
            }, function (error) {

                $rootScope.errorMessage(error, "create");
            });
        }
    };

    $scope.createEnable = function () {
        $scope.entity = null;

        $scope.createEntity = 1;
    };

    $scope.update = function () {

        if ($scope.entity) {

            if ($scope.entity.change_tile_image) {
                $scope.entity.tile_image = $scope.entity.change_tile_image;
            } else {
                delete $scope.entity.tile_image;
            }

            EnitityRepository.update($scope.entity).then(function (result) {
                var success = 'Successfully updated' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage(result, success);
                $scope.entity = null;
                $scope.createEntity = 1;
                $scope.getEntities();
            }, function (error) {
                $rootScope.errorMessage(error, "update");
                $scope.getEntities();
            });
        }
    };

    $scope.delete = function (entity) {
        EnitityRepository.remove($scope.entity).then(function () {
            $scope.entity = null;
            $scope.getEntities();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';
            $rootScope.successMessage("", success);
        }, function (error) {
            $rootScope.errorMessage(error, "delete");
        });
    };

    $scope.deleteConfirm = function (entity) {

        var modalInstance = $modal.open({
            templateUrl: 'views/deleteConfirmation.html',
            controller: 'DeleteConfirmModalInstanceController',
            resolve: {
                entityName: function () {
                    return $scope.entityName;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.delete(entity);
            $scope.createEntity = 1;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}
