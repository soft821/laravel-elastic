'use strict';

function RoleUserController(RoleUser, $scope, $rootScope)
{

    var EnitityRepository = RoleUser;


    RoleUser.getList().then(function (result) {
        $scope.entities = result.data;
        console.log($scope.entities);

    });

}