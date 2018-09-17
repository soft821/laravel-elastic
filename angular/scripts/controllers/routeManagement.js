function RouteManagementController($scope, $rootScope, AllRoutes, AddRemovePermissionToRole)
{


    var getEntities = function () {

        AllRoutes.customGET('', {}).then(function (data, headers) {
            $scope.entities = data;
        }, function (error) {

        });
    };
    getEntities();

    $scope.update = function (entity, route) {
        var permissionId = 0;
        if (route.permissionId) {
            permissionId = route.permissionId;
        }
        var params = {roleId: entity.id, permissionId: permissionId, permission: route.permission, name: route.name};
        AddRemovePermissionToRole.post(params).then(function (data) {
            var success = 'Successfully updated';
            $rootScope.successMessage("", success);
        }, function (error) {
            $rootScope.errorMessage(error, "update");
        });
    };
}


/*
'use strict';
function RouteManagementController(USER_ROLES,$scope,$rootScope,AllRoutes,AddRemovePermissionToRole, flash, $sce, fileReader, $rootScope, UserRepository, GetEmail, MailingRepository, PhoneVerify, PhoneVerifyCode, GetVerificationNumber) {
    // show profile to update contact
    $scope.profileShow = true;
    $scope.password_change = false;
    $scope.passwordConfirm = '';
    $scope.userRoles = USER_ROLES;
    $scope.hidePic = true;
    $scope.dataLoading = false;
    $scope.hideProfilePic = false;

  
    $scope.contactEdit = function () {
        // update profile
        $scope.profileShow = false;
    };

    
    $scope.getUsers = function () {
        UserRepository.get($scope.currentUser.id).then(function (result) {
            $scope.entity = result;

             // if(!$scope.$$phase){
             //    $scope.$apply(function () {
                    $scope.$parent.currentUser.avatar = $scope.entity.avatar;
                    $scope.$parent.currentUser.first_name = $scope.entity.first_name;

             //        //  $scope.$apply();
             //    });
             // }

            $scope.hideProfilePic = true;

        }, function (error) {
            $rootScope.errorMessage(error, "update");
        });
    };
    $scope.getUsers();

   
    $scope.getEntities = function () {
        // get all emails or message sent to an user
        GetEmail.customGET('', {}).then(function (result) {

            $scope.mailing = result.data;

            for (var i = 0; i < $scope.mailing.length; i++) {
                if ($scope.mailing[i].marketing_type == 'EMAIL_1_DAY') {
                    $scope.mailing[i].message = 'Send Email Before One Day';
                } else if ($scope.mailing[i].marketing_type == 'EMAIL_1_WEEK') {
                    $scope.mailing[i].message = 'Send Email Before One Week';
                } else if ($scope.mailing[i].marketing_type == 'EMAIL_1_MONTH') {
                    $scope.mailing[i].message = 'Send Email Before One Month';
                } else if ($scope.mailing[i].marketing_type == 'ALERT_1_DAY') {
                    $scope.mailing[i].message = 'Send Message Before One Day'
                } else if ($scope.mailing[i].marketing_type == 'ALERT_1_WEEK') {
                    $scope.mailing[i].message = 'Send Message Before One Week';
                } else if ($scope.mailing[i].marketing_type == 'ALERT_1_MONTH') {
                    $scope.mailing[i].message = 'Send Message Before One Month';
                }


            }

            for (var i = 0; i < $scope.mailing.length; i++) {
                if ($scope.mailing[i].is_enabled == 1) {
                    $scope.mailing[i].is_enabled = true;
                } else if ($scope.mailing[i].is_enabled == 0) {
                    $scope.mailing[i].is_enabled = false;
                }

            }

        }, function (error) {
        });
    };
    $scope.getEntities();

   
    $scope.updateOnOff = function (mail) {

        if (mail) {

            MailingRepository.get(mail.id).then(function (result, headers) {

                result.is_enabled = mail.is_enabled;

                MailingRepository.update(result).then(function (data, headers) {
                    var success = 'Successfully Updated';
                    $rootScope.successMessage("", success);
                }, function (error) {
                    $rootScope.errorMessage(error, "update");
                });
            }, function (error) {
                $rootScope.errorMessage(error, "update");
            });
        }
    };

    $scope.editing = false;


    if ($scope.$parent.currentUser.website) {
        $scope.$parent.currentUser.is_website = true;
    }


    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function (result) {
                $scope.imageSrc = result;
            });
    };

    $scope.path = '';
    $scope.countries = countriesList;


    $scope.save = function () {

        $scope.dataLoading = true;
        if ($scope.entity) {
            $scope.entity.picture = $scope.entity.file;

            $scope.entity.password_confirmation = $scope.passwordConfirm;
            $scope.entity.password_change = $scope.password_change;
            UserRepository.update($scope.entity).then(function (data) {

                $scope.newPassword = '';
                $scope.password_change = false;
                flash.success = 'Successfully Updated Profile';

                // $scope.$parent.setCurrentUser();
                $scope.getUsers();
                $scope.entity.file = data.user.file;
                $scope.entity.profile_pic = data.user.file;
                $scope.hidePic = false;
                $scope.dataLoading = false;


            }, function (error) {
                $scope.errorMessage(error, "delete");

            });
        }
    };


    $scope.cancel = function () {
        $rootScope.go("products");
    };

    $scope.visible = true;
    $scope.verification = true;
    $scope.error = null;
    $scope.entity = {};


    $scope.verify = function () {
        var params = {number: $scope.entity.phoneNumber};
        PhoneVerify.post(params).then(function (data, headers) {
            $scope.code = data.data;
            $scope.verification = false;
            $scope.error = null;

            $scope.entity = null;
        }, function (error) {
            // $rootScope.errorMessage(error, "Unable to update the card details!");
            $scope.error = "Please Enter the Correct Number";
            $scope.verification = true;
        });
    }


    $scope.verifyCode = function () {
        var params = {code: $scope.entity.verifyCode};
        PhoneVerifyCode.post(params).then(function (data, headers) {
            var success = 'Successfully verified your number';
            $rootScope.sweetAlert("Verified", success, "success");
            $scope.visible = true;
            $scope.verification = true;
            $scope.getVerification();
            $scope.entity = null;

        }, function (error) {
            // $rootScope.errorMessage(error, "Unable to update the card details!");
            $scope.notverifiedNumbrer = "please Enter the Correct Code";

        });
    }


    $scope.getVerification = function () { //get properties of user

        GetVerificationNumber.customGET('', {}).then(function (result) {
            $scope.verifyNumber = result.data;
            $scope.visible = true;
        }, function (error) {
            $scope.visible = false;
        });
    };
    $scope.getVerification();


    $scope.change = function () {
        $scope.visible = false;
    };


    $scope.back = function () {
        if ($scope.isAuthorized($scope.userRoles.consumer)) {
            $rootScope.go('myProperties');
        } else if ($scope.isAuthorized($scope.userRoles.buyer)) {
            $rootScope.go('propertyOffers');
        }
        else if ($scope.isAuthorized($scope.userRoles.admin)) {
            $rootScope.go('lender');
        }
        // $scope.profileShow = !$scope.profileShow;
        // $scope.entity.file = "";
        // angular.element("input[type='file']").val(null);
    };
}
*/