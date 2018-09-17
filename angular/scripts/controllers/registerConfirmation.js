/**
 * Created by Anthony on 11/30/2015.
 */

'use strict';

function RegisterConfirmationController($scope, $stateParams, flash, $http, $window)
{


    if ($stateParams.code) {
        $scope.codeHash = $stateParams.code;
    }

    $scope.$parent.isLoginTemp = true;
    $scope.$parent.myAccount = false;

    $scope.goToLogin = function () {
        $window.open('/#/login', '_self');
    }

    $scope.confirmed = false;

    $scope.confirmCode = function () {
        if ($scope.codeHash) {
            /*   $http.defaults.headers.post['Content-Type'] = 'application/json';*/

            /*  var confirmation_code = "activation_code=" +$scope.codeHash;*/

            var confirmation_code = {activation_code: $scope.codeHash};

            $http.post(dbSever + 'activateUser', confirmation_code
            )
                .success(function (data, status, headers, config) {

                    flash.success = 'Successfully confirmed your account!';
                    $scope.confirmed = true;
                })
                .error(function (data, status, headers, config) {

                    flash.error = 'Your confirmation key is wrong. Please check your email and try again.';
                });
        }
    }
}
