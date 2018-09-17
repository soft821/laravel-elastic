function ContactsController($scope, Contacts, sweetAlert)
{
    $scope.popup1 = {opened: false};
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.submitContact = function () {
        if ($scope.entity) {


            Contacts.create($scope.entity).then(function (data, headers) {
                if ($scope.entity.date) {
                    $scope.entity.date = null;
                }

                $scope.entity = null;

                var success = 'SuccessFully Submitted';
                // $rootScope.successMessage("",success);
                sweetAlert.swal({
                    title: "Successful Submitted!",
                    html: "You've successfully submitted the contact info",
                    type: "success",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {

                });
                // $window.open('/#/userManagement', '_self');

            }, function (error) {
                sweetAlert.swal({
                    title: "Unable to submit",
                    html: error.data.message,
                    type: "error",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    //$rootScope.go('userManagement');
                });
            });
        }
    };
}