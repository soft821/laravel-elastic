/**
 * Created by Admin on 11/1/2017.
 */
'use strict';

function ClientsManagementController($modal, $scope, $rootScope, User, $stateParams, sweetAlert, UsersTrainers)
{

    var SpecificUsersRepository = UsersTrainers;

    $scope.getSpecificUsers = function () {

        UsersTrainers.getList().then(function (result) {
            $scope.specificUsers = result.data;
            console.log($scope.specificUsers);
        })


    }
    $scope.getSpecificUsers();


    $scope.entityName = 'user';
    $scope.pageIndex = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.itemsPerPage = 20;
    $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.totalItems = 0;
    $scope.requireSubscription = false;

    $scope.sortedBy = 'asc';
    $scope.orderBy = 'username';
    $scope.sort = false;
    if ($stateParams.email) {
        $scope.searchTerm = $stateParams.email;
    }

    $scope.tableHeaders = [
        {
            id: 1,
            db_name: 'profile_pic',
            label: 'profile_pic',
            lng_name: 'Avatar'
        },
        {
            id: 2,
            db_name: 'username',
            label: 'username',
            lng_name: 'Username'
        },
        {
            id: 3,
            db_name: 'first_name',
            label: 'first_name NAME',
            lng_name: 'First Name'
        },
        {
            id: 4,
            db_name: 'last_name',
            label: 'last_name',
            lng_name: 'Last Name'
        },
        {
            id: 5,
            db_name: 'email',
            label: 'email',
            lng_name: 'Email'
        },
        {
            id: 6,
            db_name: 'created_at',
            label: 'created',
            lng_name: 'Registered'
        },
        {
            id: 7,
            db_name: 'action',
            label: 'action',
            lng_name: 'Action'
        }
        // {
        //     id : 6,
        //     db_name : 'ban',
        //     label : 'ban',
        //     lng_name : 'Ban'
        // }

    ];


    $scope.getUsers = function () {
        User.getList({
            limit: $scope.itemsPerPage,
            page: $scope.currentPage,
            search: 'role.name:Consumer',
            orderBy: $scope.orderBy,
            sortedBy: $scope.sortedBy
        }).then(function (result) {
            var data = result.data;
            $scope.entities = data.data;
            $scope.totalItems = data.total;

        });

    };
    $scope.getUsers();

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
        $scope.getUsers();
    });


    $scope.$watch('sortedBy', function () {
        $scope.getUsers();
    });

    $scope.delete = function (entity) {
        User.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getUsers();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';

            sweetAlert.swal({
                title: "Delete Successful!",
                html: "You've successfully deleted the user",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {

            });
        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Delete",
                html: "Error in deleting user",
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

        });

    };

    $scope.bandConfirm = function (entity) {

        var modalInstance = $rootScope.getBanConfirmationModel($scope.entityName, entity);

        modalInstance.result.then(function () {
            $scope.getEntities();

        }, function () {

        });

    };

    $scope.unBannedUser = function (entity) {


        var modalInstance = $rootScope.getUnBanConfirmationModel($scope.entityName, entity);


        modalInstance.result.then(function () {
            $scope.getEntities();

        }, function () {

        });
    };


    $scope.moreDetails = function (entityID) {
        $rootScope.go("/admin/management/edit/" + entityID);

    };
    $scope.open = function () {
        $rootScope.go("/admin/management/create");
    };

    // $scope.invite = function () {
    //     var modalInstance = $modal.open({
    //         templateUrl: 'views/invitantional.html',
    //         controller: 'InvitantionalController',
    //         // size: 'lg',


    //     });
    // };
    $scope.cancel = function () {
        var modalInstance = $modal.close({
            templateUrl: 'views/admin/user/clientsManagement.html',
        });
    };


}