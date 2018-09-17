/**
 * Created by Admin on 12/19/2017.
 */
function formBuilder($timeout)
{
    'use strict'
    return {
        scope: {
            save: "="
        },
        restrict: 'A',
        link: function (scope, element, attr) {

            var changes = -1,
                docFields = [],
                builderLoaded = false,
                OptionFields = [],
                preview = $('#preview'),
                renderedForm = $('#preview-content'),
                formBuilder,
                availableFieldTypes = [
                    {id: 1, type: "paragraph", icon: "¶"},
                    {id: 2, type: "text", icon: ""},
                    {id: 3, type: "button", icon: "✎"},
                    {id: 4, type: "textarea", icon: "$"}];
            var templates = {
                paypal: function (fieldData) {
                    return {
                        field: '<button id="' + fieldData.name + '">' + fieldData.label
                        /*onRender: function () {
                            //$(document.getElementById(fieldData.name));
                        }*/
                    };
                }
            };


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

            var update = function () {
                if (formBuilder.actions) {
                    var formData = formBuilder.actions.getData('xml'),
                        formDataJson = formBuilder.actions.getData('json'),
                        formRenderOpts = {
                            dataType: 'json',
                            formData: formDataJson
                        };
                    var renderedForm = $('<div>');
                    renderedForm.formRender(formRenderOpts);
                    scope.save(formData, renderedForm.html(), formDataJson);
                }
            };
            var showPreview = function (formData) {
                var formRenderOpts = {
                    dataType: 'json',
                    formData: formData
                };
                var renderContainer = $('<form/>');
                renderContainer.formRender(formRenderOpts);
                var style = "<style>" +
                    ".header-bg{background-color:#f6f6f6;" +
                    "}.p-head{padding: 20px 0;}.m-t-30{margin-top:30px}.p-l-0{padding-left: 0;}" +
                    ".p-l-50{padding-left: 50px;}" +
                    "</style>";
                var html = '<!doctype html><title>Form Preview</title>' +
                    '<head><link href="//fonts.googleapis.com/css?family=Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic" rel="stylesheet" type="text/css" />' +
                    '<link href="https://static.qgov.net.au/assets/v3/latest/css/qg-main.css" type="text/css" rel="stylesheet">' +
                    '<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">' +
                    style +
                    '</head>' +
                    '<body class="container-fluid">' +
                    '<div class="row header-bg m-t-30 p-head" ><div class="col-md-10 p-l-50"><img src="https://static.qgov.net.au/assets/v2/images/skin/qg-coa.svg"  height:auto" class="img-responsive col-md-4 p-l-0"/></div></div>' +
                    '<div class="row">' +
                    '<nav id="qg-breadcrumb" role="navigation" aria-label="breadcrumb navigation" aria-labelledby="breadcrumb-heading" class="collapse">' +
                    '<h2 id="breadcrumb-heading" class="qg-visually-hidden">You are here:</h2>' +
                    '<ol class="list-inline">' +
                    '<li><a href="https://www.qld.gov.au/">Queensland Government home</a></li>' +

                    ' </ol>' +

                    '</nav>' +
                    '' +

                    '</div>' +
                    '<div class="row">' +
                    '' +
                    '<div class=col-md-3>' +
                    '<img src="images/leftpanel.png"><br/>' +
                    '<h4>Are you moving to Queensland?</h4> Support is available to help you settle in, <a href="#">click here</a>.' +
                    '</div>' +
                    '<div class="col-md-6"><br/><br/><h1 >Welcome</h1><hr>' + renderContainer.html() + '</div></div>' +
                    '<div class="col-md-3">' +
                    '<div><h4>Need Help?</h4>' +
                    '<h5>CALL 13 QGOV (13 74 68)</h5>' +
                    '</div><hr/>' +
                    '<h4>Stay Connected</h4>' +
                    '<a class="qg-accessibility-off" href="http://www.facebook.com/share.php?u=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=Facebook" title="Facebook"><span class="fa fa-facebook fa-2x qg-share-icon" aria-hidden="true"></span></a>' +
                    '<a class="qg-accessibility-off" href="http://twitter.com/home?status=Twitter+https://qld-gov-au.github.io/web-template-release/layout.html" title="Twitter"><span class="fa fa-twitter fa-2x qg-share-icon" aria-hidden="true"></span></a>' +
                    '<a class="qg-accessibility-off" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=LinkedIn&amp;source=qld-gov-au.github.io" title="LinkedIn"><span class="fa fa-linkedin fa-2x qg-share-icon" aria-hidden="true"></span></a>' +
                    '' +
                    '' +
                    'As we develop projects and activities as part of the <b>Queensland Government Strategy</b>, you can join the conversation through forums, polls, crowd-sourcing ideas and feedback. To join now, <i>register with us</i>.' +
                    '</div><hr/>' +


                    '<div id="qg-options" class="row">' +
                    '<div id="qg-share" class="qg-share"><h2>Share:</h2>' +
                    '<ul class="navbar navbar-right">' +
                    '<li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="http://www.facebook.com/share.php?u=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=Facebook" title="Facebook"><span class="fa fa-facebook fa-2x qg-share-icon" aria-hidden="true"></span><span class="title qg-visually-hidden" "="">Facebook</span></a>' +
                    '</li><li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="http://twitter.com/home?status=Twitter+https://qld-gov-au.github.io/web-template-release/layout.html" title="Twitter"><span class="fa fa-twitter fa-2x qg-share-icon" aria-hidden="true"></span><span class="title qg-visually-hidden" "="">Twitter</span></a>' +
                    '</li><li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=LinkedIn&amp;source=qld-gov-au.github.io" title="LinkedIn"><span class="fa fa-linkedin fa-2x qg-share-icon" aria-hidden="true"></span><span class="title qg-visually-hidden" "="">LinkedIn</span></a>' +
                    '</li>' +
                    '<li id="shareDropdown" class="dropdown dropdown-menu-right">' +
                    '<button id="shareDropdownToggle" class="qg-share-link noicon" title="share" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<span class="fa fa-share-alt fa-2x" aria-hidden="true"></span><span class="qg-visually-hidden">Share</span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" aria-labelledby="shareDropdownToggle">' +
                    '<li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="http://www.digg.com/submit?phase=2&amp;url=https://qld-gov-au.github.io/web-template-release/layout.html&amp;title=Digg" title="Digg"><span class="fa fa-digg fa-2x qg-share-icon" aria-hidden="true"></span><span class="title " "="">Digg</span></a>' +
                    '</li><li>' +
                    '<a class="qg-share-link qg-accessibility-off" href="https://plus.google.com/share?url=https://qld-gov-au.github.io/web-template-release/layout.html" title="Google+"><span class="fa fa-google-plus fa-2x qg-share-icon" aria-hidden="true"></span><span class="title " "="">Google+</span></a>' +
                    '</li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul></div>' +

                    '<div id="qg-feedback-btn">' +
                    '<button class="btn btn-default qg-toggle-btn collapsed qg-icon" id="page-feedback-useful" data-toggle="collapse" data-target="#qg-page-feedback">Feedback</button>' +
                    '</div>' +
                    '</div>' +

                    '<footer>' +
                    '<div class="qg-site-map row">' +

                    '<div>' +
                    //                    '<h3>'+
                    //                    '<a href="https://www.qld.gov.au/">Queensland Government</a>'+
                    //                '<button class="btn btn-link qg-toggle-icon-right collapsed visible-xs-inline-block" data-toggle="collapse" data-target="#footer-info-qg" aria-expanded="false" aria-controls="footer-info-qg"><span class="sr-only">More Queensland Government pages</span>&nbsp;</button>'+
                    //                '</h3>'+
                    //                '<ul class="collapse" id="footer-info-qg">'+
                    //                    '<li><a href="https://www.qld.gov.au/about/contact-government/contacts/">Government contacts</a></li>'+
                    //                '<li><a href="https://www.qld.gov.au/about/contact-government/have-your-say/">Have your say</a></li>'+
                    //                '<li><a href="https://www.qld.gov.au/about/staying-informed/">Staying informed</a></li>'+
                    //                '<li><a href="https://www.qld.gov.au/about/government-jobs/">Government jobs</a></li>'+
                    //                '<li><a href="https://www.qld.gov.au/about/how-government-works/">How government works</a></li>'+
                    //                '<li><a href="https://data.qld.gov.au/">Queensland Government data</a></li>'+
                    //                '<li><a href="https://publications.qld.gov.au/">Queensland Government publications</a></li>'+
                    //                '<li><a href="https://www.forgov.qld.gov.au/?utm_medium=website&amp;utm_source=qgov-site&amp;utm_campaign=dsiti-for-gov&amp;utm_content=swe-footer">For government employees</a></li>'+
                    //                '</ul>'+

                    '<img src="images/leftpanel.png"><br/>' +
                    '<div>' +
                    '<h3>' +
                    '<a href="https://www.qld.gov.au/queenslanders/">For Queenslanders</a>' +
                    '<button class="btn btn-link qg-toggle-icon-right collapsed visible-xs-inline-block" data-toggle="collapse" data-target="#footer-info-for-qld" aria-expanded="false" aria-controls="footer-info-qg"><span class="sr-only">More Queensland Government pages</span>&nbsp;</button>' +
                    '</h3>' +
                    '<ul class="col-2 collapse" id="footer-info-for-qld">' +
                    '<li><a href="https://www.qld.gov.au/transport/">Transport and motoring</a></li>' +
                    '<li><a href="https://www.qld.gov.au/jobs/">Employment and jobs</a></li>' +
                    '<li><a href="https://www.qld.gov.au/housing/">Homes and housing</a></li>' +
                    '<li><a href="https://www.qld.gov.au/education/">Education and training</a></li>' +
                    '<li><a href="https://www.qld.gov.au/community/">Community support</a></li>' +
                    '<li><a href="https://www.qld.gov.au/health/">Health and wellbeing</a></li>' +
                    '<li><a href="https://www.qld.gov.au/emergency/">Emergency services and safety</a></li>' +
                    '<li><a href="https://www.qld.gov.au/about/">About Queensland and its government</a></li>' +
                    '<li><a href="https://www.qld.gov.au/families/">Parents and families</a></li>' +
                    '<li><a href="https://www.qld.gov.au/disability/">People with disability</a></li>' +
                    '<li><a href="https://www.qld.gov.au/seniors/">Seniors</a></li>' +
                    '<li><a href="https://www.qld.gov.au/atsi/">Aboriginal and Torres Strait Islander peoples</a></li>' +
                    '<li><a href="https://www.qld.gov.au/youth/">Youth</a></li>' +
                    '<li><a href="https://www.qld.gov.au/environment/">Environment, land and water</a></li>' +
                    '<li><a href="https://www.qld.gov.au/law/">Your rights, crime and the law</a></li>' +
                    '<li><a href="https://www.qld.gov.au/recreation/">Recreation, sport and arts</a></li>' +
                    '</ul>' +
                    '</div>' +

                    '<div>' +
                    '<h3>' +
                    '<a href="http://www.business.qld.gov.au/">Business and industry</a>' +
                    '<button class="btn btn-link qg-toggle-icon-right collapsed visible-xs-inline-block" data-toggle="collapse" data-target="#footer-info-bi" aria-expanded="false" aria-controls="footer-info-qg"><span class="sr-only">More Queensland Government pages</span>&nbsp;</button>' +
                    '</h3>' +
                    '<ul class="collapse col-md-12" id="footer-info-bi">' +
                    '<li><a href="https://www.business.qld.gov.au/starting-business">Starting a business</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/running-business">Running a business</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/running-business/employing">Employing people</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/running-business/employing/payroll-tax">Payroll tax</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries">Industries</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest">Investing in Queensland</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/chinese-s" lang="zh">昆士兰州的投资机会</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/chinese-t" lang="zh">昆士蘭州的投資機會</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/japanese" lang="ja">クイーンズランド州への投資機会</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/korean" lang="ko">퀸즈랜드 투자 기회</a></li>' +
                    '<li><a href="https://www.business.qld.gov.au/industries/invest/invertir-turismo" lang="sp">Oportunidades de inversión en Queensland</a></li>' +
                    '</ul>' +
                    '</div>' +

                    '</div>' +

                    '<div class="qg-legal row">' +
                    '<ul class="list-inline">' +
                    '<li><a href="https://www.qld.gov.au/contact-us/" class="">Contact us</a></li>' +
                    '<li><a href="https://www.qld.gov.au/help/">Help</a></li>' +
                    '<li><a href="https://www.qld.gov.au/legal/copyright/" class="">Copyright</a></li>' +
                    '<li><a href="https://www.qld.gov.au/legal/disclaimer/">Disclaimer</a></li>' +
                    '<li><a href="https://www.qld.gov.au/legal/privacy/">Privacy</a></li>' +
                    '<li><a href="https://www.qld.gov.au/right-to-information/">Right to information</a></li>' +
                    '<li><a href="https://www.qld.gov.au/help/accessibility/">Accessibility</a></li>' +
                    '<li><a href="http://www.smartjobs.qld.gov.au/">Jobs in Queensland Government</a></li>' +
                    '<li id="link-languages"><a href="https://www.qld.gov.au/languages/">Other languages</a></li>' +
                    '</ul>' +
                    '<p>© The State of Queensland 1995–2018</p>' +
                    '<p><a href="https://www.qld.gov.au/" accesskey="1">Queensland Government</a></p>' +
                    '</div>' +

                    '</footer>' +
                    '</body></html>';


                var h = screen.height;
                var w = screen.width;

                var formPreviewWindow = window.open('', 'formPreview', 'toolbar=no ,scrollbars=yes,location=0,status=no,titlebar=no,menubar=no,width=' + w + ',height=' + h);
                formPreviewWindow.document.body.innerHTML = '';
                html = '';

                formPreviewWindow.document.write(html);

                // formPreviewWindow.document.head.appendChild(style);
            };

            var createEditor = function () {
                var fields = JSON.parse(attr.fields);


                var html = attr.html;
                var OptionFields = [];


                for (var i = 0; i < fields.length; i++) {

                    var obj = getType(fields[i]);
                    var templateName = obj.type + '_' + Math.floor((Math.random() * 10000) + 1);
                    docFields.push(fields[i].label);
                    var temp =
                        {
                            label: fields[i].label,
                            //type: obj.type,
                            //subtype: obj.type,
                            attrs: {
                                type: obj.type
                            },
                            icon: obj.icon,
                            name: templateName
                        };

                    var index = OptionFields.indexOf(temp);

                    if (index === -1) {
                        if (fields[i].label !== "") {
                            OptionFields.push(temp);
                        }
                    }
                }

                var count = 0;
                count++;
                $(element).empty();
                var id = attr.id;
                var content = $("#" + id).empty();
                debugger;
                formBuilder = $(content[0]).formBuilder({
                    fields: OptionFields,
                    //templates: templates,
                    // showActionButtons: false,
                    disabledActionButtons: ['data', 'save', 'clear'],
                    // defaultFields: [{type: 'text', name: 'first-name'}], //replaceFields,
                    dataType: 'json',
                    append: false,
                    formData: html,
                    fieldRemoveWarn: true,
                    actionButtons: [
                        {
                            id: 'save-all',
                            className: 'btn btn-primary text-white',
                            label: 'Save',
                            type: 'button',
                            events: {
                                click: function (e, data) {
                                    update();
                                }
                            }
                        },
                        {
                            id: 'preview',
                            className: 'btn btn-success text-white',
                            label: 'Preview',
                            type: 'button',
                            events: {
                                click: function (e, data) {
                                    var formData = formBuilder.actions.getData('json');

                                    showPreview(formData);


                                    renderedForm.formRender(formRenderOpts);
                                }
                            }
                        }, {
                            id: 'clear-all',
                            className: 'btn btn-danger text-white',
                            label: 'Clear',
                            type: 'button',
                            events: {
                                click: function () {
                                    formBuilder.actions.clearFields();
                                    //update();
                                }
                            }
                        }],
                    disableFields: [
                        'autocomplete',
                        'file',
                        'date',
                        'paragraph',
                        'button',
                        'checkbox-group',
                        'header',
                        'number',
                        'select',
                        'radio-group',
                        'text',
                        'hidden',
                        'textarea'
                    ],
                    typeUserAttrs: {
                        paypal: {
                            stripeKey: {
                                label: 'stripe key',
                            },
                            amount: {
                                label: 'amount'
                            }
                        }
                    }
                });
                formBuilder.promise.then(function (fb) {
                    // fb.actions.clearFields();
                    var local = fb.actions.toLocaleString();
                    builderLoaded = true;
                    /* var allFields = $('.frmb-control li');
                     var exist = [];

                     for (var i = 0; i < allFields.length; i++) {
                     var ex = false;
                     for (var n = 0; i < docFields.length; n++) {
                     if ((allFields[i].innerHTML).indexOf(docFields[n]) !== -1) {
                     if (exist.indexOf(allFields[i].innerHTML) !== -1) {
                     $(allFields[i]).remove();
                     }
                     {
                     exist.push(allFields[i].innerHTML);
                     ex = true;
                     break;
                     }
                     }
                     }
                     if (ex === false) {
                     $(allFields[i]).remove();
                     }
                     }*/
                    //$('li.icon-file-input,li.icon-hidden-input', '.frmb-control').remove();
                });
            };

            $timeout(createEditor, 500);

            var lastChanges = "";

            scope.$watch(function () {
                    return element.html();
                },
                function (newVal, oldVal) {
                    if (builderLoaded === true && newVal !== oldVal) {
                        if (changes > 0) {
                            if ($(newVal).find('.stage-wrap').html() !== $(oldVal).find('.stage-wrap').html()) {
                                //debugger;
                                var rendered = $('<div>');
                                rendered.formRender({
                                    dataType: 'json',
                                    formData: formBuilder.actions.getData('json')
                                });
                                var newChanges = rendered.html();
                                if (lastChanges !== newChanges) {
                                    lastChanges = newChanges;
                                    update();
                                }
                            }
                        } else
                            if (changes === -1) {
                                changes = 1;
                            }
                    }
                }
            );


            $("#form-edit").click(function () {
                preview.addClass('hide');
                preview.removeClass('show');
                $(element).addClass('show');
                $(element).removeClass('hide');
            })
        }
    };
}