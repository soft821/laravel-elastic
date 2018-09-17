'use strict';
smartApp
    .factory('Chat', function (Restangular, AbstractRepository) {
        function CurrentRepository()
        {
            AbstractRepository.call(this, Restangular, 'messages');
        }

        AbstractRepository.extend(CurrentRepository);
        return new CurrentRepository();


    })
    .factory('ShowMessages', function (Restangular) {
        return Restangular.allUrl('show/messages');
    })
    .factory('ChatSlideBar', function (Restangular) {
        return Restangular.allUrl('show/chat');
    })
    .factory('ShowGroupChatMessages', function (Restangular) {
        return Restangular.allUrl('show/group/messages/{id}');
    })
    .factory('ChatSlideBarList', function (Restangular) {
        return Restangular.allUrl('chat/slideBar/list');
    })
    .factory('GroupChatSlideBar', function (Restangular) {
        return Restangular.allUrl('show/group/chat');
    });