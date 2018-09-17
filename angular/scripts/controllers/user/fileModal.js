/**
 * Created by Admin on 11/29/2017.
 */
function FileModalController(locale, $scope, $store, sweetAlert, $rootScope, $sce)
{


    $scope.dataLoading = false;

    $scope.dropzoneConfig = {};
    $scope.dropzone = {};
    var accessToken = $store.get('access_token');

    $scope.dropzoneConfig = {
        parallelUploads: 20,
        maxFileSize: 40,
        maxFiles: 1,
        uploadMultiple: false,
        autoProcessQueue: false,
        init: function () {
            this.on("complete", function (file) {
                $scope.dataLoading = false;
                sweetAlert.swal({
                    title: "Thank You!!",
                    html: "Your file has been uploaded successfully. As soon as the file is ready for use, the status on the dashboard will be updated.",
                    type: "success",
                    confirmButtonText: "Ok"

                }, function () {

                }).then(function () {
                    $rootScope.go('/user/dashboard');
                });
            });
            $('#fileUpload').click(function () {
                $scope.dataLoading = true;
                if ($scope.dropzone.files.length > 0) {
                    $scope.dropzone.processQueue();
                }
                else {
                    sweetAlert.swal({
                        title: "Unable to upload file!",
                        html: "Please choose at least one file",
                        type: "warning",
                        confirmButtonText: "Ok"

                    }, function () {

                    }).then(function () {
                        $scope.dataLoading = false;
                    });


                }


            });
        },
        headers: {'Authorization': 'Bearer ' + accessToken},
        acceptedFiles: "application/pdf",
        url: $sce.trustAsResourceUrl(dbSever + 'user/file/upload')
    };


    $scope.back = function () {
        $rootScope.go('/user/dashboard');
    }

}