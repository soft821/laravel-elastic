function BillingInfoController(SaveBillingExpire, PaymentMethodDetailsByCustomer, $modal, UserRepository, GetBillingData, SaveBillingData, $scope, flash, $rootScope, $locale)
{
    // customer's credit card is saved
    $scope.trial = false;

    $scope.entity = {};

    /**
     * @desc save customer in stripe
     * @param status, response
     * @return
     */
    $scope.paymentMethodDetails = {};
    $scope.saveCustomer = function (status, response) {
        if (!response.error) {
            $scope.paymentMethodDetails.token = response.id;
            $scope.submit();
        } else
            if (response.error.code) {
                flash.error = response.error.message;
            }
    };

    /**
     * @desc save credit card details
     * @param
     * @return
     */
    $scope.submit = function () {
        $scope.isLoading = true;
        if ($scope.paymentMethodDetails) {

            $scope.paymentMethodDetails.group_id = 2;

            SaveBillingExpire.post($scope.paymentMethodDetails).then(function (data, headers) {

                UserRepository.get($scope.currentUser.id).then(function (result) {
                    var user = result;
                    user.city = $scope.currentUser.city;
                    user.address_line_1 = $scope.currentUser.address_line_1;
                    user.address_line_2 = $scope.currentUser.address_line_2;
                    user.state = $scope.currentUser.state;

                    UserRepository.update(user).then(function (data) {
                        var success = 'Thanks. Successfully Saved.';
                        $rootScope.successMessage("", success);
                        $scope.passwordConfirm = '';
                        $scope.paymentMethodDetails = null;
                        $scope.getPaymentMethodDetails();
                        $scope.isLoading = false;
                    }, function (error) {
                        $rootScope.errorMessage(error, "delete");
                        $scope.isLoading = false;
                    });
                });

            }, function (error) {
                $rootScope.errorMessage(error, "delete");
                $scope.isLoading = false;
            });
        }
    };

    /**
     * @desc get credit card details of the user
     * @param
     * @return
     */
    $scope.getPaymentMethodDetails = function () {
        // when loading
        $scope.isLoading = true;

        PaymentMethodDetailsByCustomer.customGET('', {}).then(function (result) {
            $scope.paymentMethodDetails = result;

            if ($scope.paymentMethodDetails) {
                $scope.trial = true;
            } else {
                $scope.trial = false;
            }
            $scope.isLoading = false;
        }, function (error) {
            $scope.isLoading = false;
        });
    };
    $scope.getPaymentMethodDetails();

    /**
     * @desc update credit card details of the user
     * @param entity
     * @return entity
     */
    $scope.updateModal = function (entity) {
        $scope.isModelOpen = true;
        var modalInstance = $modal.open({
            templateUrl: 'views/editCreditCard.html',
            controller: 'EditCreditCardController',
            backdrop: 'static',
            resolve: {
                entity: function () {
                    return entity;
                }
            }

        });
        modalInstance.result.then(function () {
            $scope.isModelOpen = false;
            $scope.getPaymentMethodDetails();

        }, function () {
            $scope.isModelOpen = false;
        });
    };

    /**
     * @desc update a credit card in stripe into default payment method
     * @param
     * @return
     */
    $scope.changeDefaultModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/changeDefaultCreditCard.html',
            controller: 'ChangeDefaultCreditCardController',
            // when clicking outside of modal disable closing the modal
            backdrop: 'static',


        });
        modalInstance.result.then(function () {
            // after modal closing get updated credit cards
            $scope.getPaymentMethodDetails();

        }, function () {

        });
    };

    /**
     * @desc open modal for delete credit card and its details
     * @param
     * @return
     */
    $scope.deleteCard = function (entity) {
        var modalInstance = $modal.open({
            templateUrl: 'views/deleteCard.html',
            controller: 'DeleteCardController',
            // when clicking outside of modal disable closing the modal
            backdrop: 'static',

            resolve: {
                entity: function () {
                    // entity is the credit card id. This is passed to modal
                    return entity;
                }
            }


        });
        modalInstance.result.then(function () {

            $scope.getPaymentMethodDetails();

        }, function () {

        });
    };
}


/**
 * @desc edit credit card details of the user
 * @param $scope, $modalInstance, PaymentMethodDetailsByCustomer, UpdateCreditCardDetails, $rootScope, CreateCreditCard, flash, CardDetails, entity
 * @return
 */
