function touchSpin()
{
    'use strict'
    return {
        restrict: "E,A",
        link: function (scope, element, attrs) {
            $(".touchspin1").TouchSpin({
                buttondown_class: 'btn btn-white',
                buttonup_class: 'btn btn-white'
            });

        }
    }


}