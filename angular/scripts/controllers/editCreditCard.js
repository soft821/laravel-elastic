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