function EditCreditCardController($scope, $modalInstance, PaymentMethodDetailsByCustomer, UpdateCreditCardDetails, $rootScope, CreateCreditCard, flash, CardDetails, entity)
{
    // before save button clicked
    $scope.saveChange = true;

    // credit card id
    $scope.card_id = entity;

    // show hide edit credit card and enter new credit card
    $scope.edit = 0;

    // if there is no credit card then add new
    if (entity == null) {
        $scope.edit = 1;

        // make default is used for setting a credit card as default credit card
        $scope.paymentMethodDetails = {makeDefault: false};
    }
    else {
        // show edit credit card form
        $scope.edit = 0;
    }

    /**
     * @desc get credit card details of the user
     * @param
     * @return
     */
    $scope.getPaymentMethodDetails = function () {
        // when loading
        $scope.isLoading = true;

        // get details of the selected credit card
        CardDetails.customGET('', {card_id: $scope.card_id}).then(function (result) {
            $scope.paymentMethodDetails = result.data;
            var exp_month = '' + $scope.paymentMethodDetails.exp_month;
            if (exp_month.length == 1) {
                exp_month = '0' + exp_month;
                $scope.paymentMethodDetails.exp_month = exp_month;

            }
            // loading is over
            $scope.isLoading = false;
        }, function (error) {

        });

    };

    $scope.getPaymentMethodDetails();
    // wait after loading
    $scope.isLoading_save = false;

    /**
     * @desc save customer in stripe
     * @param status, response
     * @return
     */
    $scope.saveCustomer = function (status, response) {

        if (!response.error) {
            $scope.token = response.id;
            $scope.submit();
        } else
            if (response.error.code == 'invalid_expiry_year') {
                flash.error = response.error.message;
            } else
                if (response.error.code == 'invalid_expiry_month') {
                    flash.error = response.error.message;
                } else
                    if (response.error.code == 'incorrect_number') {
                        flash.error = response.error.message;
                    }

        /* else if(response.error){
         flash.error = 'Unable to Create an account' + errorMsg;
         }*/
    };

    /**
     * @desc save credit card details
     * @param
     * @return
     */
    $scope.submit = function () {
        // show loading screen when saving customer in stripe
        $scope.isLoading_save = true;

        // store the card details
        var storeCardDetails = {
            customer_id: $scope.paymentMethodDetails.customer,
            card_id: $scope.paymentMethodDetails.card_id,
            stripeToken: $scope.token,

            // this has  1 and 0 values. They are used to make credit card as default payment credit card or not.
            makeDefault: $scope.paymentMethodDetails.makeDefault
        };

        // add a credit card
        CreateCreditCard.post(storeCardDetails).then(function (data, headers) {

            var success = 'Successfully added the credit card';
            $rootScope.successMessage("", success);
            $scope.isLoading_save = false;
            $modalInstance.close();
        }, function (error) {
            $scope.isLoading_save = false;
            $rootScope.errorMessage(error, "Unable to update the card details!");

        });

    };

    /**
     * @desc update a credit card in stripe
     * @param
     * @return
     */
    $scope.save = function () {
        $scope.saveChange = false;
        // when show loading screen
        $scope.isLoading = true;

        var updateDetails = {
            customer_id: $scope.paymentMethodDetails.customer,
            card_id: $scope.paymentMethodDetails.card_id,
            last4: $scope.paymentMethodDetails.last4,
            exp_month: $scope.paymentMethodDetails.exp_month,
            exp_year: $scope.paymentMethodDetails.exp_year
        };
        if (updateDetails) {
            UpdateCreditCardDetails.post(updateDetails).then(function (data, headers) {//update credit card
                var success = 'successfully updated';
                $rootScope.successMessage("", success);
                $modalInstance.close();

            }, function (error) {
                // failure
                //$rootScope.errorMessage("Unable to update the card details!");
                flash.error = "Unable to update the card details!";
                $scope.isLoading = false;
                $scope.saveChange = true;
                // $scope.isLoading_save = false;
                //$rootScope.errorMessage(error, "Unable to update the card details!");
            });
        }

    }


    $scope.cancel = function () {
        // close modal
        $modalInstance.dismiss('cancel');
    };
}

/**
 * @desc controller for update a credit card in stripe into default payment method
 * @param
 * @return
 */
function ChangeDefaultCreditCardController($scope, $rootScope, $modalInstance, PaymentMethodDetailsByCustomer, SetDefaultCard)
{
    // used to disable save and cancel button after save button clicked
    $scope.saveChange = true;
    $scope.default = "";

    /**
     * @desc get credit card details of the user
     * @param
     * @return
     */
    $scope.getPaymentMethodDetails = function () {
        // show loading animation
        $scope.isLoading = true;

        // get all cards,of user, with details
        PaymentMethodDetailsByCustomer.customGET('', {}).then(function (result) {
            $scope.paymentMethodDetails = result.cards;

            for (var i = 0; i < $scope.paymentMethodDetails.length - 1; i++) {

                if ($scope.paymentMethodDetails[i].default == 1) {

                    // card id of the default card
                    $scope.default = $scope.paymentMethodDetails[i].card_id;
                }


            }

            if ($scope.paymentMethodDetails) {
                // if there is already added cards
                $scope.trial = true;
            } else {
                // if there is no added cards show add new card form
                $scope.trial = false;
            }
            $scope.isLoading = false;
        }, function (error) {
            $scope.isLoading = false;
        });
    };
    $scope.getPaymentMethodDetails();

    /**
     * @desc this method is called after selecting a card as default card
     * @param card_id
     * @return
     */
    $scope.changeDefault = function (card_id) {
        $scope.default = card_id;
    };

    $scope.cancel = function () {
        // close modal
        $modalInstance.dismiss();
    };

    /**
     * @desc save as default card
     * @param
     * @return
     */
    $scope.save = function () {
        if ($scope.default != null && $scope.default != "") {
            // show loading
            $scope.isLoading = true;
            // disable save and cancel buttons
            $scope.saveChange = false;
            // set card as default paying card
            SetDefaultCard.post({card_id: $scope.default}).then(function (data, headers) {


                var success = 'Successfully changed default credit card';
                $rootScope.successMessage("", success);

                $modalInstance.close();

            }, function (error) {
                $rootScope.errorMessage(error, "delete");
            });
        }
    }


}

/**
 * @desc controller for delete card and its details
 * @param
 * @return
 */
function DeleteCardController($scope, entity, DeleteCard, $rootScope, $modalInstance)
{
    // id of card going to delete
    $scope.entity = entity;

    $scope.isLoading_delete = false;
    $scope.deleteEntity = function () {
        // delete card
        $scope.isLoading_delete = true;
        DeleteCard.post({card_id: $scope.entity}).then(function (data, headers) {


            var success = 'Successfully Deleted the Card';
            $rootScope.successMessage("", success);

            $modalInstance.close();
            $scope.isLoading_delete = false;
        }, function (error) {
            $scope.isLoading_delete = false;
            $rootScope.errorMessage(error, "delete");
        });

    };

    /**
     * @desc close modal
     * @param
     * @return
     */
    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}
