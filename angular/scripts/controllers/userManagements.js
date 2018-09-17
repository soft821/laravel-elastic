'use strict';

function UserManagementsController($scope, $modal, $rootScope, UserRepository)
{

    var EnitityRepository = UserRepository;
    $scope.entityName = "user";
    $scope.entitiesName = "users";
    $scope.search = '';
    $scope.currentPage = 1;
    $scope.group_id = 2;
    $scope.getEntities = function () {
        var params = {page: $scope.currentPage, search: $scope.search, group_id: $scope.group_id};
        EnitityRepository.getList(params).then(function (result) {
            $scope.entities = result.data;
            $scope.itemsPerPage = result.page.per_page;
            $scope.currentPage = result.page.current_page;
            $scope.totalItems = result.page.total;
            $scope.maxSize = 5;
        });
    };
    $scope.getEntities();
    $scope.delete = function (entity) {
        EnitityRepository.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getEntities();
            var success = 'Deletion of' + ' ' + $scope.entityName + ' ' + 'completed!';
            $rootScope.successMessage("", success);
        }, function (error) {
            $rootScope.errorMessage(error, "delete");
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
        $rootScope.go("userManagements_edit/" + entityID);

    };
    $scope.open = function () {
        $rootScope.go("userManagements_create");
    };
}


function MoreDetailsUserManagementsModalInstanceController($scope, $stateParams, UserRepository, $rootScope, $modalInstance)
{

    $scope.entityName = "user";
    $scope.entitiesName = "users";

    $scope.countries = countriesList;
    $scope.confirm = false;
    $scope.change = false;

    $scope.confirmMessages = "";

    $scope.notMatch = "Password Not Match";

    $scope.newPassword = '';
    $scope.check = function (newPassword, confirmPassword) {
        if (newPassword != confirmPassword) {
            $scope.confirm = true;
            return $scope.confirmMessage = $scope.notMatch;
        } else {
            $scope.confirm = false;
        }
    };
    if ($stateParams.entityID) {
        $scope.entityID = $stateParams.entityID;
    }
    $scope.getUser = function () {
        UserRepository.get($scope.entityID).then(function (result) {
            $scope.entity = result;
        });
    };
    $scope.getUser();
    $scope.ok = function () {
        if ($scope.entity) {
            if ($scope.newPassword) {
                $scope.user.password = $scope.newPassword;
            }
            UserRepository.update($scope.entity).then(function () {
                // Success
                var success = 'SuccessFully update' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage("", success);
                $scope.entity = null;
                $modalInstance.close();
            }, function (error) {
                // failure
                $rootScope.errorMessage(error, "update");
            });

        }
    };

}

function NewUserManagementsController($scope, $rootScope, UserCreate)
{

    $scope.entityName = "user";
    $scope.entitiesName = "users";
    $scope.countries = countriesList;
    $scope.confirm = false;

    $scope.confirmMessages = "";

    $scope.notMatch = "Password Not Match";

    $scope.newPassword = '';
    $scope.check = function (newPassword, confirmPassword) {
        if (newPassword != confirmPassword) {
            $scope.confirm = true;
            return $scope.confirmMessage = $scope.notMatch;
        } else {
            $scope.confirm = false;
        }
    };

    $scope.entity = null;
    $scope.submit = function () {

        if ($scope.entity) {

            $scope.entity.group_id = 2;

            UserCreate.post($scope.entity).then(function (data, headers) {
                $scope.entity = null;
                var success = 'SuccessFully create' + ' ' + $scope.entityName + '!';
                $rootScope.successMessage("", success);
                $scope.entity = null;
                $scope.user = null;
                $scope.passwordConfirm = '';
                $scope.planId = 0;
                // $window.open('/#/userManagement', '_self');

            }, function (error) {
                $rootScope.errorMessage(error, "update");
            });
        }

    };

}



