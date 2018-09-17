function calendar()
{
    'use strict'
    return {
        replace: false,
        restrict: "E,A",
        transclude: true,
        scope: {
            name: '='
        },


        template: '<div id="calendar"></div>',
        link: function (scope, element, attrs) {
            // console.log();
            $('#calendar').fullCalendar({
                defaultView: 'listWeek',

                // customize the button names,
                // otherwise they'd all just say "list"
                views: {
                    listDay: {buttonText: 'list day'},
                    listWeek: {buttonText: 'list week'},
                    listMonth: {buttonText: 'list month'}
                },

                header: {
                    left: 'title',
                    center: '',
                    right: 'listDay,listWeek,listMonth'
                },
                events: scope.calendarObjects


            })


        }
    }


}