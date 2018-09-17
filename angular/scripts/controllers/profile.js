/**
 * @desc controller that show profile of current user
 * @param $scope, flash, $sce, fileReader, $rootScope, UserRepository, GetEmail, MailingRepository, PhoneVerify, PhoneVerifyCode, GetVerificationNumber
 * @return
 */
'use strict';

function ProfileController(USER_ROLES, $scope, flash, $sce, fileReader, $rootScope, UserRepository, User)
{
    // show profile to update contact
    $scope.profileShow = true;
    $scope.password_change = false;
    $scope.passwordConfirm = '';
    $scope.userRoles = USER_ROLES;
    $scope.hidePic = true;
    $scope.dataLoading = false;
    $scope.hideProfilePic = false;

    /**
     * @desc edit the profile details of current user
     * @param
     * @return
     */
    $scope.contactEdit = function () {
        // update profile
        $scope.profileShow = false;
    };

    /**
     * @desc get current users details
     * @param
     * @return
     */
    $scope.getUsers = function () {
        User.get($scope.currentUser.id).then(function (result) {
            $scope.entity = result.data;

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

    /**
     * @desc after make changes save user details
     * @param
     * @return
     */
    $scope.save = function () {

        $scope.dataLoading = true;
        if ($scope.entity) {
            $scope.entity.picture = $scope.entity.file;

            $scope.entity.password_confirmation = $scope.passwordConfirm;
            $scope.entity.password_change = $scope.password_change;

            debugger;
            User.customPUT('', $scope.entity).then(function (data) {

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

    /**
     * @desc cancel update user details
     * @param
     * @return
     */
    $scope.cancel = function () {
        $rootScope.go("products");
    };

    $scope.visible = true;
    $scope.verification = true;
    $scope.error = null;
    $scope.entity = {};


    /**
     * @desc change the verificaiton number
     * @param
     * @return
     */
    $scope.change = function () {
        $scope.visible = false;
    };

    /**
     * @desc back to previous page
     * @param
     * @return
     */
    $scope.back = function () {
        if ($scope.isAuthorized($scope.userRoles.consumer)) {
            $rootScope.go('myProperties');
        } else
            if ($scope.isAuthorized($scope.userRoles.buyer)) {
                $rootScope.go('propertyOffers');
            }
            else
                if ($scope.isAuthorized($scope.userRoles.admin)) {
                    $rootScope.go('lender');
                }
        // $scope.profileShow = !$scope.profileShow;
        // $scope.entity.file = "";
        // angular.element("input[type='file']").val(null);
    };
}
