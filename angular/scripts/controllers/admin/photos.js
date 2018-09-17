/**
 */
function PhotosController($scope, $rootScope, User, $stateParams, sweetAlert, Photos)
{
    $scope.entityName = 'photos';
    $scope.pageIndex = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.itemsPerPage = 20;
    $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.totalItems = 0;
    $scope.requireSubscription = false;

    $scope.sortedBy = 'asc';
    $scope.orderBy = 'id';
    $scope.sort = false;

    $scope.tableHeaders = [
        {
            id: 1,
            db_name: 'path',
            label: 'path',
            lng_name: 'Path'
        },
        {
            id: 2,
            db_name: 'src',
            label: 'source',
            lng_name: 'Source'
        },
        {
            id: 3,
            db_name: 'link',
            label: 'link',
            lng_name: 'Link'
        },
        {
            id: 4,
            db_name: 'created_at',
            label: 'created_at',
            lng_name: 'Created'
        },
        {
            id: 5,
            db_name: 'action',
            label: 'action',
            lng_name: 'Action'
        }

    ];


    $scope.getPhotos = function () {
        Photos.getList({
            limit: $scope.itemsPerPage,
            page: $scope.currentPage,
            search: $scope.searchTerm,
            orderBy: $scope.orderBy,
            sortedBy: $scope.sortedBy
        }).then(function (result) {
            var data = result.data;
            $scope.entities = data.data;
            $scope.totalItems = data.total;

        });

    };
    $scope.getPhotos();

    $scope.order = function (orderBy) {
        $scope.sort = true;
        $scope.orderBy = orderBy;

        if ($scope.sortedBy === 'desc') {
            $scope.sortedBy = 'asc';
        } else {
            $scope.sortedBy = 'desc';
        }

    };

    $scope.$watch('orderBy', function () {
        $scope.getPhotos();
    });


    $scope.$watch('sortedBy', function () {
        $scope.getPhotos();
    });

    $scope.delete = function (entity) {
        Photos.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getPhotos();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';

            sweetAlert.swal({
                title: "Delete Successful!",
                html: "You've successfully deleted the photo",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Delete",
                html: "Error in deleting photo",
                type: "error",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        });
    };

    $scope.deleteConfirm = function (entity) {

        var modalInstance = $rootScope.getDeleteConfirmationModel($scope.entityName);

        modalInstance.result.then(function () {
            $scope.delete(entity);
            $scope.createEntity = 1;
        }, function () {
            $scope.getPhotos();
        });

    };


    $scope.moreDetails = function (entityID) {
        $rootScope.go("/admin/photos/edit/" + entityID);

    };
    $scope.open = function () {
        $rootScope.go("/admin/photos/create");
    };


}