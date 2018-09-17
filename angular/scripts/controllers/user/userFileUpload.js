function UserFileUploadController($rootScope, $scope, $modalInstance, $http, sweetAlert, $store)
{

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
    $scope.entity = {"file_name": ""};
    $scope.dataLoading = false;
    $scope.ok = function () {
        $scope.dataLoading = true;
        var file = $scope.myFile;
        var fd = new FormData();
        fd.append('file', file);
        fd.append('user_id', $scope.user_id);
        fd.append('file_name', $scope.entity.file_name);
        var uploadUrl = dbSever + "user/file/upload/single";
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined, 'Authorization': 'Bearer' + $store.get('access_token')}
        })
            .success(function (data) {
                $scope.dataLoading = false;
                $modalInstance.close();
                sweetAlert.swal({
                    title: "Thank You!",
                    html: "Your file has been uploaded successfully. As soon as the file is ready for use, the status on the dashboard will be updated.",
                    type: "success",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {

                    $rootScope.go('/user/dashboard');
                });

            })
            .error(function (error) {
                $scope.dataLoading = true;
                $modalInstance.close();
                sweetAlert.swal({
                    title: "Unable upload file!",
                    html: 'Please upload file',
                    type: "warning",
                    confirmButtonText: "Ok"
                }, function () {
                });
            });
    };
}