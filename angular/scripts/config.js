function config($stateProvider, $urlRouterProvider, USER_ROLES)
{

    $urlRouterProvider.otherwise("/login");


    $stateProvider
        .state('login', {
            url: "/login",
            name: 'login',
            templateUrl: "views/login.html",
            controller: LoginController,
            data: {
                pageTitle: 'Log in',
                specialClass: 'gray-bg',
                authorizedRoles: [USER_ROLES.anonymusUser]
            }
        })
        .state('forgotPassword', {
            url: "/forgotPassword/:code",
            templateUrl: "views/forgotPassword.html",
            controller: ForgetPasswordController,
            data: {
                pageTitle: 'Forgotten password',
                specialClass: 'gray-bg',
                authorizedRoles: [USER_ROLES.anonymusUser]
            }
        })
        .state('registerConfirmation', {
            url: "/registerConfirmation/:code",
            templateUrl: "views/registerConfirmation.html",
            controller: RegisterConfirmationController,
            data: {
                pageTitle: 'Confirmation of registration',
                specialClass: 'gray-bg',
                authorizedRoles: [USER_ROLES.anonymusUser]
            }
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html",
            controller: RegisterController,
            data: {
                pageTitle: 'Registration',
                specialClass: 'gray-bg',
                authorizedRoles: [USER_ROLES.anonymusUser]
            }
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "views/profile.html",
            controller: ProfileController,
            data: {
                pageTitle: 'Profile',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin, USER_ROLES.consumer, USER_ROLES.trainer]
            }
        })
        .state('chat', {
            url: "/chat",
            templateUrl: "views/user/chat.html",
            controller: ChatController,
            data: {
                pageTitle: 'Chat',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('routeManagement', {
            url: "/routeManagement",
            name: 'routeManagement',
            templateUrl: "views/routeManagement.html",
            controller: RouteManagementController,
            data: {
                pageTitle: 'Route Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('menuManagement', {
            url: "/menuManagement",
            name: 'menuManagement',
            templateUrl: "views/menuManagement.html",
            controller: MenuManagementController,
            data: {
                pageTitle: 'Menu Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('menus', {
            url: "/menus",
            name: 'Menus',
            templateUrl: "views/menus.html",
            controller: MenusController,
            data: {
                pageTitle: 'Menus',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
//         .state('RoleUser', {
//             url: "/admin/user/management/role/user",
//             name: 'RoleUser',
//             templateUrl: "views/admin/user/roleUser.html",
//             controller: RoleUserController,
//             data: {
//                 pageTitle: 'Role Management',
//                 authorizedRoles: [USER_ROLES.admin,USER_ROLES.generalAdmin]
//             }
//         })
        .state('paymentsManagement', {
            url: "/admin/user/management/payments",
            name: 'Payments Management',
            templateUrl: "views/admin/user/paymentsManagement.html",
            controller: PaymentsManagementController,
            data: {
                pageTitle: 'Payments Management',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin, USER_ROLES.consumer, USER_ROLES.trainer]
            }
        })
        .state('userManagementFilter', {
            url: "/admin/user/management/:email",
            name: 'User Management',
            templateUrl: "views/admin/user/userManagement.html",
            controller: UserManagementController,
            data: {
                pageTitle: 'User Management',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin]
            }
        })
        .state('userManagement', {
            url: "/admin/user/management",
            name: 'User Management',
            templateUrl: "views/admin/user/userManagement.html",
            controller: UserManagementController,
            data: {
                pageTitle: 'User Management',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin]
            }
        })
        .state('userCreate', {
            url: "/admin/management/create",
            templateUrl: "views/admin/user/create.html",
            controller: UserCreateController,
            data: {
                pageTitle: 'Create an account',
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.generalAdmin]
            }
        })
        .state('userEdit', {
            url: "/admin/management/edit/:entityID",
            templateUrl: "views/admin/user/edit.html",
            controller: UserEditController,
            data: {
                pageTitle: 'Edit user',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('fileUpload', {
            url: "/user/fileUpload",
            templateUrl: "views/user/fileModal.html",
            controller: FileModalController,
            data: {
                pageTitle: 'Upload File',
                authorizedRoles: [USER_ROLES.generalAdmin]
            }
        })
        .state('userGroups', {
            url: "/admin/user/groups",
            templateUrl: "views/admin/user/group.html",
            controller: UserGroupController,
            data: {
                pageTitle: 'Group Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('photos', {
            url: "/admin/user/photos",
            templateUrl: "views/admin/user/photos.html",
            controller: PhotosController,
            data: {
                pageTitle: 'Photos Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('photosEdit', {
            url: "/admin/photos/edit/:entityID",
            templateUrl: "views/admin/user/photosEdit.html",
            controller: PhotosEditController,
            data: {
                pageTitle: 'Photos Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('photosCreate', {
            url: "/admin/photos/create",
            templateUrl: "views/admin/user/photosCreate.html",
            controller: PhotosCreateController,
            data: {
                pageTitle: 'Photos Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('places', {
            url: "/admin/user/places",
            templateUrl: "views/admin/user/places.html",
            controller: PlacesController,
            data: {
                pageTitle: 'Places Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('placesEdit', {
            url: "/admin/places/edit/:entityID",
            templateUrl: "views/admin/user/placesEdit.html",
            controller: PlacesEditController,
            data: {
                pageTitle: 'Places Management',
                authorizedRoles: [USER_ROLES.admin]
            }
        })
        .state('bills', {
            url: "/user/bills",
            templateUrl: "views/user/bills.html",
            controller: BillingInfoController,
            data: {
                pageTitle: 'BillingInfoController',
                authorizedRoles: [USER_ROLES.consumer, USER_ROLES.trainer]
            }
        });
}


smartApp = angular
    .module('inspinia');

smartApp.run(function (editableOptions) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGlhbWF0aWMiLCJhIjoiY2pqZjh2a2huMng0cDNrcGxtaTRwa2NhZiJ9.7RJBlZw7LBi7FuiIFVXRWA';
    L.mapbox.accessToken = 'pk.eyJ1IjoiZGlhbWF0aWMiLCJhIjoiY2pqZjh2a2huMng0cDNrcGxtaTRwa2NhZiJ9.7RJBlZw7LBi7FuiIFVXRWA';

    editableOptions.theme = 'bs3';
})
    .config(function (stripeProvider) {
        stripeProvider.setPublishableKey('pk_test_N6sQsWgn5hHL1ESpJkTXoZoM');
    });

smartApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

smartApp.factory('debounce', function ($timeout) {
    return function (callback, interval) {
        var timeout = null;
        return function () {
            $timeout.cancel(timeout);
            var args = arguments;
            timeout = $timeout(function () {
                callback.apply(this, args);
            }, interval);
        };
    };
});


smartApp
    .config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-right',
            preventOpenDuplicates: true

        });
        //payment key configuration goes here
    })
    .run(function (locale, localeEvents, $rootScope, localeChanged, uibPaginationConfig) {

        $rootScope.languages = [
            {code: "en-US", pre: 'en', label: "English", icon: 'flag-icon-gb'},
        ];

        $rootScope.availableLanguages = [
            {code: "en-US", pre: 'en', label: "English", icon: 'flag-icon-gb'},
        ];


        $rootScope.lang = $rootScope.languages[0];

        locale.ready(['common', 'dashboard', 'case']).then(function (res) {
        });

        $rootScope.$on(localeEvents.localeChanges, function (event, data) {
            locale.ready(['common', 'dashboard', 'case']).then(function (res) {
            });
        });


        $rootScope.getLan = function (value) {
            for (var i = 0; i < $rootScope.languages.length; i++) {
                if ($rootScope.languages[i].pre === value) {
                    return $rootScope.languages[i].label;
                }
            }
        };

        $rootScope.getLanguage = function (value) {
            for (var i = 0; i < $rootScope.languages.length; i++) {
                if ($rootScope.languages[i].pre === value) {
                    return $rootScope.languages[i];
                }
            }
        };


        $rootScope.setCurrentLanguage = function (value) {
            for (var i = 0; i < $rootScope.languages.length; i++) {
                if ($rootScope.languages[i].pre == value) {
                    $rootScope.lang = $rootScope.languages[i];
                }
            }
        };

        $rootScope.setCurrentUserLanguages = function (langArray) {
            $rootScope.languages = [];
            for (var i = 0; i < langArray.length; i++) {
                for (var j = 0; j < $rootScope.availableLanguages.length; j++) {
                    if (langArray[i].language == $rootScope.availableLanguages[j].pre) {
                        $rootScope.languages.push($rootScope.availableLanguages[j]);
                        break;
                    }
                }
            }

            if (langArray.length === 0) {
                var dLan = [{"language": "en"}];
                $rootScope.setCurrentUserLanguages(dLan);
            }

        };

        $rootScope.setCurrentLanguageByCode = function (value) {
            for (var i = 0; i < $rootScope.languages.length; i++) {
                if ($rootScope.languages[i].code == value) {
                    $rootScope.lang = $rootScope.languages[i];
                }
            }
        };

        var defaultLan = [{"language": "en"}];

        $rootScope.setCurrentUserLanguages(defaultLan);


        $rootScope.setCurrentUserLanguages = function (langArray) {
            $rootScope.languages = [];
            for (var i = 0; i < langArray.length; i++) {
                for (var j = 0; j < $rootScope.availableLanguages.length; j++) {
                    if (langArray[i].language == $rootScope.availableLanguages[j].pre) {
                        $rootScope.languages.push($rootScope.availableLanguages[j]);
                        break;
                    }
                }
            }

            if (langArray.length === 0) {
                var dLan = [{"language": "en"}];
                $rootScope.setCurrentUserLanguages(dLan);
            }

        };


        $rootScope.changeLag = function (loc) {
            $rootScope.lang = loc;
            locale.setLocale(loc.code);
            $rootScope.$broadcast(localeChanged.changed);
        };
    })


    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self'
            // Allow loading from our assets domain.  Notice the difference between * and **.
            //'http://google.com'
        ]);

        // The blacklist overrides the whitelist so the open redirect here is blocked.
        $sceDelegateProvider.resourceUrlBlacklist([
            'http://myapp.example.com/clickThru**'
        ]);
    })

    .config(function ($authProvider) {
        /*$authProvider.facebook({
         url: dbSever + 'facebookReservation',
         clientId: '893118840793702',
         scope: ['user_birthday,email']
         });*/
    })
    .filter('trustUrl', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    })
    .config(config)
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    })

    .config(function (flashProvider) {
        // Support bootstrap 3.0 "alert-danger" class with error flash types
        flashProvider.errorClassnames.push('alert-danger');
        flashProvider.warnClassnames.push('alert-warning');
        flashProvider.infoClassnames.push('alert-info');
        flashProvider.successClassnames.push('alert-success');
    })

    .run(function ($rootScope, $location, flash, $modal, limitToFilter) {

        $rootScope.go = function (path) {
            $location.path(path);
        };


        $rootScope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        $rootScope.isSideBar = false;
        $rootScope.isFooter = true;
        $rootScope.isBackgroundLight = false;
        $rootScope.isLoading = false;
        $rootScope.firstLogin = false;


        $rootScope.getTimeStamp = function (string) {
            return new Date(string);
        };

        $rootScope.goToNextTab = function (path) {
            window.open(path, '_blank');
        };

        $rootScope.days = [
            {id: 1, name: 'Mandag'},
            {id: 2, name: 'Tirsdag'},
            {id: 3, name: 'Onsdag'},
            {id: 4, name: 'Torsdag'},
            {id: 5, name: 'Fredag'},
            {id: 6, name: 'Lørdag'},
            {id: 7, name: 'Søndag'}];

        $rootScope.setDefaultDays = function () {
            angular.forEach($rootScope.days, function (day) {
                if (!!day.selected) day.selected = false;
            });
        };

        $rootScope.customeMessage = function (response, action) {
            flash.error = response;
        };

        $rootScope.successMessage = function (response, action) {
            flash.success = action;
        };

        $rootScope.errorMessage = function (response, action) {
            var errorMsg = "";
            for (var k in response.data) {

                if (response.data.hasOwnProperty(k)) {
                    // errorMsg = errorMsg + "<br>" + "Error with  " + k + ":" + response.data[k];
                    errorMsg = errorMsg + " " + response.data[k] + "<br>";
                }
            }
            flash.error = errorMsg;
        };


        $rootScope.removeEmptyVariables = function (currentEntity) {
            for (var k in currentEntity) {
                if (currentEntity.hasOwnProperty(k)) {

                    if (currentEntity[k] && typeof currentEntity[k] != 'function') {
                        if (currentEntity[k].length === 0) {
                            delete currentEntity[k];
                        }
                    }
                }
            }
            return currentEntity;

        };

        $rootScope.timeAgo = function (date, granularity) {

            date = (new Date().getTime() / 1000) - (new Date(date).getTime() / 1000);
            var retval = "";

            var difference = date;
            var periods = {
                "decade": 315360000,
                "year": 31536000,
                "month": 2628000,
                "week": 604800,
                "day": 86400,
                "hour": 3600,
                "minute": 60,
                "second": 1
            };
            if (difference < 5) { // less than 5 seconds ago, let's say "just now"
                retval = "just now";
                return retval;
            } else
                if (difference > 86400) {
                    return new Date();
                } else {
                    for (var key in periods) {
                        if (difference >= periods[key]) {
                            var time = Math.floor(difference / periods[key]);
                            difference %= periods[key];
                            retval += (retval ? ' ' : '') + time + ' ';
                            retval += ((time > 1) ? key + 's' : key);
                            granularity--;
                        }
                        if (granularity === '0') {
                            break;
                        }
                    }
                    return retval + '';
                }
        };

        $rootScope.getDeleteConfirmationModel = function (entityName) {
            return $modal.open({
                templateUrl: 'views/deleteConfirmation.html',
                controller: 'DeleteConfirmModalInstanceController',
                resolve: {
                    entityName: function () {
                        return entityName;
                    }
                }
            });
        };

        $rootScope.formattedGrapData = function (data, position) {
            var _array = [];
            for (var i in data) {
                var temp_array = [];
                if (data.hasOwnProperty(i) && !isNaN(+i)) {
                    temp_array.push(parseFloat(data[i][0]) * 1000, parseFloat(data[i][position]));
                    _array.push(temp_array);
                }
            }
            return _array;
        };


        $rootScope.getDeleteConfirmationModel = function (entityName) {
            var modalInstance = $modal.open({
                templateUrl: 'views/deleteConfirmation.html',
                controller: 'DeleteConfirmModalInstanceController',
                resolve: {
                    entityName: function () {
                        return entityName;
                    }
                }
            });
            return modalInstance;
        };


        $rootScope.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };


        $rootScope.removeExistingEntities = function (entities, temp_Entities) {
            var ExistingEntities = [];
            for (var i = 0, xlen = entities.length; i < xlen; i++) {
                for (var x = 0, len = temp_Entities.length; x < len; x++) {
                    if (temp_Entities[x].id === entities[i].id) {
                        ExistingEntities.push(entities[i]);
                    }
                }
            }
            return ExistingEntities;
        };


        $rootScope.makeId = function (length) {
            if (!length)
                length = 9;

            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        };


    })
    .factory('errorInterceptor',
        function ($q, $rootScope, $location, $window, $cookieStore, $injector, $store) {

            return {

                responseError: function (response) {

                    if (response && response.status === 401 && response.data.code === 500) {
                        var access_token = $store.get('access_token');

                        if (!access_token) {

                        }
                        if (!$window.sessionStorage["access_token"]) {

                        }

                    }
                    if (response && response.status === 401 && response.data.error === "invalid_token") {


                        var access_token = $cookieStore.get('access_token');
                        var refresh_token = $cookieStore.get('refresh_token');

                        if (!$window.sessionStorage["access_token"]) {

                            if (refresh_token) {

                                var data = "b=1&refresh_token=" + refresh_token +
                                    "&client_id=2" +
                                    "&client_secret=RX586LXPT8nFzNEQcwXYIvn7bzA9NLoYOKGiaikd&grant_type=refresh_token&a=1";

                                $http = $injector.get('$http');
                                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

                                $http.post(dbSever + 'api/v1/login', data)
                                    .success(function (resp) {

                                        $window.sessionStorage["access_token"] = resp.access_token;
                                        $window.sessionStorage['refresh_token'] = resp.refresh_token;

                                        $injector.get("$http")(resp.config).then(function (response) {
                                                deferred.resolve(response);
                                            },
                                            function (response) {
                                                deferred.reject();
                                            });
                                    }).error(function (error) {
                                    // $location.path('/login.html');
                                    window.location = "#/login";
                                    return;

                                });
                            }
                        }
                        var deferred = $q.defer();

                    }
                    if (response && response.status === 400) {
                    }
                    if (response && response.status === 404) {
                    }
                    if (response && response.status >= 500) {
                    }
                    return $q.reject(response);
                }
            };
        })

    .run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {

        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
    }])


    .run(['$rootScope', '$window', function ($rootScope, $window) {
        $rootScope.getGlobals = function (variableName) {
            return $window[variableName];
        };


        $rootScope.isImage = function (ext) {
            if (ext) {
                return ext === "jpg" || ext === "jpeg" || ext === "gif" || ext === "png";
            }
        };
    }])


    .value('localeConf', {
        basePath: 'languages',
        defaultLocale: 'en-US',
        sharedDictionary: 'common',
        fileExtension: '.lang.json',
        persistSelection: true,
        cookieName: 'COOKIE_LOCALE_LANG',
        observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
        delimiter: '::',
        validTokens: new RegExp('^[\\w\\.-]+\\.[\\w\\s\\.-]+\\w(:.*)?$')
    })
    .value('localeSupported', [
        'en-US'
    ])
    .value('localeFallbacks', {
        'en': 'en-US'
    })

    .value('localeChanged', {
        changed: 'locale-changed'
    })


    .factory('BearerAuthInterceptor', function ($window, $q, $store) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($store.get('access_token') && !config.noAuth) {
                    // may also use sessionStorage
                    config.headers.Authorization = 'Bearer ' + $store.get('access_token');
                    config.headers.XDEBUG_SESSION = 'PHPSTORM';
                }
                return config || $q.when(config);
            },
            response: function (response) {
                if (response.status === 401) {
                    //  Redirect user to login page / signup Page.
                }
                return response || $q.when(response);
            }
        };
    })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('BearerAuthInterceptor');
    })

    .config(function (RestangularProvider) {
        RestangularProvider.setResponseExtractor(function (response, operation) {
            if (operation === 'getList') {
                var newResponse = [];
                newResponse.data = response.data;
                if (response.page) {
                    newResponse.page = response.page;
                }
                return newResponse;

            }
            return response;
        });

    })


    .config(function (RestangularProvider) {
        var newBaseUrl = dbSever;
        RestangularProvider.setBaseUrl(newBaseUrl);
    })
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .constant('USER_ROLES', {
        all: '*',
        admin: 'GlobalAdmin',
        staff: 'Staff',
        consumer: 'Consumer',
        buyer: 'Buyer',
        generalAdmin: 'GeneralAdmin',
        trainer: 'Trainer',
        anonymusUser: 'au'
    })
    .run(function ($rootScope, $timeout, AUTH_EVENTS, AuthService) {


        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
            var notSideBar = ['login', 'register.entitytId'];
            var darkBackground = ['uploaded'];


            if (notSideBar.indexOf(toState.name) !== -1) {
                $rootScope.isSideBar = false;
            } else {
                $rootScope.isSideBar = true;
            }


            if (darkBackground.indexOf(toState.name) !== -1) {
                $rootScope.isBackgroundLight = false;
            } else {
                $rootScope.isBackgroundLight = true;
            }

            $timeout.cancel($rootScope.refreshSearch);
            $timeout.cancel($rootScope.refreshDoc);

        });


        $rootScope.$on('$stateChangeStart', function (event, next) {

        });

    })
    .config(function ($authProvider) {
        $authProvider.httpInterceptor = function () {
            return true;
        },
            $authProvider.withCredentials = false;
        $authProvider.tokenRoot = null;
        $authProvider.baseUrl = '/';
        $authProvider.loginUrl = '/auth/login';
        $authProvider.signupUrl = '/auth/signup';
        $authProvider.unlinkUrl = '/auth/unlink/';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.tokenHeader = 'Authorization';
        $authProvider.tokenType = 'Bearer';
        $authProvider.storageType = 'localStorage';

        $authProvider.facebook({
            clientId: '1791750004248447'
        });

        $authProvider.facebook({
            name: 'facebook',
            url: dbServe + 'api/v1/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: dbServe,
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            type: '2.0',
            SOCIAL_AUTH_REDIRECT_IS_HTTPS: true,
            popupOptions: {width: 580, height: 400}
        });


    })
    .factory('AuthResolver', function ($q, $rootScope, $state) {
        return {
            resolve: function () {
                var deferred = $q.defer();
                var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
                    if (angular.isDefined(currentUser)) {
                        if (currentUser) {
                            deferred.resolve(currentUser);
                        } else {
                            deferred.reject();
                            // $state.go('index');
                        }
                        unwatch();
                    }
                });
                return deferred.promise;
            }
        };
    });
