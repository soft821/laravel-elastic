function stopWatch()
{
    'use strict'
    return {
        restrict: 'AE',
        scope: {
            // Set title in the isolate scope from the title attribute on the directive's element.
            title: '@title',
            // Set up a bi-directional binding between currentTime on the local scope and the parent
            // scope's variable containing the current time that's the value of the time attribute.
            currentTime: '=time'
        },

        link: function (scope, element, attrs, ctrl) {
        },
        templateUrl: 'views/directives/stopWatch.html',
        controllerAs: 'swctrl',
        controller: function ($scope, $interval) {
            console.log("Creating the directive's controller");
            var self = this;
            var totalElapsedMs = 0;
            var elapsedMs = 0;
            //var time;
            var startTime;
            var timerPromise;

            self.start = function () {
                $scope.start = true;
                if (!timerPromise) {
                    startTime = new Date();
                    timerPromise = $interval(function () {
                        var now = new Date();
                        //$scope.time = now;
                        elapsedMs = now.getTime() - startTime.getTime();
                    }, 1000);
                }
            };

            self.stop = function () {
                $scope.start = false;
                if (timerPromise) {
                    $interval.cancel(timerPromise);
                    timerPromise = undefined;
                    totalElapsedMs += elapsedMs;
                    elapsedMs = 0;
                }
            };

            self.reset = function () {
                startTime = new Date();
                totalElapsedMs = elapsedMs = 0;
            };

            self.getTime = function () {
                return time;
            };

            self.getElapsedMs = function () {
                return Math.round((totalElapsedMs + elapsedMs) / 1000, 0);
            };
        }
    }


}