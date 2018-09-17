smartApp
    .factory('UserRepository',
        function (Restangular) {
            return Restangular.all('users/register');
        }
    )
    .factory('User', function (Restangular, AbstractRepository) {

        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'users');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();

    })
    .factory('BannedUser', function (Restangular) {
        return Restangular.allUrl('banUser');
    })
    .factory('UnBannedUser', function (Restangular) {
        return Restangular.allUrl('unBanUser');
    })
    .factory('TrainerCreatesClient', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'trainer/create/user');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('ClientConfirmPassword', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'client/confirm/password');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('ClientConfirm', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'client/confirm/credentials');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('ClientCreateStripe', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'client/create/stripe');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('ClientInformation', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'client/information');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('UserCreate', function (Restangular) {
        return Restangular.allUrl('userCreate');
    })
    .factory('CurrentUser', function (Restangular) {
        return Restangular.one('users/current');
    })
    .factory('SendPropertySaleRemindNotification', function (Restangular) {
        return Restangular.one('sendPropertySaleRemindNotification');
    })
    .factory('GetBillingData', function (Restangular) {
        return Restangular.allUrl('billinginfo');
    })
    .factory('SaveBillingData', function (Restangular) {
        return Restangular.allUrl('saveBillingData');
    })
    .factory('cloudinaryInterceptor', function () {
        return {
            request: function (config) {
                var authHeader = config.headers('authorization');
                //Check for the host
                var regex = "https://diamatic.s3.us-east-2.amazonaws.com/8baec93b-cfcf-4bc1-9bfd-0ef206058c1d/Form/sample.json";
                if (regex.test(config.url))
                //Detach the header
                    delete config.headers.authorization;
                return config;
            }
        }
    });



