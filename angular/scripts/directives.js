/**
 * INSPINIA - Responsive Admin Theme
 *
 * Main directives.js file
 * Define directives for used plugin
 *
 *
 * Functions (directives)
 *  - sideNavigation
 *  - iboxTools
 *  - minimalizaSidebar
 *  - vectorMap
 *  - sparkline
 *  - icheck
 *  - ionRangeSlider
 *  - dropZone
 *  - responsiveVideo
 *  - chatSlimScroll
 *  - customValid
 *  - fullScroll
 *  - closeOffCanvas
 *  - clockPicker
 *  - landingScrollspy
 *  - fitHeight
 *  - iboxToolsFullScreen
 *  - slimScroll
 *
 */


/**
 * pageTitle - Directive for set Page title - meta title
 */
function pageTitle($rootScope, $timeout, locale, localeChanged)
{
    return {
        link: function (scope, element) {
            var listener = function (event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = '';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) {
                    var key = toState.data.pageTitle;
                    title = locale.getString('title.' + key);
                }
                $timeout(function () {
                    element.text(title);
                });
            };

            $rootScope.$on('$stateChangeStart', listener);
            // scope.$on(localeChanged.changed, listener);
        }
    };
}


/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout)
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function () {
                element.metisMenu();

            });
        }
    };
}

function step($timeout, $rootScope)
{
    return {
        restrict: 'EA',
        scope: {
            stepFinishing: '=',
            stepCanceled: '=',
            stepChanging: '='
        },
        compile: function (element, scope) {
            element.steps();
            return {
                //pre-link
                pre: function () {
                },
                //post-link
                post: function (scope, element) {
                    element.on('finishing', scope.stepFinishing);
                    element.on('canceled', scope.stepCanceled);
                    element.on('stepChanging', scope.stepChanging);

                }
            };
        }
    };
}

/**
 * responsibleVideo - Directive for responsive video
 */
function responsiveVideo()
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            var figure = element;
            var video = element.children();
            video
                .attr('data-aspectRatio', video.height() / video.width())
                .removeAttr('height')
                .removeAttr('width')

            //We can use $watch on $window.innerWidth also.
            $(window).resize(function () {
                var newWidth = figure.width();
                video
                    .width(newWidth)
                    .height(newWidth * video.attr('data-aspectRatio'));
            }).resize();
        }
    }
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout)
{
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout)
{
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function () {
                    $(window).trigger('resize');
                }, 100);
            };
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar($timeout)
{
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");

                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else
                    if ($('body').hasClass('fixed-sidebar')) {
                        $('#side-menu').hide();
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(500);
                            }, 300);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        $('#side-menu').removeAttr('style');
                    }
            };
        }
    };
}


function closeOffCanvas()
{
    return {
        restrict: 'A',
        template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
        controller: function ($scope, $element) {
            $scope.closeOffCanvas = function () {
                $("body").toggleClass("mini-navbar");
            };
        }
    };
}

/**
 * vectorMap - Directive for Vector map plugin
 */
function vectorMap()
{
    return {
        restrict: 'A',
        scope: {
            myMapData: '='
        },
        link: function (scope, element, attrs) {
            element.vectorMap({
                map: 'world_mill_en',
                backgroundColor: "transparent",
                regionStyle: {
                    initial: {
                        fill: '#e4e4e4',
                        "fill-opacity": 0.9,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 0
                    }
                },
                series: {
                    regions: [{
                        values: scope.myMapData,
                        scale: ["#1ab394", "#22d6b1"],
                        normalizeFunction: 'polynomial'
                    }]
                },
            });
        }
    };
}


