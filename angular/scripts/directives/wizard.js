function wizard()
{
    return {
        restrict: 'EA',
        scope: {
            stepChanging: '='
        },
        compile: function (element, attr) {
            element.steps({
                bodyTag: attr.bodyTag
            });

            return {
                //pre-link
                pre: function () {
                },
                //post-link
                post: function (scope, element) {
                    element.on('stepChanging', scope.stepChanging);
                }
            };
        }
    };
}


