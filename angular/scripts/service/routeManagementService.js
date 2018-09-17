/**
 * Created by Anthony on 9/11/2015.
 */

'use strict';
smartApp
    .factory('AllRoutes', function (Restangular) {
        return Restangular.allUrl('routes');
    })
    .factory('AddRemovePermissionToRole', function (Restangular) {
        return Restangular.allUrl('addRemovePermissionToRole');
    });


 