/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline()
{
    return {
        restrict: 'A',
        scope: {
            sparkData: '=',
            sparkOptions: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.sparkData, function () {
                render();
            });
            scope.$watch(scope.sparkOptions, function () {
                render();
            });
            var render = function () {
                $(element).sparkline(scope.sparkData, scope.sparkOptions);
            };
        }
    };
}

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout)
{
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, element, $attrs, ngModel) {
            return $timeout(function () {
                var value;
                value = $attrs.value;

                $scope.$watch($attrs['ngModel'], function (newValue) {
                    $(element).iCheck('update');
                });

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue'

                }).on('ifChanged', function (event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function () {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function () {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
}

/**
 * ionRangeSlider - Directive for Ion Range Slider
 */
function ionRangeSlider()
{
    return {
        restrict: 'A',
        scope: {
            rangeOptions: '='
        },
        link: function (scope, elem, attrs) {
            elem.ionRangeSlider(scope.rangeOptions);
        }
    };
}

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function dropZone()
{
    return {
        restrict: 'AE',
        template: '<div ng-transclude></div>',
        transclude: true,
        scope: {
            dropzone: '=',
            dropzoneConfig: '=',
            eventHandlers: '='
        },
        link: function (scope, element, attrs, ctrls) {
            try {
                Dropzone
            } catch (error) {
                throw new Error('Dropzone.js not loaded.');
            }

            var dropzone = new Dropzone(element[0], scope.dropzoneConfig);

            if (scope.eventHandlers) {
                Object.keys(scope.eventHandlers).forEach(function (eventName) {
                    dropzone.on(eventName, scope.eventHandlers[eventName]);
                });
            }

            scope.dropzone = dropzone;
        }
    };


}

/**
 * chatSlimScroll - Directive for slim scroll for small chat
 */
function chatSlimScroll($timeout)
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            $timeout(function () {
                element.slimscroll({
                    height: '234px',
                    railOpacity: 0.4
                });

            });
        }
    };
}

/**
 * customValid - Directive for custom validation example
 */
function customValid()
{
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function () {

                // You can call a $http method here
                // Or create custom validation

                var validText = "Inspinia";

                if (scope.extras == validText) {
                    c.$setValidity('cvalid', true);
                } else {
                    c.$setValidity('cvalid', false);
                }

            });
        }
    };
}


/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll($timeout)
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            $timeout(function () {
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * slimScroll - Directive for slimScroll with custom height
 */
function slimScroll($timeout)
{
    return {
        restrict: 'A',
        scope: {
            boxHeight: '@'
        },
        link: function (scope, element) {
            $timeout(function () {
                element.slimscroll({
                    height: scope.boxHeight,
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * clockPicker - Directive for clock picker plugin
 */
function clockPicker()
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.clockpicker();
        }
    };
}


/**
 * landingScrollspy - Directive for scrollspy in landing page
 */
function landingScrollspy()
{
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.scrollspy({
                target: '.navbar-fixed-top',
                offset: 80
            });
        }
    };
}

/**
 * fitHeight - Directive for set height fit to window height
 */
function fitHeight()
{
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.css("height", $(window).height() + "px");
            element.css("min-height", $(window).height() + "px");
        }
    };
}


function starRating()
{
    return {
        restrict: 'A',
        template: '<ul class="rating" style="color: #a9a9a9; margin: 0;padding: 0;display: inline-block;">' + '<li ng-repeat="star in stars"  ng-class="star" ng-click="toggle($index)" style=" list-style-type: none;display: inline-block;' + 'padding: 1px;' + ' text-align: center;' + ' font-weight: bold;' + ' cursor: pointer;">' + '  <i class="fa fa-star-o fa-3x"></i>' + ' </li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue',
                function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                }
            );
        }
    };
}


function starRatingShow()
{
    return {
        restrict: 'A',
        template: '<ul class="rating" style="color: #a9a9a9; margin: 0;padding: 0;display: inline-block;">' + '<li ng-repeat="star in stars"  ng-class="star" ng-click="toggle($index)" style=" list-style-type: none;display: inline-block;' + 'padding: 1px;' + ' text-align: center;' + ' font-weight: bold;' + ' cursor: pointer;">' + '  <i class="fa fa-star-o fa-2x"></i>' + ' </li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue',
                function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                }
            );
        }
    };
}

function averageRating()
{
    return {
        restrict: 'A',
        template: '<ul class="rating" style="color: #a9a9a9; margin: 0;padding: 0;display: inline-block;">' + '<li ng-repeat="star in stars"  ng-class="star"  style=" list-style-type: none;display: inline-block;' + 'padding: 1px;' + ' text-align: center;' + ' font-weight: bold;' + ' ">' + '  <i class="fa fa-star-o"></i>' + ' </li>' + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue',
                function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                }
            );
        }
    };
}

