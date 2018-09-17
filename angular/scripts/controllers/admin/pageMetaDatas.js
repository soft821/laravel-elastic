/**
 * Created by Admin on 1/10/2018.
 */
function PageMetaDatasController($scope, PageMetaData, $modal, $sce, $interval, $stateParams, SaveData, sweetAlert)
{

    $scope.metaData = [];
    $scope.editMetaValue = false;

    $scope.sortedBy = 'desc';
    $scope.orderBy = 'created_at';
    $scope.search = '';
    $scope.currentPage = 1;
    $scope.searchTerm = "";
    $scope.countDown = 30;
    $scope.itemsPerPage = 10;
    $scope.totalItems = 0;

    var refresh;
    var refreshSearch;
    var getEntitiesCalled = false;
    var searched = false;


    var getData = function () {
        getEntitiesCalled = true;
        $scope.getEntities();
    };
    var getDataSearch = function () {
        searched = false;
        $scope.getEntities();
    };

    $scope.getEntities = function () {

        PageMetaData.getList({
            limit: $scope.itemsPerPage,
            page: $scope.currentPage,
            search: $scope.searchTerm,
            orderBy: $scope.orderBy,
            sortedBy: $scope.sortedBy
        }).then(function (result) {
            var data = result.data;
            $scope.entities = data.data;
            for (var i = 0; i < $scope.entities.length; i++) {
                if ($scope.entities[i].meta_value) {
                    $scope.entities[i].htmlValue = $sce.trustAsHtml($scope.entities[i].meta_value.replace(new RegExp('\r\n\r\n', 'g'), "<br>"));
                } else {
                    $scope.entities[i].htmlValue = "";
                }

                $scope.entities[i].metaValueLimit = 150;
            }

            $scope.pages = $scope.entities.pages;
            $scope.totalItems = data.total;

            if (getEntitiesCalled === false) {
                $interval.cancel(refresh);
                refreshSearch = $interval(getData, 30000);
            }
            if (searched === true) {
                $interval.cancel(refresh);
                $scope.countDown = 30;
                $interval.cancel(refreshSearch);
                refresh = $interval(getDataSearch, 30000);
            }
        });
    };
    $scope.getEntities();


    $interval(function () {
        $scope.countDown--;
        if ($scope.countDown === 0) {
            $scope.countDown = 30;
        }
    }, 1000);

    $scope.showLessMetaValue = function (entity) {
        entity.showMoreText = false;
        entity.metaValueLimit = 150;
    };

    $scope.showMoreMetaValue = function (entity) {
        entity.showMoreText = true;
        entity.metaValueLimit = entity.htmlValue.length;
    };

    $scope.show = function (entity) {
        var modalInstance = $modal.open({
            size: 'md',
            templateUrl: 'views/user/showMetaDetails.html',
            controller: 'MetaDataDetailsController',
            resolve: {
                entity: function () {
                    return entity;
                }
            }
        });
        modalInstance.result.then(function () {
        }, function () {

        });
    };

    $scope.edit = function (entity) {
        $scope.editMetaValue = true;
    };

    $scope.cancel = function () {
        $scope.editMetaValue = false;
    };
    $scope.save = function () {

        SaveData.post({data: $scope.entities}).then(function (result) {
            sweetAlert.swal({
                title: "Update Successful!",
                html: "You've successfully updated the Document",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {
            }).then(function () {
            });
            $scope.editMetaValue = false;

        }, function (error) {
            sweetAlert.swal({
                title: "Unable to Update",
                html: error.data.message,
                type: "error",
                confirmButtonText: "Ok"

            }, function () {
            }).then(function () {
            });

        });

    };
    $scope.refresh = function () {
        $scope.getEntities();
        searched = true;
    };

}

