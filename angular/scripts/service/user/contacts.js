smartApp
    .factory('Contacts', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'contacts');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });