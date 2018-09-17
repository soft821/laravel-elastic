/**
 */
function PlacesController($scope, $rootScope, User, $stateParams, sweetAlert, Places, PlacesMap, PlacesIndex, mapboxglMapsData, debounce)
{

    $scope.parameters = {};
    $scope.filter = {
        maxLat: 64.8,
        maxLng: 44.7,
        minLat: 41.9,
        minLng: -54
    };


    $scope.filterObject = {
        limit: $scope.itemsPerPage,
        page: $scope.currentPage,
        search: $scope.searchTerm,
        orderBy: $scope.orderBy,
        sortedBy: $scope.sortedBy,
        filter: $scope.filter
    };
    $scope.loaded = false;

    $scope.entityName = 'places';
    $scope.pageIndex = 0;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.itemsPerPage = 20;
    $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.totalItems = 0;
    $scope.requireSubscription = false;

    $scope.sortedBy = 'asc';
    $scope.orderBy = 'place_id';
    $scope.sort = false;

    $scope.center = {lat: 55, lng: -5};
    $scope.loaded = false;


    $scope.tableHeaders = [
        {
            id: 1,
            db_name: 'name',
            label: 'name',
            lng_name: 'Name'
        },
        {
            id: 2,
            db_name: 'domain',
            label: 'domain',
            lng_name: 'Domain'
        },
        {
            id: 5,
            db_name: 'action',
            label: 'action',
            lng_name: 'Action'
        }

    ];

    $scope.glLayers = [
        {
            id: 'clusters',
            type: 'circle',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': {
                    property: 'point_count',
                    type: 'interval',
                    stops: [
                        [0, '#51bbd6'],
                        [100, '#f1f075'],
                        [750, '#f28cb1'],
                    ]
                },
                'circle-radius': {
                    property: 'point_count',
                    type: 'interval',
                    stops: [
                        [0, 20],
                        [100, 30],
                        [750, 40]
                    ]
                }
            }
        }, {
            id: 'cluster-count',
            type: 'symbol',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '',
                'text-size': 12
            }
        }, {
            id: 'unclustered-point',
            type: 'circle',
            source: 'earthquakes',
            filter: ['!has', 'point_count'],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 8,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ffffff'
            }
        }
    ];



    $scope.glHandlers = {
    };

    $scope.getOuterBounds = function () {
        var zoom = mapboxglMapsData.getMaps()[0].mapInstance.getZoom();
        var center = mapboxglMapsData.getMaps()[0].mapInstance.getCenter();
        var bounds = geoViewport.bounds([center.lng, center.lat], zoom, [1000, 400], 512);

        $scope.filter = {
            minLat: bounds[1],
            maxLat: bounds[3],
            minLng: bounds[0],
            maxLng: bounds[2]
        };

    };


    $scope.$on('mapboxglMap:load', debounce(function (angularEvent, obj) {
        $scope.getOuterBounds();
        $scope.getPlaces();
        mapboxglMapsData.getMaps()[0].mapInstance.getSource('earthquakes').setData($scope.markers);

    }, 2000));


    $scope.$on('mapboxglMap:move', debounce(function (angularEvent, obj) {
        $scope.getOuterBounds();
        $scope.getPlaces();
        mapboxglMapsData.getMaps()[0].mapInstance.getSource('earthquakes').setData($scope.markers);

    }, 2000));

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    $scope.$on('mapboxglMap:mousemove', function (angularEvent, e) {

        var features = mapboxglMapsData.getMaps()[0].mapInstance.queryRenderedFeatures(e.point, {
            layers: ['unclustered-point']
        });
        mapboxglMapsData.getMaps()[0].mapInstance.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
        if (!features.length) {
            popup.remove();
            return;
        }

        var feature = features[0];
        popup.setLngLat(feature.geometry.coordinates)
            .setHTML("<h2>" + feature.properties.name + "</h2>")
            .addTo(mapboxglMapsData.getMaps()[0].mapInstance);


    });

    $scope.$on('mapboxglMap:click', function (angularEvent, e) {
        debugger;
        var features = mapboxglMapsData.getMaps()[0].mapInstance.queryRenderedFeatures(e.point, {
            layers: ['unclustered-point']
        });

        var feature = features[0];

        $rootScope.go('/admin/places/edit/' + feature.properties.id);


    });



//
//    $scope.$on('mapboxglMap:move', debounce(function(angularEvent, obj) {
//        $scope.getOuterBounds();
//        $scope.getPlaceList();
//        $scope.getPlaces();
//    }, 2000));

    $scope.getPlaceList = function () {
        $scope.filterObject.page = $scope.currentPage;
        PlacesIndex.create($scope.filterObject).then(function (result) {

            $scope.result = result;
            var data = result.data;
            $scope.entities = data.data;

            $scope.totalItems = data.totalItems;
            $scope.currentPage = data.page;

        });
    };



    $scope.getPlaces = function () {
        $scope.filterObject = {
            limit: $scope.itemsPerPage,
            page: $scope.currentPage,
            search: $scope.searchTerm,
            orderBy: $scope.orderBy,
            sortedBy: $scope.sortedBy,
            filter: $scope.filter,
            additionalFilters: []
        };


        Object.keys($scope.parameters).forEach(function (key, index) {
            var template = {};

            template[key] = $scope.parameters[key];
            $scope.filterObject.additionalFilters[index] = template;


        });


        PlacesMap.create($scope.filterObject).then(function (result) {

            var data = result.data;

            $scope.places = data;
            var newArray = {};
            newArray.features = [];

            $scope.places.forEach(function(entity) {

                var geoObject = { geometry: {
                        coordinates: [entity.lng, entity.lat, 0],
                        type: "Point"
                    },
                    properties: {
                        id: entity.place_id,
                        name: entity.name
                    },
                    type: "Feature"
                };


                newArray.features.push(geoObject);

            });

            $scope.markers = newArray;

            $scope.glSources = [
                {
                    id: 'earthquakes',
                    type: 'geojson',
                    data: $scope.markers,
                    cluster: true,
                    clusterMaxZoom: 10,
                    clusterRadius: 30
                }
            ];


            $scope.getPlaceList();

            $scope.loaded = true;
        });




    };
    $scope.getPlaces();

    $scope.order = function (orderBy) {
        $scope.sort = true;
        $scope.orderBy = orderBy;

        if ($scope.sortedBy === 'desc') {
            $scope.sortedBy = 'asc';
        } else {
            $scope.sortedBy = 'desc';
        }

    };

    $scope.$watch('orderBy', function (newValue, oldValue) {
        if(newValue) {
            if(oldValue) {

                //$scope.getPlaces();
            }
        }
    });


    $scope.$watch('sortedBy', function (newValue, oldValue) {

        if(newValue) {
            if (oldValue) {

               // $scope.getPlaces();
            }
        }
    });

    $scope.delete = function (entity) {
        Places.remove(entity).then(function () {
            $scope.entity = null;
            $scope.getPlaces();
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

        });

    };


    $scope.moreDetails = function (entityID) {
        $rootScope.go("/admin/places/edit/" + entityID);

    };
    $scope.open = function () {
        $rootScope.go("/admin/places/create");
    };


}