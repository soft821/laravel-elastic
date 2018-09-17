'use strict';
smartApp
    .factory('AllMenuesByRole', function (Restangular) {
        return Restangular.allUrl('menuesByRole');
    })
    .factory('AddRemoveMenuToRole', function (Restangular) {
        return Restangular.allUrl('addRemoveMenuToRole');
    });
 