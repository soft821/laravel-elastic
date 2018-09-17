smartApp
    .factory('Payment', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'payments');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });