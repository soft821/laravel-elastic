smartApp
    .factory('Places', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'places');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('PlacesMap', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'places/map');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    })
    .factory('PlacesIndex', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'places/index');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });