function RegisterByInviteController(ClientCreateStripe, ClientInformation, ClientConfirmPassword, ClientConfirm, $scope, $timeout, flash, UserCreate, $rootScope, $modal, $locale, $stateParams, UserRepository, AuthService, AUTH_EVENTS, sweetAlert)
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


    $scope.getCredentialsByCode = function () {
        var confirm = {code: $stateParams.code}
        ClientInformation.getList(confirm).then(function (result) {
            $scope.credentials = result.data;


        });
    }
    $scope.cardValidation = function () {
        console.log('CARD VALID');
    }
    $scope.credentialsValidation = function () {
        console.log('CREDENTIALS VALID');
    }
    $scope.passwordValidation = function () {
        console.log('PASSWORD VALID');
    }

    $scope.stepChanging = function (event, currentIndex, newIndex) {

        if (currentIndex == 0) {

            $scope.cardValidation();
        }

        if (currentIndex == 1) {

            $scope.credentialsValidation();
        }
        if (currentIndex == 2) {

            $scope.passwordValidation();
        }
    }

    $scope.stepFinishing = function (event, currentIndex, newIndex) {


        if (currentIndex == 2) {

            $scope.addClient();


        }


    }

    $scope.getCredentialsByCode();


    $scope.addStripe = function () {

        var confirm = {
            code: $stateParams.code,

        };

        ClientCreateStripe.create(confirm).then(function (result) {
            confirm = result.data;
            sweetAlert.swal({
                title: "Success",
                html: "",
                type: "success",
                confirmButtonText: "Ok"
            }, function () {
            });
        }, function (error) {

            sweetAlert.swal({
                title: "Error",
                html: "",
                type: "error",
                confirmButtonText: "Ok"
            }, function () {
            });
        })

    }


    $scope.addClient = function (email, first_name, last_name, mobile, password, password_confirmation) {


        var confirm = {

            email: $scope.entity.email,
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            mobile: $scope.mobile,
            password: $scope.client.password,
            password_confirmation: $scope.client.passwordConfirm,
            code: $stateParams.code
        }


        ClientConfirm.create(confirm).then(function (result) {

            confirm = result.data;
            sweetAlert.swal({
                title: " You have registered!",
                html: "Your account has been created!       ",
                type: "success",
                confirmButtonText: "Ok"
            }, function () {
            });
            $scope.signIn();

        }, function (error) {

            sweetAlert.swal({
                title: "Error",
                html: "Sorry, but we're having trouble registering you.",
                type: "error",
                confirmButtonText: "Ok"
            }, function () {
            });
        });


    }


    // }


    $scope.goRegister = function (value) {

        if ($scope.entity) {
            $scope.registerFlashMessage = false;
            var password = $rootScope.makeId(8);
            $scope.entity.password = password;
            $scope.entity.password_confirmation = password;


            var modalWait = sweetAlert.swal({
                title: "Please wait.....",
                html: "We're creating your user",
                onOpen: function () {
                    swal.showLoading();
                }
            });


            UserRepository.post($scope.entity).then(function (data, headers) {
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
            $scope.addStripe();

        } else
            if (response.error.code == 'invalid_expiry_year') {
                sweetAlert.swal({
                    title: "Error",
                    html: "Sorry, but we're having trouble adding your card",
                    type: "error",
                    confirmButtonText: "Ok"
                }, function () {
                });
            } else
                if (response.error.code == 'invalid_expiry_month') {
                    sweetAlert.swal({
                        title: "Error",
                        html: "Sorry, but we're having trouble adding your card",
                        type: "error",
                        confirmButtonText: "Ok"
                    }, function () {
                    });
                }
                else
                    if (response.error.code == 'incorrect_number') {
                        sweetAlert.swal({
                            title: "Error",
                            html: "Sorry, but we're having trouble adding your card",
                            type: "error",
                            confirmButtonText: "Ok"
                        }, function () {
                        });
                    }

    };


    var EnitityRepository = UserCreate;

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
            password: $scope.client.password,
            client_id: 9,
            client_secret: 'acmvofDnPVmMTkeV8uSPyUR4I78Bpa3zp9lSol1J',
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


    function TermAndConditionController($scope, $modalInstance)
    {
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
}