smartApp
    .factory('PaymentMethodDetailsByCustomer', function (Restangular) {
        return Restangular.allUrl('getPaymentMethodDetailsByCustomer');
    })//get all credit cards with details of cards

    .factory('UpdateCreditCardDetails', function (Restangular) {
        return Restangular.allUrl('updateCreditCardDetails');
    })//update details of credit card
    .factory('SaveBillingExpire', function (Restangular) {
        return Restangular.allUrl('saveBillingExpire');
    })//subscribe user to stripe
    .factory('SaveBillingExpireBuyer', function (Restangular) {
        return Restangular.allUrl('saveBillingExpireBuyer');
    })//subscribe buyer to stripe
    .factory('CreateCreditCard', function (Restangular) {
        return Restangular.allUrl('createCreditCard');
    })//add a credit card
    .factory('CardDetails', function (Restangular) {
        return Restangular.allUrl('cardDetails');
    })//get details of a card
    .factory('SetDefaultCard', function (Restangular) {
        return Restangular.allUrl('setDefaultCard');
    })//set a card as default paying card
    .factory('DeleteCard', function (Restangular) {
        return Restangular.allUrl('deleteCard');
    })//delete a card  from stripe


    




    

    