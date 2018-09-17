'use strict';

function PaymentsManagementController(Payment, $scope, $rootScope)
{

    var EnitityRepository = Payment;


    Payment.getList().then(function (result) {
        $scope.entities = result.data;
        //console.log($scope.entities);

    });


};