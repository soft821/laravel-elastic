/**
 * Created by Anthony on 3/4/2015.
 */

smartApp
    .factory('GroupRepository', ['Restangular', 'AbstractRepository',
        function (Restangular, AbstractRepository) {

            function GroupRepository()
            {
                AbstractRepository.call(this, Restangular, 'user');
            }

            AbstractRepository.extend(GroupRepository);
            return new GroupRepository();
        }
    ])
    .factory('PostRemind', function (Restangular) {
        return Restangular.allUrl('password/email');
    })
    .factory('PostReset', function (Restangular) {
        return Restangular.allUrl('password/reset');
    })
    .factory('CheckAuthentication', function (Restangular) {
        return Restangular.one('check/user');
    })
    .factory('SearchCity', function (Restangular) {
        return Restangular.one('searchSuburb');
    })

    .factory('ContactUs', function (Restangular) {
        return Restangular.allUrl('contactUs');
    })

    .factory('SearchTitleCompany', function (Restangular) {
        return Restangular.one('searchTitleCompany');
    });

