'use strict';
smartApp.factory('AbstractRepository', [

    function () {

        function AbstractRepository(restangular, route)
        {
            this.restangular = restangular;
            this.route = route;
        }

        AbstractRepository.prototype = {
            getList: function (params) {
                return this.restangular.all(this.route).getList(params);
            },
            get: function (id) {
                return this.restangular.one(this.route, id).get();
            },
            getView: function (id) {
                return this.restangular.one(this.route, id).one(this.route + 'view').get();
            },
            update: function (id, updatedResource) {
                return this.restangular.one(this.route, id).customPUT(updatedResource);
            },
            create: function (newResource) {
                return this.restangular.all(this.route).post(newResource);
            },
            remove: function (object) {
                return this.restangular.one(this.route, object.id).remove();
            },
            customGET: function (params) {
                return this.restangular.all(this.route).customGET("", params);

            },
            customPOST: function (params) {
                return this.restangular.all(this.route).customPOST("", params);

            }
        };

        AbstractRepository.extend = function (repository) {
            repository.prototype = Object.create(AbstractRepository.prototype);
            repository.prototype.constructor = repository;
        };

        return AbstractRepository;
    }
]);