function backgroundImage()
{
    return function (scope, element, attrs) {
        scope.$watch(attrs.backImg, function (value) {
            element.css({
                'background-image': 'url(' + value + ')',
                'background-size': 'cover'
            });
        });
    };
}

function myAngularDirective()
{
    return {
        restrict: 'E',
        template: '<span>Hi this is myAngularDirective </span>',
        link: function (scope, elem, attrs, $compile) {
        }
    };
}

function test($compile)
{
    return {
        restrict: 'E',
        scope: {
            text: '@'
        },
        template: '<button ng-click="add()" class="btn btn-primary">{{text}}</button>',
        controller: function ($scope, $element) {
            $scope.add = function () {
                var el = $compile("<my-angular-directive />")($scope);
                $('#page').append(el);
                //  $element.parent().append(el);
            };
        }
    };
}

function andyDraggable()
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            var options = scope.$eval(attrs.andyDraggable); //allow options to be passed in
            elm.draggable(options);
        }
    };
}

function colorPicker()
{
    return {
        restrict: 'C',
        link: function (scope, elm, attrs) {
            elm.spectrum({
                preferredFormat: "hex",
                showPalette: true,
                allowEmpty: true,
                showInput: true,
                palette: [
                    ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                    ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                    ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                    ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                    ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                    ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                    ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                    ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
                ]
            });
        }
    };
}


function editElement()
{
    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            var el = element.context.tagName;
            scope.$watch(scope, function (value) {
                element.css('background-color', (value ? 'transparent' : attrs.myBgcolor));
            });
        }
    };
}

function fullPath()
{
    return {
        link: function (scope, element, attrs) {
            if (element[0].tagName === "A") {
                attrs.$set('href', dbServe + attrs.fullPath);
            } else {
                attrs.$set('src', dbServe + attrs.fullPath);
            }

        }
    };
}

function zoomer()
{
    return {
        restrict: 'AC',
        scope: {
            height: '@'
        },
        link: function (scope, element, attrs) {

            element[0].zoomer({
                zoom: 0.25,
                width: 270,
                height: scope.height * 0.25,
                message: "Drag&Drop Me!"
            });
        }
    };
}


function editContent($modal)
{
    return {
        restrict: 'C',
        link: function (scope, elm, attrs) {

            elm
                .on('mouseenter', function () {
                    elm.css({'outline': '3px dashed red', 'cursor': 'pointer'});
                })
                .on('mouseleave', function () {
                    elm.css({'outline': '', 'cursor': ''});
                });

            scope.showEditModalContent = function (selector) {
                var modalInstance = $modal.open({
                    templateUrl: 'editModalContent.html',
                    controller: 'EditContentModalInstanceController',
                    resolve: {
                        selector: function () {
                            return selector;
                        }
                    }
                });
                modalInstance.result.then(function (selector) {
                }, function () {

                });
            };

            elm.click(function () {
                if (scope.mode == 'radio_content') {
                    scope.showEditModalContent(elm);
                } else
                    if (scope.mode == 'radio_details') {
                        scope.showStyleEditor = true;
                        scope.main = false;
                        scope.second = false;
                        scope.all = false;
                    }
            });
        }
    };
}

