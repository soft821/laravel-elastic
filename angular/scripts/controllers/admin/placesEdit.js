function PlacesEditController($scope, $stateParams, Places, sweetAlert, $rootScope, $sce, $modal)
{
    $scope.entityName = "places";
    $scope.entitiesName = "places";
    $scope.confirm = false;
    $scope.change = false;
    $scope.update = true;
    $rootScope.createCases = true;
    $scope.companyExist = false;
    $scope.hideBack = true;
    $scope.sortedBy = 'desc';
    $scope.orderBy = 'created_at';
    $scope.currentPage = 1;
    $scope.itemsPerPage = 15;
    $scope.totalItems = 0;

    function createElement(icon)
    {
        var marker = document.createElement('div');
        marker.style.backgroundImage = "url(" + icon.iconUrl + ")";
        marker.style.backgroundSize = icon.iconSize[0] + "px " + icon.iconSize[1] + "px";
        marker.style.width = icon.iconSize[0] + "px";
        marker.style.height = icon.iconSize[1] + "px";
        marker.style.marginLeft = "-" + Math.floor(icon.iconSize[0] / 2) + "px";
        marker.style.marginTop = "-" + Math.floor(icon.iconSize[1] / 2) + "px";
        marker.id = "marker";


        return marker;
    }


    $scope.getPlace = function () {
        Places.get($stateParams.entityID).then(function (result) {
            $scope.entity = result.data;



            $scope.center = {lat:$scope.entity.lat, lng:$scope.entity.lng};
            $scope.marker = {
                coordinates: [$scope.entity.lng, $scope.entity.lat],
                element: createElement({
                    iconSize: [100, 100],
                    iconUrl: "https://cdn.icon-icons.com/icons2/317/PNG/128/map-marker-icon_34392.png"
                })
            };

            debugger;


        });

    };
    $scope.getPlace();

    $scope.updatePlace = function () {


        Places.update($stateParams.entityID, $scope.entity).then(function (result) {
            $scope.entity = result.data;
            $scope.change = false;
            sweetAlert.swal({
                title: "Update Successful!",
                html: "You've successfully updated the Place",
                type: "success",
                confirmButtonText: "Ok"

            }, function () {

            }).then(function () {
                $rootScope.go('/admin/user/Place');
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


}