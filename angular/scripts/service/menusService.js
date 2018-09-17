smartApp
    .factory('MenuRepository', ['Restangular', 'AbstractRepository',
        function (Restangular, AbstractRepository) {
            function MenuRepository()
            {
                AbstractRepository.call(this, Restangular, 'menuses');
            }

            AbstractRepository.extend(MenuRepository);
            return new MenuRepository();
        }
    ]);