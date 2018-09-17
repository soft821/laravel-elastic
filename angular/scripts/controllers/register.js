function RegisterController($scope, $timeout, flash, User, $rootScope, $modal, $stateParams, AuthService, AUTH_EVENTS, sweetAlert)
{
    $scope.registerFlashMessage = false;
    $scope.registerFirst = true;
    $scope.registerSecond = false;
    $scope.fromCampaign = false;

    $scope.entity = {
        company_name: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        mobile: '',
        password: '',
        password_repeat: '',
    };

    $scope.goRegister = function (value) {

        if ($scope.entity) {
            $scope.registerFlashMessage = false;


            var modalWait = sweetAlert.swal({
                title: "Please wait.....",
                html: "We're creating your user",
                onOpen: function () {

                    sweetAlert.swal({
                        title: 'Success!',
                        html: "You've successfully registered",
                        type: "success",
                        confirmButtonText: "Ok"
                    }, function () {

                        $scope.signIn();
                    });


                    swal.showLoading();
                }
            });


            User.create($scope.entity).then(function (data, headers) {
                sweetAlert.swal.close();

                currentUser = data.data;
                $scope.passwordConfirm = '';
                $scope.signIn();
            }, function (error) {
                sweetAlert.swal.close();

                sweetAlert.swal({
                    title: "Error!",
                    html: "Sorry, but we're having trouble registering you.",
                    type: "error",
                    confirmButtonText: "Ok"
                }, function () {
                    $scope.fromCampaign = false;
                });


            });
        }

    };


    $scope.registerPrrevious = function () {
        $scope.registerFirst = true;
    };
    $scope.registerNext = function () {
        $scope.registerFirst = false;
        $scope.registerSecond = true;
    };
    if ($stateParams.entitytId) {
        $scope.entitytId = $stateParams.entitytId;
    }

    $scope.screenLoad = true;


    if ($stateParams.emailAddress) {
        $scope.entity.email = $stateParams.emailAddress;
        $scope.entity.username = $stateParams.emailAddress;

        $scope.fromCampaign = true;
        $scope.goRegister(0);
    }

    $rootScope.logo = true;


    $scope.passwordConfirm = '';
    $scope.saveCustomer = function (status, response) {
        if (!response.error) {
            $scope.entity.token = response.id;
            $scope.submit();
        } else
            if (response.error.code == 'invalid_expiry_year') {
                flash.error = response.error.message;
            } else
                if (response.error.code == 'invalid_expiry_month') {
                    flash.error = response.error.message;
                }
                else
                    if (response.error.code == 'incorrect_number') {
                        flash.error = response.error.message;
                    }

    };

    var EnitityRepository = User;

    $scope.countries = countriesList;
    $scope.term = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/termsAndCondition.html',
            controller: 'TermAndConditionController',
        });
        modalInstance.result.then(function (order) {
        }, function () {

        });
    };

    var cal = (100 / 6);
    $scope.registerPercentage = function () {
        $scope.screenLoad = false;
        $scope.registraterPageTotal = 0;
        if ($scope.entity.first_name !== "" && !angular.isUndefined($scope.entity.first_name)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.last_name !== "" && !angular.isUndefined($scope.entity.last_name)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.email !== "" && !angular.isUndefined($scope.entity.email)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.mobile !== "" && !angular.isUndefined($scope.entity.mobile)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.password !== "" && !angular.isUndefined($scope.entity.password)) {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }
        if ($scope.entity.password_confirmation !== "") {
            $scope.registraterPageTotal = $scope.registraterPageTotal + cal;
        }

        $scope.screenLoad = true;
    };

    var currentUser = {};


    $scope.signIn = function () {
        var credentials = {
            username: $scope.entity.email,
            password: $scope.entity.password,
            client_id: 2,
            client_secret: 'RX586LXPT8nFzNEQcwXYIvn7bzA9NLoYOKGiaikd',
            grant_type: 'password'
        };
        AuthService.login(credentials).then(function (user) {
            $rootScope.firstLogin = true;
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.dataLoading = false;
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.user = {
                username: '',
                password: ''
            };
            $scope.dataLoading = false;
        });
    };



}


function TermAndConditionController($scope, $modalInstance)
{
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}