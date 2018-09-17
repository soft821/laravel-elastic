function clockPicker()
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.clockpicker({
                beforeDone: function () {
                    console.log("before done");
                }
            });
        }
    };
}