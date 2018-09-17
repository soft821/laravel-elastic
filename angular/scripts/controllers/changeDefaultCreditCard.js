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