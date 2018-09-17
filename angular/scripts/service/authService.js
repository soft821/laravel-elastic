smartApp.factory('AuthService', function ($http, $window, Session, $cookieStore, $store) {
    var authService = {};

    authService.login = function (credentials) {
        return $http
            .post(dbServe + 'api/v1/login', credentials)
            .then(function (res) {
                $cookieStore.put('access_token', res.data.access_token);
                $cookieStore.put('refresh_token', res.data.refresh_token);
                $store.set('access_token', res.data.access_token);
                $store.set('refresh_token', res.data.refresh_token);
                return res.data;
            }, function (error) {
                throw error;

            });
    };

    authService.logOut = function () {
        $cookieStore.remove('access_token');
        $cookieStore.remove('refresh_token');
        $store.remove('access_token');
        $store.remove('refresh_token');
    };

    authService.isAuthenticated = function () {  //Is he login
        return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {

        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        // authService.isAuthenticated() &&
        return (authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;


})

    .service('Session', function () {
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    });