angular
    .module('inspinia').directive('appFilereader', function ($q) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function () {
            };

            element.bind('change', function (e) {
                var element = e.target;

                $q.all(slice.call(element.files, 0).map(readFile))
                    .then(function (values) {
                        if (element.multiple) ngModel.$setViewValue(values);
                        else ngModel.$setViewValue(values.length ? values[0] : null);
                    });

                function readFile(file)
                {
                    var deferred = $q.defer();

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        deferred.resolve(e.target.result);
                    };
                    reader.onerror = function (e) {
                        deferred.reject(e);
                    };
                    reader.readAsDataURL(file);


                    return deferred.promise;
                }

            }); //change

        } //link
    }; //return
})


    .directive('loginDialog', function (AUTH_EVENTS, $modal) {
        return {
            restrict: 'A',
            link: function (scope) {
                var showDialog = function () {
                    scope.visible = true;
                    var modalInstance = $modal.open({
                        backdrop: 'static',
                        templateUrl: 'views/loginPopUp.html',
                        controller: 'LoginPopUpController',
                    });
                    modalInstance.result.then(function () {

                    }, function () {

                    });

                };
                scope.visible = false;
                scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
                scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);

            }
        };
    })


    .directive('alphabets', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                $(document).ready(function () {
                    element.keypress(function (event) {
                        var inputValue = event.charCode;
                        if (inputValue == 32 || (inputValue >= 65 && inputValue <= 90) ||
                            (inputValue >= 97 && inputValue <= 122)) {
                            return true;
                        } else {
                            event.preventDefault();
                        }
                    });
                });
            }
        };
    })


    .directive('fileDownload', [function () {
        return {
            restrict: 'A',
            replace: true,
            template: '<button class="btn btn-default" ng-click="download()"><span class="glyphicon glyphicon-download"></span></button>',
            controller: ['$rootScope', '$scope', '$element', '$attrs', 'dialogs', '$timeout', function ($rootScope, $scope, $element, $attrs, dialogs, $timeout) {
                $scope.progress = 0;

                function prepare(url)
                {
                    dialogs.wait("Please wait", "Your download starts in a few seconds.", $scope.progress);
                    fakeProgress();
                }

                function success(url)
                {
                    $rootScope.$broadcast('dialogs.wait.complete');
                }

                function error(response, url)
                {
                    dialogs.error("Couldn't process your download!");
                }

                function fakeProgress()
                {
                    $timeout(function () {
                        if ($scope.progress < 95) {
                            $scope.progress += (96 - $scope.progress) / 2;
                            $rootScope.$broadcast('dialogs.wait.progress', {'progress': $scope.progress});
                            fakeProgress();
                        }
                    }, 250);
                }

                $scope.download = function () {
                    $scope.progress = 0;
                    $.fileDownload($attrs.href, {
                        prepareCallback: prepare,
                        successCallback: success,
                        failCallback: error
                    });
                };
            }]
        };
    }])


    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }])


    .directive("ngFileSelect", function () {
        return {
            link: function ($scope, el) {
                el.bind("change", function (e) {
                    $scope.file = (e.srcElement || e.target).files[0];
                    debugger;
                    $scope.getFile($scope.file);
                });
            }
        };
    })


    .service("fileReader", function ($q) {

        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var onProgress = function (reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress", {
                    total: event.total,
                    loaded: event.loaded
                });
            };
        };

        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };

    });

