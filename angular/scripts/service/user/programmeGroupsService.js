smartApp.factory('ProgrammeGroups', function (Restangular, AbstractRepository) {
    function CurrentRepository()
    {
        AbstractRepository.call(this, Restangular, 'programme/groups');
    }

    AbstractRepository.extend(CurrentRepository);
    return new CurrentRepository();
});