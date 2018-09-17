/**
 * Created by Admin on 11/1/2017.
 */
/**
 * Created by Admin on 10/26/2017.
 */
function UserEditController($scope, $stateParams, User, sweetAlert, $rootScope, $modal)
{
    $scope.entityName = "user";
    $scope.entitiesName = "users";
    $scope.countries = countriesList;
    $scope.confirm = false;
    $scope.change = false;
    $scope.update = true;
    $rootScope.createCases = true;
    $scope.companyExist = false;
    $scope.hideBack = true;
    $scope.userRoles = [{"name": "General Admin", "id": 3}, {"name": "Client", "id": 1}, {"name": "Trainer", "id": 4}];
    $scope.sortedBy = 'desc';
    $scope.orderBy = 'created_at';
    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalItems = 0;


    $scope.createNewCases = function () {
        $rootScope.createCases = false;
    };
    $scope.backToCase = function () {
        $rootScope.createCases = true;
    };
    $scope.companyEdit = function () {
        $scope.companyExist = !$scope.companyExist;
        $scope.hideBack = false;
    };

    $scope.getUser = function () {
        User.get($stateParams.entityID).then(function (result) {
            $scope.entity = result.data;
            $scope.entity.role_id = $scope.entity.roles[0].id;
            // $scope.ugroup_types = $scope.entity.group_types;
        });

    };
    $scope.getUser();

    $scope.updateUser = function () {

        delete $scope.entity.roles;


        User.update($stateParams.entityID, $scope.entity).then(function (result) {
            $scope.entity = result.data;
            $scope.change = false;
            sweetAlert.swal({
                title: "Update Successful!",
                html: "You've successfully updated the user",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                $rootScope.go('/admin/user/management');
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

    $scope.createNewDebtor = function () {
        $rootScope.go("/user/" + $stateParams.entityID + "/debtor/create");
    };

    $scope.createCompany = function () {
        $scope.companyCreate = true;
    };


    $scope.more = function (cvr, companyId) {
        $scope.hideChooseProperty = false;
        if ($scope.isActive === companyId) {
            $scope.hideChooseProperty = true;
        }
        var params = {cvr: cvr, id: companyId};
        var modalInstance = $modal.open({
            size: 'md',
            templateUrl: 'views/user/company/details.html',
            controller: 'UserCompanyDetailsController',
            resolve: {
                entity: function () {
                    return params;
                }
            }
        });

        modalInstance.result.then(function (companyId) {

            if (typeof companyId !== 'undefined') {
                $scope.selectedItem(companyId);
                $scope.chooseCompany(companyId);
            }

        }, function () {
        });

    };
    $scope.chooseCompany = function (id) {
        $scope.cvrFound = true;

        $scope.company = $scope.results[id];

    };


    $scope.back = function () {
        $scope.cvrFound = false;
    };
    $scope.company = {};

    $scope.selectedItem = function (id) {
        if (id === $scope.selectedResult) {
            $scope.selectedResult = 0;
            $scope.isActive = 0;
        }
        else {
            $scope.selectedResult = id;
            $scope.isActive = id;
        }
    };

    /*$scope.saveCompany = function() {
        $scope.company.user_id = $stateParams.entityID;
        $scope.company.k_number = '';
        if(!$scope.company.konto_no) {
            $scope.company.konto_no = '';
        }

        UserCompany.post($scope.company).then(function(result) {
            $scope.entity = result.data;

            sweetAlert.swal({
                title: "Create Successful!",
                html: "You've successfully updated the company",
                type: "success",
                confirmButtonText: "Ok"

            }, function ()
            {

            }).then(function () {
                $rootScope.go('/admin/user/management');
            });

        }, function (error)
        {
            sweetAlert.swal({
                title: "Error!",
                html: "Sorry unable to create company",
                type: "error",
                confirmButtonText: "Ok"
            }, function ()
            {
            });

        });

    };*/


    //
    // $scope.saveCompany = function() {
    //     $scope.company.user_id = $stateParams.entityID;
    //     $scope.company.k_number = '';
    //     if(!$scope.company.konto_no) {
    //         $scope.company.konto_no = '';
    //     }
    //     UserCompany.post($scope.entity).then(function (result) {
    //         $scope.entity = result.data;
    //
    //         sweetAlert.swal({
    //             title: "Create Successful!",
    //             html: "You've successfully updated the company",
    //             type: "success",
    //             confirmButtonText: "Ok"
    //
    //         }, function () {
    //
    //         }).then(function () {
    //             $rootScope.go('/admin/user/management');
    //         });
    //
    //     },function (error) {
    //         sweetAlert.swal({
    //             title: "Error!",
    //             html: "Sorry unable to create company",
    //             type: "error",
    //             confirmButtonText: "Ok"
    //         }, function ()
    //         {
    //         });
    //
    //     });
    //
    // };


    $scope.searching = false;
    $scope.pageIndex = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 20;
    $scope.itemsPerPage = 5;
    $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.totalItems = 0;
    $scope.isActive = 0;
    $scope.selectedResult = 0;
    $scope.companyTypes = null;
    $scope.searchTerm = {"name": ""};

    /*$scope.findCvr = function()
    {

        $scope.searching = true;

        CompanySearch.one($scope.searchTerm.name,$scope.pageIndex).getList().then(
            function (data)
            {
                $scope.searching = false;
                $scope.results = data.data.results;
                $scope.totalItems = data.data.totalCount;
            }
        );
    };*/


    var companySearch = "user_id:" + $stateParams.entityID;
    /*$scope.getCurrentCompany = function() {
        UserCompany.customGET('', {
            search : companySearch,
            orderBy: 'created_at',
            sortedBy: 'desc'
        }).then(function(result)
        {
            $scope.currentCompany = result.data.data[0];
            if($scope.currentCompany){
                $scope.companyExist = true;
                $scope.hideBack = true;
            }

        });

    };

    $scope.getCurrentCompany();*/


}