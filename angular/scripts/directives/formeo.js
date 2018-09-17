function formEo($timeout, $q, $http)
{
    return {
        scope: {
            save: "="
        },
        restrict: 'A',
        link: function (scope, element, attr) {

            var formeo;
            var renderContainer;
            var formeoOpts;

            scope.$parent.$watch('formData', function (newValue, oldValue) {
                console.log('hello:' + newValue);
                if (typeof newValue !== 'undefined')
                    formeo = new window.Formeo(formeoOpts, newValue);

            });

            var style = "<style> label { }" +
                "   .header-bg{background-color:#f6f6f6;" +
                "}.p-head{padding: 20px 0;}.m-t-30{margin-top:30px}.p-l-0{padding-left: 0;}" +
                ".p-l-50{padding-left: 50px;}" +
                "#nav-section ul li {     padding: 0.6em 0.7em 0.7em 3.7em;     margin: 0;    position: relative;width: auto;}" +
                "#nav-section ul li {     padding: 0.6em 0.7em 0.7em 3.7em;     margin: 0;    position: relative;width: auto;}" +
                "</style>";


            function createEditor()
            {
                var commonFields = [
                    'button',
                    'checkbox',
                    'date-input',
                    'hidden',
                    'upload',
                    'number',
                    'radio',
                    'select',
                    'text-input',
                    'textarea',
                ];

                var formFields = [];
                formFields.push(commonFields);
                var fields = JSON.parse(attr.fields);


                var docFields = [];
                var OptionFields = [];
                var availableFieldTypes = [
                    {id: 1, type: "paragraph", icon: "paragraph"},
                    {id: 2, type: "input", icon: "text-input"},
                    {id: 3, type: "button", icon: "button"},
                    {id: 4, type: "textarea", icon: "textarea"}];


                var getType = function (object) {

                    if (object.meta_type === -3) {
                        return {id: 5, type: "paypal", icon: "$"};
                    }
                    else {
                        for (var i = 0; i < availableFieldTypes.length; i++) {
                            if (availableFieldTypes[i].id === object.meta_type) {
                                return availableFieldTypes[i];
                            }
                        }
                        return availableFieldTypes[0];
                    }

                };


                console.log(fields);

                for (var i = 0; i < fields.length; i++) {

                    var obj = getType(fields[i]);

                    var templateName = obj.type + '_' + Math.floor((Math.random() * 10000) + 1);
                    docFields.push(templateName);

                    if (obj.type === 'input') {
                        var temp =
                            {
                                config: {
                                    label: fields[i].label
                                },
                                tag: obj.type,
                                attrs: {
                                    className: 'form-control',
                                    style: 'width:100%',
                                    required: false,
                                    type: "text"
                                },

                                meta: {
                                    group: 'fields',
                                    icon: obj.icon,
                                    id: templateName
                                }

                            };
                    } else
                        if (obj.type === 'textarea') {
                            var temp =
                                {
                                    config: {
                                        label: fields[i].label
                                    },
                                    tag: obj.type,
                                    attrs: {
                                        className: 'form-control',
                                        style: 'width:100%',
                                        required: false
                                    },

                                    meta: {
                                        group: 'fields',
                                        icon: obj.icon,
                                        id: templateName
                                    }

                                };
                        } else
                            if (obj.type === 'select') {
                                console.log(obj.type);

                                var temp =
                                    {
                                        config: {
                                            label: fields[i].label
                                        },
                                        tag: obj.type,
                                        attrs: {
                                            className: 'form-control',
                                            style: 'width:100%',
                                            required: false
                                        },

                                        meta: {
                                            group: 'fields',
                                            icon: obj.icon,
                                            id: templateName
                                        }

                                    };

                            } else {

                                var temp =
                                    {
                                        config: {
                                            label: fields[i].label
                                        },
                                        tag: obj.type,
                                        attrs: {
                                            required: false
                                        },
                                        meta: {
                                            group: 'fields',
                                            icon: obj.icon,
                                            id: templateName,
                                        }

                                    };
                            }
                    formFields = docFields.concat(commonFields);
                    console.log(formFields);
                    var index = OptionFields.indexOf(temp);

                    if (index === -1) {
                        if (fields[i].label !== "") {
                            OptionFields.push(temp);
                        }
                    }
                }

                var container = document.querySelector('.build-form');
                renderContainer = document.querySelector('.render-form');
                formeoOpts = {
                    container: container,
                    i18n: {
                        preloaded: {
                            'en-US': {'row.makeInputGroup': ' Repeatable Region'}
                        }
                    },
                    allowEdit: true,
                    controls: {
                        sortable: false,
                        groupOrder: [
                            'fields',
                            'common',
                            'layout'
                        ],
                        elements: OptionFields,
                        elementOrder: {
                            common: formFields
                        }
                    },
                    events: {
                        // onUpdate: console.log,
                        // onSave: console.log
                    },
                    svgSprite: 'https://draggable.github.io/formeo/assets/img/formeo-sprite.svg',
                    debug: true,
                    sessionStorage: false,
                    editPanelOrder: ['attr', 'options']
                };


            }

            function outerHTML(node)
            {
                return node.outerHTML || new XMLSerializer().serializeToString(node);
            }


            var showPreview = function () {
                $(".render-form").show();

                formeo.render(renderContainer);

                var renderedHtml = outerHTML(renderContainer);
                renderedHtml = renderedHtml.replace(new RegExp("f-row", 'g'), "row");
                renderedHtml = renderedHtml.replace(new RegExp("f-field-group", 'g'), "form-group");
                renderedHtml = renderedHtml.replace(new RegExp("f-render-column", 'g'), "col-md-12");


                var lineStyles =
                    'li:before {content: "\f054"; }';


                var h = screen.height;
                var w = screen.width;


                $.get('views/preview.html', function (template) {
                    var html = Mustache.render(template, {content: renderedHtml});

                    var formPreviewWindow = window.open('', 'formPreview', 'toolbar=no ,scrollbars=yes,location=0,status=no,titlebar=no,menubar=no,width=' + w + ',height=' + h);
                    formPreviewWindow.document.body.innerHTML = '';
                    scope.html = html;
                    formPreviewWindow.document.write(html);

                    $(".render-form").hide();
                });


                // formPreviewWindow.document.head.appendChild(style);
            };


            $timeout(createEditor, 500);

            var toggleEdit = $('#preview');

            var toggleSave = $('#save');


            toggleEdit.click(function () {
                showPreview();

            });


            toggleSave.click(function () {


                //TODO & save and export 2 buttons


                swal({
                    title: "Save & Export",
                    text: "Your changes have been saved. You are a step closer to completing. Would you like to Export?",
                    type: "success",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Export",
                    cancelButtonText: "Save"
                }).then(function (willSave) {
                    console.log(willSave);


                    if (willSave.value) {
                        console.log('savedForm');
                        $(".render-form").show();

                        formeo.render(renderContainer);

                        var renderedHtml = outerHTML(renderContainer);
                        renderedHtml = renderedHtml.replace(new RegExp("f-row", 'g'), "row");
                        renderedHtml = renderedHtml.replace(new RegExp("f-field-group", 'g'), "form-group");
                        renderedHtml = renderedHtml.replace(new RegExp("f-render-column", 'g'), "col-md-12");


                        $http.get('views/preview.html').then(function (template) {
                            var html = Mustache.render(template.data, {content: renderedHtml});
                            $(".render-form").hide();
                            download(new Blob([html]), 'HTMLOutput-' + scope.$parent.entity.name + '.html', "text/html");
                        });


                    } else {
                        var jsonObject = JSON.stringify(JSON.parse(formeo.formData));
                        console.log(jsonObject);

                        $(".render-form").show();

                        formeo.render(renderContainer);

                        var renderedHtml = outerHTML(renderContainer);
                        renderedHtml = renderedHtml.replace(new RegExp("f-row", 'g'), "row");
                        renderedHtml = renderedHtml.replace(new RegExp("f-field-group", 'g'), "form-group");
                        renderedHtml = renderedHtml.replace(new RegExp("f-render-column", 'g'), "col-md-12");


                        $http.get('views/preview.html').then(function (template) {
                            var html = Mustache.render(template.data, {content: renderedHtml});
                            $(".render-form").hide();

                            scope.$parent.saveForm(html, jsonObject);
                        });


                    }

                });


            });


        }
    }
}