/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .filter("htmlToPlaintext", function () {
        return function (input) {
            return input.replace(/<[^>]+>/gm, '');
        };
    })
    .controller("generate", function () {
        $scope.testing = function () {
        };
    })
    .directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(elem).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        };
    }])
    .filter('capitalize', function () {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        };
    })
    .filter('limitHtml', function () {
        return function (text, limit) {
            var changedString = String(text).replace(/<[^>]+>/gm, '');
            var length = changedString.length;
            return changedString.length > limit ? changedString.substr(0, limit - 1) : changedString;
        };
    })
    .filter('limitToHtml', function () {
        return function (text, limit) {
            return text.length > limit ? text.substr(0, limit - 1) : text;
        }
    })


    .directive('creditCardType', function () {
            var directive =
                {
                    require: 'ngModel', link: function (scope, elm, attrs, ctrl) {
                        ctrl.$parsers.unshift(function (value) {
                            scope.creditCard.type =
                                (/^5[1-5]/.test(value)) ? "mastercard"
                                    : (/^4/.test(value)) ? "visa"
                                    : (/^(?:2131|1800|35\d{3})\d{11}$/.test(value)) ? "jcb"
                                        : (/^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/.test(value)) ? "maestro"
                                            : (/^3[47]/.test(value)) ? 'amex'
                                                : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'discover'
                                                    : undefined;
                            ctrl.$setValidity('invalid', !!scope.creditCard.type);
                            return value;
                        });
                    }
                };
            return directive;
        }
    )


    .directive('cardExpiration', function () {
            var directive =
                {
                    require: 'ngModel', link: function (scope, elm, attrs, ctrl) {
                        scope.$watch('[creditCard.month,creditCard.year]', function (value) {
                            ctrl.$setValidity('invalid', true);
                            if (scope.creditCard.year == scope.currentYear &&
                                scope.creditCard.month <= scope.currentMonth
                            ) {
                                ctrl.$setValidity('invalid', false);
                            }
                            return value;
                        }, true);
                    }
                };
            return directive;
        }
    )


    .filter('range', function () {
            var filter =
                function (arr, lower, upper) {
                    for (var i = lower; i <= upper; i++) arr.push(i);
                    return arr;
                };
            return filter;
        }
    )


    .directive('myMaps', function () {
        // directive link function
        var link = function (scope, element, attrs) {
            var map, infoWindow;
            var markers = [];
            var locations = attrs.myMaps;
            var latitude = 40.7984357;
            var longtitude = -75.6635683;

            scope.$watch("locations", function (newValue, oldValue) {

            });


            // map config
            var mapOptions = {
                center: new google.maps.LatLng(latitude, longtitude),
                zoom: 5,
                styles: [],
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };

            // init the map
            function initMap()
            {
                if (map === void 0) {
                    map = new google.maps.Map(element[0], mapOptions);
                }
            }

            var beachFlagUrl = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
            var image = new google.maps.MarkerImage(
                beachFlagUrl,
                null,
                null,
                null,
                new google.maps.Size(172, 172)
            );

            // place a marker
            function setMarker(map, position, title, content)
            {
                var marker;
                var markerOptions = {
                    position: position,
                    map: map,
                    title: title,
                    icon: {
                        url: '/images/red-pin.png',
                        scaledSize: {width: 60, height: 50}
                    },
                    //  icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                };

                marker = new google.maps.Marker(markerOptions);
                markers.push(marker); // add marker to array

                google.maps.event.addListener(marker, 'click', function () {
                    // close window if not undefined
                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }
                    // create new window
                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                });
            }

            // show the map and place some markers
            initMap();

            function getLatLong(address)
            {
                var geocoder = new google.maps.Geocoder();
                var result = "";
                geocoder.geocode({'address': address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {

                        if (results.length > 0) {
                            result = results[0].geometry.location;
                            map.setCenter(result);
                            setMarker(map, result, 'My Location', locations);
                        }
                    } else {
                        result = "Unable to find address: " + status;
                    }
                });
                return result;
            }

            //getLatLong(locations);
            for (var i = 0; i < scope.locations.length; i++) {

                var companyAddress = scope.locations[i].address + ' ' + scope.locations[i].city + ' ' + scope.locations[i].country;

                setMarker(map, new google.maps.LatLng(parseFloat(scope.locations[i].geo_lat), parseFloat(scope.locations[i].geo_long)), scope.locations[i].name, companyAddress);

            }

        };

        return {
            restrict: 'A',
            template: '<div id="gmaps"></div>',
            scope: {
                locations: '='
            },
            replace: true,
            link: link
        };
    })
    .directive('myMap', function () {
        // directive link function
        var link = function (scope, element, attrs) {
            var map, infoWindow;
            var markers = [];
            var location = attrs.myMap;

            scope.$watch("location", function (newValue, oldValue) {
            });
            // map config
            var mapOptions = {
                center: new google.maps.LatLng(latitude, longtitude),
                zoom: 16,
                styles: [],
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
            // init the map
            function initMap()
            {
                if (map === void 0) {
                    map = new google.maps.Map(element[0], mapOptions);
                }
            }

            var beachFlagUrl = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
            var image = new google.maps.MarkerImage(
                beachFlagUrl,
                null,
                null,
                null,
                new google.maps.Size(172, 172)
            );


            // place a marker
            function setMarker(map, position, title, content)
            {
                var marker;
                var markerOptions = {
                    position: position,
                    map: map,
                    title: title,
                    icon: {
                        url: '/images/red-pin.png',
                        scaledSize: {width: 120, height: 106}
                    },
                    //  icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                };

                marker = new google.maps.Marker(markerOptions);
                markers.push(marker); // add marker to array

                google.maps.event.addListener(marker, 'click', function () {
                    // close window if not undefined
                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }
                    // create new window
                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                });
            }

            // show the map and place some markers
            initMap();
            var latitude = 0.0;
            var longtitude = 0.0;

            function getLocation(address)
            {
                var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address;
                $.getJSON(url)
                    .success(function (data, status, headers, config) {
                        if (data.results.length > 0) {
                            latitude = data.results[0].geometry.location.lat;
                            longtitude = data.results[0].geometry.location.lng;

                            map.setCenter(data.results[0].geometry.location);
                            setMarker(map, new google.maps.LatLng(latitude, longtitude), 'WedooBox', location);
                        }
                    })
                    .error(function (data, status, headers, config) {
                    });
            }

            getLocation(location);


        };

        return {
            restrict: 'A',
            template: '<div id="gmaps"></div>',
            replace: true,
            link: link
        };
    })

    .directive('myIframe', function () {
        var linkFn = function (scope, element, attrs) {
            element.find('iframe').bind('load', function (event) {
                event.target.contentWindow.scrollTo(0, 400);
            });
        };
        return {
            restrict: 'EA',
            scope: {
                src: '@src',
                height: '@height',
                width: '@width',
                scrolling: '@scrolling'
            },
            template: '<iframe class="frame" height="{{height}}" width="{{width}}" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="{{scrolling}}" src="{{src}}"></iframe>',
            link: linkFn
        };
    })

    .directive('pageHeight', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var winHeight = $(this).height();
                    if ($(this).width() > 992) {

                        element.css("min-height", winHeight - 153);
                    } else
                        if ($(this).width() > 767) {
                            element.css("min-height", winHeight - 203);
                        } else {
                            element.css("min-height", $(this).height() - 153);
                        }

                    $(window).bind("load resize", function () {
                        var winHeight = $(this).height();
                        if ($(this).width() > 992) {
                            element.css("min-height", winHeight - 153);
                        } else
                            if ($(this).width() > 767) {
                                element.css("min-height", winHeight - 203);
                            } else {
                                element.css("min-height", $(this).height() - 153);
                            }
                    });
                });
            }
        };
    })

    .directive('footBottom', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                $timeout(function () {

                    if ($(this).width() > 992) {
                        var winHeight = $(this).height();
                        element.css("min-height", winHeight - 146);
                    } else {

                    }

                    $(window).bind("load resize", function () {
                        if ($(this).width() > 992) {
                            var winHeight = $(this).height();
                            element.css("min-height", winHeight - 146);
                        } else {

                        }
                    });

                });
            }
        };
    })

    .directive('changeImgHeight', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                var offset = 154;
                $timeout(function () {
                    var ele = element.children().find("img.change");

                    if ($(this).width() > 992) {
                        var winHeight = $(this).height();
                        ele.css("min-height", winHeight - offset);
                        ele.css("height", winHeight - offset);
                    } else {
                        ele.css("min-height", "");
                        ele.css("height", "");
                    }

                    $(window).bind("load resize", function () {
                        var ele = element.children().find("img.change");
                        if ($(this).width() > 992) {
                            var winHeight = $(this).height();
                            ele.css("min-height", winHeight - offset);
                            ele.css("height", winHeight - offset);
                        } else {
                            ele.css("min-height", "");
                            ele.css("height", "");
                        }
                    });

                });
            }
        };
    }).directive('fileDownloader', [function () {
    return {
        restrict: 'A',
        replace: true,
        template: '<button class="btn btn-default" data-ng-click="download()">Download</button>',
        controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
            $scope.progress = 0;

            function prepare(url)
            {
                fakeProgress();
            }

            function success(url)
            {
            }

            function error(response, url)
            {
            }

            function fakeProgress()
            {
                $timeout(function () {
                    if ($scope.progress < 95) {
                        $scope.progress += (96 - $scope.progress) / 2;
                        fakeProgress();
                    }
                }, 250);
            }

            $scope.download = function () {
                $scope.progress = 0;
                $.fileDownload($attrs.href, {prepareCallback: prepare, successCallback: success, failCallback: error});
            }
        }]
    }
}]).directive('convertToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return val != null ? parseInt(val, 10) : null;
            });
            ngModel.$formatters.push(function (val) {
                return val != null ? '' + val : null;
            });
        }
    };
}).directive('format', function ($filter) {
    'use strict';
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            ctrl.$formatters.unshift(function () {
                if (ctrl.$modelValue == 0) {
                    return '';
                }
                else {
                    return $filter('number')(ctrl.$modelValue);
                }

            });

            ctrl.$parsers.unshift(function (viewValue) {
                var sign = {
                    pos: /[+]/.test(viewValue),
                    neg: /[-]/.test(viewValue),
                    zero: /[0]/.test(viewValue)
                };
                sign.has = sign.pos || sign.neg;
                sign.both = sign.pos && sign.neg;
                sign.test = sign.zero;
                var plainNumber = viewValue.replace(/[\,\.]/g, ''),

                    b = $filter('number')(!sign.both || sign.neg || sign.zero ? plainNumber.replace(/[^0-9]/g, '') : plainNumber);

                if (parseInt(b) === 0) {
                    elem.val('');
                }
                else {
                    elem.val(b);
                }
                return plainNumber;
            });
        }
    };
})
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .directive('draggableElement', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.draggable({cursor: "move"});
            }
        };
    }])
    .directive('onScroll', function ($timeout) {
        'use strict';
        return {
            scope: {
                onScroll: '&onScroll',
            },
            link: function (scope, element) {
                var scrollDelay = 250,
                    scrollThrottleTimeout,
                    throttled = false,
                    scrollHandler = function () {
                        if (!throttled) {
                            scope.onScroll();
                            throttled = true;
                            scrollThrottleTimeout = $timeout(function () {
                                throttled = false;
                            }, scrollDelay);
                        }
                    };

                element.on("scroll", scrollHandler);

                scope.$on('$destroy', function () {
                    element.off('scroll', scrollHandler);
                });
            }
        };
    })
    .directive('showFocus', function ($timeout) {
        return function (scope, element, attrs) {
            scope.$watch(attrs.showFocus,
                function (newValue) {
                    $timeout(function () {
                        newValue && element.focus();
                    });
                }, true);
        };
    })
    .directive('circleProgress', function ($timeout) {
        'use strict';
        return {
            restrict: 'A',
            scope: {
                value: '='
            },
            link: function (scope, element) {
                $(element).circleProgress({
                    value: parseFloat(scope.value),
                    size: 30,
                    fill: {
                        gradient: ["red", "orange"]
                    }
                });
            }
        };
    })
    .directive('scrollBottom', function () {
        return {
            scope: {
                scrollBottom: "="
            },
            link: function (scope, element) {
                scope.$watchCollection('scrollBottom', function (newValue) {
                    if (newValue) {
                        $(element).scrollTop($(element)[0].scrollHeight);
                    }
                });
            }
        }
    })
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('vectorMap', vectorMap)
    .directive('sparkline', sparkline)
    .directive('icheck', icheck)
    .directive('ionRangeSlider', ionRangeSlider)
    .directive('dropZone', dropZone)
    .directive('responsiveVideo', responsiveVideo)
    .directive('chatSlimScroll', chatSlimScroll)
    .directive('customValid', customValid)
    .directive('fullScroll', fullScroll)
    .directive('closeOffCanvas', closeOffCanvas)
    .directive('clockPicker', clockPicker)
    .directive('landingScrollspy', landingScrollspy)
    .directive('fitHeight', fitHeight)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('slimScroll', slimScroll)
    .directive('starRating', starRating)
    .directive('starRatingShow', starRatingShow)
    .directive('averageRating', averageRating)
    .directive('backImg', backgroundImage)
    .directive('myAngularDirective', myAngularDirective)
    .directive('test', test)
    .directive('andyDraggable', andyDraggable)
    .directive('colorPicker', colorPicker)
    .directive('editElement', editElement)
    .directive('zoomer', zoomer)
    .directive('editContent', editContent)
    .directive('fullPath', fullPath)
    .directive('step', step)
    .directive('datePicker', datePicker)
    .directive('clockPicker', clockPicker)
    .directive('stopWatch', stopWatch)
    .directive('touchSpin', touchSpin);





