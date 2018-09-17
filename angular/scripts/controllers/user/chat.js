function ChatController(ChatSlideBarList, Chat, ShowMessages, $scope, $pusher, $rootScope, $cookieStore, $timeout, User, ProgrammeGroups)
{
    $scope.isChatSlideBar = true;

    $scope.backButton = function () {
        $scope.isChatSlideBar = true;
        $scope.selectedUser = -1;
        $scope.showSendMessageButton = false;
    };
    $scope.messages = [];
    $scope.selectedUser = -1;

    $scope.isGroup = false;
    $scope.showSendMessageButton = false;

    var currentUser = $rootScope.currentUser;
    var isTrainer = false;
    Pusher.log = function (msg) {
        console.log(msg);
    };


    var pusherEndPointAuth = dbServe + 'broadcasting/auth';

    var pusher;
    var channel;
    var client;
    $scope.$watch('selectedUser', function (selectedUser) {

        console.log(selectedUser);


        if (selectedUser !== -1) {
            var channelName = '';

            if ($scope.isGroup) {
                channelName = 'private-groupchat.' + selectedUser;
            } else {
                if (currentUser.id >= selectedUser) {
                    channelName = 'private-chats.' + currentUser.id + '.' + selectedUser;
                } else {
                    channelName = 'private-chats.' + selectedUser + '.' + currentUser.id;
                }
            }


            client = new Pusher('7d43f429ace86ef80f85', {
                cluster: 'eu',
                authEndpoint: pusherEndPointAuth,
                auth: {
                    headers: {
                        "Authorization": "Bearer " + $cookieStore.get('access_token')
                    }
                }
            });
            Pusher.logToConsole = true;

            pusher = $pusher(client);
            pusher.logToConsole = true;
            channel = pusher.subscribe(channelName);
            channel.bind('App\\Events\\MessageSendCreated', function (data) {
                debugger;
                if (data.message.from.id !== currentUser.id) {
                    var audio = new Audio('audio/song.mp3');
                    audio.play();
                }


                if ($scope.currentUser.id !== data.message.user_from) {
                    $scope.entities.push(data.message);
                }
            });

            channel.bind('client-user-typing', function (data) {
                $scope.lastTypedUser = data.from;

                $scope.isTyping = true;


                $timeout(function () {
                    $scope.isTyping = false;
                }, 5000);

            });


            channel.bind('pusher:subscription_succeeded', function (data) {
            });
        }


    });

    $scope.goToEntity = function (entity) {

        if (entity.type == "group") {

            $rootScope.go('user/groups/details/' + entity.id);

        } else {

            $rootScope.go('admin/management/edit/' + entity.id);
        }
    };
    $scope.slideBarList = function () {
        ChatSlideBarList.getList().then(function (result) {
            $scope.slideBarData = result.data;
            console.log($scope.slideBarData);
        });
    };
    $scope.slideBarList();

    $scope.entities = {};
    $scope.entitiesSlideBar = {};







    var EnitityRepository = Chat;


    $scope.getEntities = function () {
        Chat.getList().then(function (result) {
            $scope.entities = result.data;
        });
    };
    $scope.getEntities();



    $scope.sendChat = function (message) {
        if ($scope.isGroup) {
            if (message.length > 0) {

                var messageObj = {
                    "user_from": $scope.currentUser.id,
                    "from": $scope.currentUser,
                    "user_to": null,
                    "message": message,
                    'group_id': $scope.selectedUser,
                    "created": moment().locale('en').startOf('second').fromNow()
                };

                $scope.entities.push(messageObj);
                var messageObject = {
                    "user_from": $scope.currentUser.id,
                    "user_to": null,
                    "message": message,
                    'group_id': $scope.selectedUser
                };

                $scope.newMessage = '';
                Chat.create(messageObject).then(function (result) {
                })
            }
        } else {
            if (message.length > 0) {

                var messageObj = {
                    "user_from": $scope.currentUser.id,
                    "from": $scope.currentUser,
                    "user_to": $scope.selectedUser,
                    "message": message,
                    "created": moment().locale('en').startOf('second').fromNow()
                };

                $scope.entities.push(messageObj);

                var messageObject = {
                    "user_from": $scope.currentUser.id,
                    "user_to": $scope.selectedUser,
                    "message": message
                };

                $scope.newMessage = '';
                Chat.create(messageObject).then(function (result) {
                })
            }
        }


    };

    $scope.showMessages = function (entity) {
        $scope.isChatSlideBar = false;
        $scope.showSendMessageButton = true;
        if (entity.type === "group") {
            $scope.isGroup = true;
            ProgrammeGroups.get(entity.id).then(function (result) {
                $scope.selectedTopName = result.data.group_name;
                $scope.selectedTopAvatar = 'images/group.png'
            });
        } else {
            $scope.isGroup = false;
            User.get(entity.id).then(function (result) {
                $scope.selectedTopName = result.data.first_name + ' ' + result.data.last_name;
                $scope.selectedTopAvatar = result.data.avatar;
            });
        }

        $scope.selectedUser = entity.id;
        ShowMessages.getList({from: entity.id, type: entity.type}).then(function (result) {
            $scope.entities = result.data;
        });

    };


    $scope.keyDownEvent = function () {

        var triggered = channel.trigger('client-user-typing', {from: currentUser.first_name});
        if (event.keyCode === 13) {
            $scope.sendChat($scope.newMessage);

        }

    };


    $scope.selectedPerson = function (id) {
        if (id === $scope.selectedProperty) {
            $scope.selectedProperty = 0;
            $scope.isActive = 0;

        }
        else {
            $scope.selectedProperty = id;
            $scope.isActive = id;
        }
    };

    $scope.selectedGroup = function (id) {
        if (id === $scope.selectedGroupProperty) {
            $scope.selectedGroupProperty = 0;
            $scope.isGroupActive = 0;

        }
        else {
            $scope.selectedGroupProperty = id;
            $scope.isGroupActive = id;

        }
    }





}