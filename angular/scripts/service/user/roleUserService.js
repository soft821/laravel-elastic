smartApp
    .factory('RoleUser', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'role/user');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });