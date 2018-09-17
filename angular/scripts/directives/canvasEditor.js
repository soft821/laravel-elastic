/**
 * Created by anthonylucas on 21/11/2017.
 */

var canvasEditor = function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var isDrawingMode = false;
            var timer = 0;
            var type = 1;
            var container = $("#container");
            var firstTime = true;

            var colors = [];
            colors[1] = 'rgba(236,71,88,0.2)';
            colors[2] = 'rgba(248,172,89,0.2)';
            colors[3] = 'rgba(26,179,148,0.2)';
            colors[4] = 'rgba(26,123,185,0.2)';


            var color = colors[1];

            var last_position = {};
            var scrollDown = function (o) {

                var event = o.e;
                var pointer = canvas.getPointer(o.e);

                if (event.movementY === -1) {
                    //up
                    //container[0].scrollTop -= 5;
                }
                if (event.movementY === 1) {
                    //down
                    if ((Math.abs(canvas._offset.top) + pointer.y) > (container[0].scrollTop - container.height()) && container.height() < Math.abs(canvas._offset.top) + pointer.y) {
                        // container[0].scrollTop += 10;
                    }
                }

            };

            var Rectangle = (function () {
                function Rectangle(canvas)
                {
                    var inst = this;
                    this.canvas = canvas;
                    this.className = 'Rectangle';
                    this.isDrawing = false;
                    this.bindEvents();
                    this.objectSelected = false;
                    this.objectScaling = false;
                }

                Rectangle.prototype.bindEvents = function () {
                    var inst = this;
                    inst.canvas.on('mouse:down', function (o) {

                        var d = new Date();
                        if ((d.getTime() - timer) < 300) {
                            scope.$apply(function () {
                                scope.changeConfiguration(o.target);
                            });
                        }

                        if (!isDrawingMode) {
                            return;
                        }

                        if (!inst.objectSelected && !inst.objectScaling)
                            inst.onMouseDown(o);

                        scope.$apply(function () {
                            scope.emptyType();
                        });
                        isDrawingMode = false;
                    });
                    inst.canvas.on('mouse:move', function (o) {
                        inst.onMouseMove(o);
                    });


                    inst.canvas.on("object:selected", function (options) {
                        options.target.bringToFront();
                    });


                    inst.canvas.on('mouse:up', function (o) {
                        var d = new Date();
                        timer = d.getTime();

                        if (!inst.objectScaling)
                            inst.onMouseUp(o);
                    });
                    inst.canvas.on('object:moving', function (o) {
                        inst.disable();
                        scrollDown(o);
                    });


                    inst.canvas.on("object:selected", function (options) {
                        options.target.bringToFront();
                        inst.objectSelected = true;
                    });

                    inst.canvas.on("selection:cleared", function (options) {
                        inst.objectSelected = false;
                    });

                    inst.canvas.on("object:scaling", function (o) {
                        inst.objectScaling = true;
                        scrollDown(o);
                    });

                    inst.canvas.on("object:modified", function (o) {

                        inst.objectScaling = false;

                        var target = o.target;
                        /*if (!target || target.type !== 'rect') {
                         return;
                         }*/
                        var sX = target.scaleX;
                        var sY = target.scaleY;
                        target.width = Math.abs(Math.ceil(target.width * sX));
                        target.height = Math.abs(Math.ceil(target.height * sY));

                        target.top = Math.abs(Math.floor(target.top));
                        target.left = Math.abs(Math.floor(target.left));

                        target.scaleX = 1;
                        target.scaleY = 1;
                        target.setCoords();
                        inst.canvas.renderAll();
                        //inst.canvas.calcOffset();
                        scope.updateOneObject(target, 0);
                    });
                };
                Rectangle.prototype.onMouseUp = function (o) {
                    var inst = this;
                    inst.disable();
                    scope.$apply(function () {
                        scope.changeConfiguration(o.target);

                        if (o.target.id === "")
                            scope.updateOneObject(o.target, 0);
                    });
                };


                Rectangle.prototype.onMouseMove = function (o) {
                    var inst = this;

                    if (!inst.isEnable()) {
                        return;
                    }
                    var pointer = inst.canvas.getPointer(o.e);
                    var activeObj = inst.canvas.getActiveObject();


                    activeObj.fill = color;
                    activeObj.typeId = type;

                    if (origX > pointer.x) {
                        activeObj.set({left: Math.abs(Math.floor(pointer.x))});
                    }
                    if (origY > pointer.y) {
                        activeObj.set({top: Math.abs(Math.floor(pointer.y))});
                    }

                    activeObj.set({width: Math.abs(Math.ceil(origX - pointer.x))});
                    activeObj.set({height: Math.abs(Math.ceil(origY - pointer.y))});

                    activeObj.setCoords();
                    inst.canvas.renderAll();
                    scrollDown(o);
                    //inst.canvas.calcOffset();

                };

                Rectangle.prototype.onMouseDown = function (o) {
                    var inst = this;
                    inst.enable();

                    var pointer = inst.canvas.getPointer(o.e);
                    origX = pointer.x;
                    origY = pointer.y;
                    color = colors[type];
                    var pageId = attrs.pageId;
                    var rect = new fabric.Rect({
                        left: Math.abs(Math.floor(origX)),
                        top: Math.abs(Math.floor(origY)),
                        originX: 'left',
                        originY: 'top',
                        width: Math.abs(Math.ceil(pointer.x - origX)),
                        height: Math.abs(Math.ceil(pointer.y - origY)),
                        angle: 0,
                        transparentCorners: true,
                        hasBorders: false,
                        hasControls: true,
                        minScaleLimit: 1,
                        perPixelTargetFind: true,
                        id: "",
                        name: "",
                        typeId: type,
                        groupID: '',
                        // fill: color,
                        page_id: pageId //scope.activePage
                    });

                    rect.setControlsVisibility({mtr: false});
                    inst.canvas.add(rect).setActiveObject(rect);
                    inst.canvas.renderAll();
                    //inst.canvas.calcOffset();
                    canvas.isDrawingMode = false;

                };

                Rectangle.prototype.isEnable = function () {
                    return this.isDrawing;
                };

                Rectangle.prototype.enable = function () {
                    this.isDrawing = true;
                };

                Rectangle.prototype.disable = function () {
                    this.isDrawing = false;
                };

                return Rectangle;
            }());

            fabric.Object.prototype.toObject = (function (toObject) {
                return function () {
                    return fabric.util.object.extend(toObject.call(this), {
                        typeId: this.typeId,
                        id: this.id,
                        meta_name: this.meta_name,
                        groupID: this.groupID,
                        page_id: this.page_id
                    });
                };
            })(fabric.Object.prototype.toObject);


            var canvasId = attrs.id;
            var width = 800;
            var height = 800;

            var canDraw = true;
            if (attrs.width)
                width = parseInt(attrs.width);

            if (attrs.height)
                height = parseInt(attrs.height);


            if (attrs.page) {
                var page = JSON.parse(attrs.page);
            }

            var resizeId = "";

            function getOptimalCanvasDimensions()
            {
                var availableWidth = container.outerWidth();
                var canvasW = 0;
                var canvasH = 0;
                if (imageW > availableWidth) {
                    canvasW = availableWidth;
                    canvasH = (canvasW * imageH) / imageW;
                } else {
                    canvasW = imageW;
                    canvasH = imageH;
                }
                return [canvasW, canvasH];
            }

            function rescaleCanvasIfNeeded()
            {
                var optimalDimensions = getOptimalCanvasDimensions();
                var offset;

                if (window.innerWidth >= 1280) {
                    offset = optimalDimensions[0] * 0.03;
                } else
                    if (window.innerWidth > 922) {
                        offset = optimalDimensions[0] * 0.05;
                    } else
                        if (window.innerWidth > 768) {
                            offset = optimalDimensions[0] * 0.15;
                        } else {
                            offset = optimalDimensions[0] * 0.15;
                        }

                var newWidth = (optimalDimensions[0] - offset);
                var newHeight = (newWidth * imageH) / imageW;

                var scaleFactor = newWidth / imageW;
                if (scaleFactor !== 1) {
                    canvas.setWidth(newWidth);
                    canvas.setHeight(newHeight);
                    canvas.setZoom(scaleFactor);
                    //canvas.calcOffset();
                    canvas.renderAll();
                }
            }

            $(window).resize(function () {
                clearTimeout(resizeId);
                resizeId = setTimeout(handleResize, 500);
            });

            function handleResize()
            {
                container.hide();
                rescaleCanvasIfNeeded();
                container.show();
            }

            var canvas = new fabric.Canvas($(element)[0], {
                allowTouchScrolling: true,
                width: width,
                height: height,
                selection: true,
                isDrawingMode: false
            });

            var pleaseWaitImg = new Image();
            var imgOnLoad = function () {
                var pug = new fabric.Image(pleaseWaitImg, {
                    width: 200,
                    height: 200,
                    left: canvas.width / 2 - 100,
                    top: canvas.height / 2 - 100,
                    scaleX: 1,
                    scaleY: 1,
                    lockMovementX: true,
                    lockMovementY: true,
                    hasBorders: false,
                    selectable: false,
                    lockRotation: true,
                    lockScalingX: true,
                    lockScalingY: true
                });
                canvas.add(pug);
            };
            pleaseWaitImg.onload = function () {
                imgOnLoad();
            };
            pleaseWaitImg.src = 'images/pleaseWait.png';

            var imageW = 0;
            var imageH = 0;
            var arrow = new Rectangle(canvas);

            var img = new Image();
            img.onload = function () {
                imageW = this.width;
                imageH = this.height;
                canvas.setHeight(this.height);
                canvas.setWidth(this.width);
                var bg = "";
                if (page) {
                    if (page.page_image_url)
                        bg = page.page_image_url;
                }
                canvas.clear();
                canvas.renderAll();
                canvas.setBackgroundImage(bg, canvas.renderAll.bind(canvas),
                    {
                        width: canvas.width,
                        height: canvas.height,
                        left: 0,
                        top: 0,
                        originX: 'left',
                        originY: 'top'
                    });
                handleResize();

                for (var m = 0; m < page.data.length; m++) {

                    var coors = JSON.parse((page.data[m].coords));

                    var rect = new fabric.Rect({
                        left: Math.floor(coors.x),
                        top: Math.floor(coors.y),
                        originX: 'left',
                        originY: 'top',
                        width: Math.ceil(coors.w),
                        height: Math.ceil(coors.h),
                        angle: 0,
                        transparentCorners: true,
                        hasBorders: false,
                        hasControls: true,
                        //minScaleLimit: 1,
                        perPixelTargetFind: true,
                        id: page.data[m].id,
                        meta_name: page.data[m].meta_name,
                        typeId: page.data[m].meta_type,
                        groupID: parseInt(page.data[m].group_id),
                        fill: colors[page.data[m].meta_type],
                        page_id: page.data[m].page_id
                    });

                    rect.setControlsVisibility({mtr: false});
                    canvas.add(rect);
                    canvas.renderAll();
                }
            };

            img.onerror = function (error) {
            };

            if (page) {
                if (page.page_image_url) {
                    $timeout(function () {
                        img.src = page.page_image_url;
                    }, 0);
                }
            }

            var clear = function () {
                var bg = canvas.backgroundImage;
                canvas.clear();
                canvas.setBackgroundImage(bg, canvas.renderAll.bind(canvas),
                    {
                        width: canvas.width,
                        height: canvas.height,
                        left: 0,
                        top: 0,
                        originX: 'left',
                        originY: 'top'
                    });
                canvas.renderAll();
                handleResize();
            };

            /*canvas.on({
                'object:moving': onChange,
                'object:scaling': onChange,
                'object:modified': onChange
            });*/


            function onChange(options)
            {
                canvas.renderAll();
                options.target.setCoords();
                canvas.forEachObject(function (obj) {
                    if (obj === options.target) return;

                    obj.set('opacity', options.target.intersectsWithObject(obj) ? 0.5 : 1);

                    if (options.target.isContainedWithinObject(obj) || options.target.intersectsWithObject(obj) || obj.isContainedWithinObject(options.target)) {
                        obj.right = obj.left + obj.width;
                        obj.bottom = obj.top + obj.height;
                        options.target.right = options.target.left + options.target.width;
                        options.target.bottom = options.target.top + options.target.height;

                        var distx = ((obj.left + obj.width) / 2) - ((options.target.left + options.target.width) / 2);
                        var disty = ((obj.top + obj.height) / 2) - ((options.target.top + options.target.height) / 2);


                        if (disty > 0) {
                            options.target.top = Math.abs(Math.floor(obj.top - options.target.height));
                        } else {
                            options.target.top = Math.abs(Math.floor(obj.top + options.target.height));

                        }
                        /*
                         if (distx > 0) {
                         options.target.left = obj.left - options.target.width;
                         } else {
                         options.target.left = obj.left + options.target.width;
                         }
                         */
                    } else {
                        obj.opacity = '1';
                        options.target.lockMovementX = false;
                        options.target.lockMovementY = false;

                    }
                })
            }


            var changeTypes = function (e) {

                if (firstTime) {
                    scope.entity.states[0].status = 3;
                    firstTime = false;
                }
                var elmId = e.target.id;

                if (elmId === "explainerText") {
                    type = 1;
                } else
                    if (elmId === "inputFields") {
                        type = 2;
                    } else
                        if (elmId === "paymentSection") {
                            type = 3;
                        } else
                            if (elmId === "signatureArea") {
                                type = 4;
                            }

                color = colors[type];
                isDrawingMode = true;
            };

            $("#inputFields").click(changeTypes);
            $("#explainerText").click(changeTypes);
            $("#paymentSection").click(changeTypes);
            $("#signatureArea").click(changeTypes);

            $("#removeObject").click(function () {

                if (scope.selectedObject) {
                    canvas.remove(canvas.getActiveObject());
                    //canvas.remove(scope.selectedObject);
                    if (scope.selectedObject.id) {
                        scope.deleteObject(scope.selectedObject);
                    }
                }
                scope.hideConfigurePanel();
                canvas.renderAll();
            });


            $("#clearAll").click(function () {
                clear();
                scope.hideConfigurePanel();
                scope.deleteAll();
            });

            var autoSave = function () {
                scope.update(canvas);
                imgOnLoad();
                clear();
            };


            $("#save").click(function () {
                autoSave();
            });

            scope.$watch('selectedObject.typeId', function (newValue, oldValue, scope) {
                if (scope.selectedObject) {
                    if (scope.selectedObject.typeId) {
                        scope.selectedObject.set("fill", colors[scope.selectedObject.typeId]);
                        canvas.renderAll();
                    }
                }
            });


            $(document).on('keydown', function (e) {
                if (e.keyCode == 46 || e.keyCode == 8) {
                    if (scope.selectedObject) {
                        canvas.remove(canvas.getActiveObject());
                        //canvas.remove(scope.selectedObject);
                        if (scope.selectedObject.id) {
                            scope.deleteObject(scope.selectedObject);
                        }
                    }
                    scope.hideConfigurePanel();
                    canvas.renderAll();
                }
            });

        }
    }
};