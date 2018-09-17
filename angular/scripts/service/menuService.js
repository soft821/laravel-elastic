/**
 * Created by Anthony on 3/27/2015.
 */


smartApp
    .factory('MenuByUser', function (Restangular) {
        return Restangular.allUrl('users/current/menu');
    })

   