smartApp
    .factory('Photos', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'photos');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });