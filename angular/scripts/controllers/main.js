function MainController($location, $cookieStore, $scope, $rootScope, $interval, $timeout, MenuByUser, $window, $store, CheckAuthentication, locale, USER_ROLES, AuthService, CurrentUser, Session, AUTH_EVENTS, $modal)
{

    $scope.editing = false;
    $scope.$watch(function () {
        return $location.path();
    }, function (value) {
        console.log(value);

        if (value.indexOf('/user/document/edit/') >= 0) {
            $scope.editing = true;
        } else {
            $scope.editing = false;
        }
    });

    var loadingStart = function () {
        $window.loading_screen = $window.pleaseWait({
            logo: "images/logo1.png",
            backgroundColor: '#ffffff',
            loadingHtml: "<div style='padding-left:10px;padding-bottom:10px' class='loading-message text-center'>Please Wait ...</div><div class='sk-spinner sk-spinner-rotating-plane'></div>"
        });
    };

    var loadingFinished = function () {
        $window.loading_screen.finish();
    };


    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
    Session.create(0, 0, 'au');
    $rootScope.currentUser = null;
    $scope.navCollapsed = true;
    $scope.embed = false;
    $scope.sidebar = false;
    //$rootScope.isLoading = true;



    if ($cookieStore.get('COOKIE_LOCALE_LANG')) {
        var stLang = $cookieStore.get('COOKIE_LOCALE_LANG');
        $rootScope.setCurrentLanguageByCode(stLang);
        $rootScope.changeLag($rootScope.lang);
    } else {
        $rootScope.changeLag($rootScope.lang);
    }




    $scope.navigate = function (url) {
        if (window.innerWidth < 990) {
            $scope.navCollapsed = !$scope.navCollapsed;
        }
        $rootScope.go(url);
    };


    $(window).resize(function () {
        $scope.$apply(function () {
            if (window.innerWidth > 990) {
                $scope.navCollapsed = false;
            } else {
                $scope.navCollapsed = true;
            }
        });
    });
    $scope.currentPage = 1;

    $scope.allNotification = function () {
        $rootScope.go('allNotification');
    };

    $scope.setCurrentUser = function () {

        if (!$rootScope.firstLogin) {
            $rootScope.go('login');
        }
        $rootScope.hideLogin = true;

        // loadingStart();
        CurrentUser.get().then(function (result) {
            $scope.currentUser = result;

            var groupId = parseInt($scope.currentUser.roles[0].id);

            $store.set('gId', groupId);
            $rootScope.currentUser = $scope.currentUser;
            Session.create($scope.currentUser.id, $scope.currentUser.id, $scope.currentUser.roles[0].name);
            if ($scope.currentUser) {
                var params = {};
                MenuByUser.customGET('', params).then(function (result) {
                    $scope.menues = result.menus;
                    $rootScope.go($scope.menues[0].view_name);


                    //  loadingFinished();
                }, function (error) {

                });
            }

        }, function (error) {
            $scope.checkAuthentication();
            Session.create(0, 0, 'au');
            // loadingFinished();

        });
    };


    $scope.$on(AUTH_EVENTS.loginSuccess, $scope.setCurrentUser);


    var login = AuthService.isAuthenticated();

    $scope.logout = function () {
        $rootScope.hideLogin = false;
        AuthService.logOut();
        Session.destroy();
        Session.create(0, 0, 'au');
        $scope.currentUser = null;
        $store.set('gId', "");
        $rootScope.go('index');


    };
    if ($store.get('access_token')) {
        //if (self === top && window.menubar.visible) {
        $scope.setCurrentUser();
        // }
    }
    $scope.checkAuthentication = function () {
        CheckAuthentication.get().then(function (data) {


        }, function (error) {
            var refresh_token = $store.get('refresh_token');
            if (refresh_token) {
                var signInDetails = {
                    refresh_token: refresh_token,
                    client_id: 2,
                    client_secret: 'RX586LXPT8nFzNEQcwXYIvn7bzA9NLoYOKGiaikd',
                    grant_type: 'refresh_token'
                };
                AuthService.login(signInDetails).then(function (user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    $scope.user = {
                        username: '',
                        password: ''
                    };
                    $scope.logout();
                });
            } else {
                $scope.logout();
            }
        });
    };

    $interval(function () {
        if ($store.get('access_token')) {
            // if (self == top && window.menubar.visible) {
            $scope.checkAuthentication();
            //}
        }
    }, 10000);

    $scope.goToHome = function () {
        if ($scope.isAuthorized($scope.userRoles.consumer) || $scope.isAuthorized($scope.userRoles.generalAdmin)) {
            $rootScope.go('user/dashboard');
        } else
            if ($scope.isAuthorized($scope.userRoles.admin)) {
                $rootScope.go('routeManagement');
            }
    };


}