function stripeConnect()
{
    return {
        scope: true,
        restrict: "E,A",
        link: function (scope, element, attrs) {

            $('#currency').change(function () {
                $('#routing_number_div').show();
                $('#account_number_label').text('Account Number').next('input').attr('placeholder', '');
                $('#routing_number').attr('data-stripe', 'routing_number');
                switch (this.value) {
                    case "usd":
                        $('#routing_number_label').text('Routing Number').next('input').attr('placeholder', '111000000');
                        break;
                    case "eur":
                        // No routing number needed
                        $('#routing_number_div').hide();
                        $('#routing_number').removeAttr('data-stripe');
                        $('#account_number_label').text('IBAN').next('input').attr('placeholder', 'XX9828737432389');
                        break;
                    case "cad":
                        $('#routing_number_label').text('Transit & Institution Number');
                        break;
                    case "gbp":
                        $('#routing_number_label').text('Sort Code').next('input').attr('placeholder', '12-34-56');
                        break;
                    case "mxn":
                        $('#routing_number_label').text('CLABE');
                        break;
                    case 'aud':
                    case "nzd":
                        $('#routing_number_label').text('BSB').next('input').attr('placeholder', '123456');
                        break;
                    case 'sgd':
                    case "jpy":
                    case "brl":
                    case "hkd":
                        $('#routing_number_label').text('Bank / Branch Code');
                        break;
                }
            });

        }
    }


}

