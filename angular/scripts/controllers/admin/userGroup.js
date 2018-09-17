/**
 * Created by Admin on 12/13/2017.
 */
function UserGroupController($scope, RoleUser, $modal, $rootScope, sweetAlert, $timeout)
{
    $scope.sortedBy = 'desc';
    $scope.orderBy = 'created_at';
    $scope.search = '';
    $scope.currentPage = 1;
    $scope.searchTerm = "";
    $scope.itemsPerPage = 15;
    $scope.totalItems = 0;
    $scope.create = true;
    $scope.entity = '';
    $scope.entityName = 'Group';
    var initializing = true;

    $scope.tableHeaders = [
        {
            id: 1,
            db_name: 'group_name',
            label: 'group_name',
            lng_name: 'Name'
        },
        {
            id: 2,
            db_name: 'blob_type_id',
            label: 'blob_type',
            lng_name: 'Blob Type'
        },
        {
            id: 3,
            db_name: 'group_affix',
            label: 'group_affix',
            lng_name: 'Affix'
        },
        {
            id: 5,
            db_name: 'action',
            label: 'action',
            lng_name: 'Action'
        }
    ];

    $scope.getEntities = function () {

        RoleUser.getList({
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

    $scope.getEntities();

    $scope.order = function (orderBy) {
        $scope.sort = true;
        $scope.orderBy = orderBy;

        if ($scope.sortedBy === 'desc') {
            $scope.sortedBy = 'asc';
        } else {
            $scope.sortedBy = 'desc';
        }

    };

    $scope.$watchGroup(['orderBy', 'sortedBy', 'searchTerm'], function () {

        if (initializing) {
            $timeout(function () {
                initializing = false;
            });
        } else {
            $scope.getEntities();
        }
    });


    $scope.moreDetails = function (entity) {
        var temp = {group: entity};
        $scope.errorModelOpen = true;
        var modalInstance = $modal.open({
            templateUrl: 'views/admin/user/groupModal.html',
            controller: 'GroupModalController',
            resolve: {
                entity: function () {
                    return temp;
                }
            }
        });
        modalInstance.result.then(function (value) {
            $scope.getEntities();
        }, function () {

        });

    };

    $scope.delete = function (entity) {
        GroupTypes.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getEntities();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';

            sweetAlert.swal({
                title: "Delete Successful!",
                html: "You've successfully deleted the group",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Delete",
                html: "Error in deleting group",
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
        }, function () {

        });

    };

}