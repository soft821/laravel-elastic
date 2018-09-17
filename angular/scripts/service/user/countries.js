/**
 * Created by Admin on 3/22/2018.
 */
smartApp
    .factory('Countries', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'countries');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();
    });