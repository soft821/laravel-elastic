function datePicker()
{
    'use strict'
    return {
        replace: false,
        restrict: "E,A",
        templateUrl: 'views/directives/datePicker.html',
        link: function (scope, element, attrs) {
            $('#data_1 .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: true,
                forceParse: true,
                calendarWeeks: true,
                autoclose: true
            });

        }
    }


}