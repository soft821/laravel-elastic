/**
 * Created by Anthony on 12/21/2015.
 */
$(document).ready(function () {


    var windowSize = window.innerWidth;
    if (windowSize <= 480) {
        /* alert("windowSize " + windowSize);*/
        /* var table = $('body > table > tbody > tr > td > table');*/


        var table = $('body > table ');

        table.each(function () {

                var div = $('<div />');

                var classList = this.classList;

                var tableStyle = $(this).attr('style');

                if (tableStyle) {
                    tableStyle = tableStyle.replace(/"/g, "'");
                } else {
                    tableStyle = '';
                }


                var div = $('<div style="' + tableStyle + '"/>');

                for (var i = 0; i < classList.length; i++) {
                    $(div).addClass(classList[i]);
                }

                $(this).children('tbody').children('tr').each(function () {

                    var divTr = $('<div />');
                    $(divTr).addClass("row");
                    var currentTr = $(this);
                    var sumOfMobileWidth = 0, sumRemainingTdWidth = 0.0, different = 0;

                    $('> td', currentTr).each(function () {
                        var mobileWidth = $(this).attr("data-mobileattr");
                        if (mobileWidth) {
                            sumOfMobileWidth = sumOfMobileWidth + parseFloat(mobileWidth);
                        } else {
                            different = 100 - sumOfMobileWidth;
                            var value = parseFloat($(this).css("width").replace("%", ""));
                            if (value) {
                                sumRemainingTdWidth = sumRemainingTdWidth + value;
                            }
                        }
                    })

                    $('> td', currentTr).each(function () {

                        var mobileWidth = $(this).attr("data-mobileattr");

                        var classList = this.classList;

                        $(this).css({'width': ''});

                        var style = $(this).attr('style');

                        if (style) {
                            style = style.replace(/"/g, "'");
                        } else {
                            style = '';
                        }


                        var replaceElement = $('<div style="' + style + '"/>');

                        for (var x = 0; x < classList.length; x++) {
                            $(replaceElement).addClass(classList[x]);
                        }


                        if (mobileWidth) {

                            if (mobileWidth == 0) {
                                $(replaceElement).addClass('hidden-xs');
                            }
                            else
                                if (mobileWidth == 25) {
                                    $(replaceElement).addClass('col-xs-3');
                                } else
                                    if (mobileWidth == 33.33) {
                                        $(replaceElement).addClass('col-xs-4');
                                    } else
                                        if (mobileWidth == 50) {
                                            $(replaceElement).addClass('col-xs-6');
                                        } else
                                            if (mobileWidth == 66.67) {
                                                $(replaceElement).addClass('col-xs-8');
                                            } else
                                                if (mobileWidth == 75) {
                                                    $(replaceElement).addClass('col-xs-9');
                                                } else
                                                    if (mobileWidth == 100) {
                                                        $(replaceElement).addClass('col-xs-12');
                                                    } else
                                                        if (mobileWidth == -1) {
                                                            $(replaceElement).addClass('col-xs-12');
                                                        }

                            $(replaceElement).html($(this).html()).appendTo(divTr);

                        } else {
                            var value = parseFloat($(this).css("width").replace("%", ""));
                            var size = (value / sumRemainingTdWidth);
                            if (different == 50) {
                                if (size.toFixed(1) == 0.5) {
                                    $(replaceElement).addClass('col-xs-3');
                                } else
                                    if (size.toFixed(2) == 0.33) {
                                        $(replaceElement).addClass('col-xs-2');
                                    } else
                                        if (size.toFixed(2) == 0.67) {
                                            $(replaceElement).addClass('col-xs-4');
                                        }
                            } else
                                if (different == 100) {
                                    if (size.toFixed(2) == 0.33) {
                                        $(replaceElement).addClass('col-xs-4');
                                    } else
                                        if (size.toFixed(0) == 1) {
                                            $(replaceElement).addClass('col-xs-12');
                                        } else
                                            if (size.toFixed(1) == 0.5) {
                                                $(replaceElement).addClass('col-xs-6');
                                            }
                                } else
                                    if (different == 0) {

                                        if (size.toFixed(2) == 0.25) {
                                            $(replaceElement).addClass('col-xs-3');
                                        }
                                        else
                                            if (size.toFixed(2) == 0.33) {
                                                $(replaceElement).addClass('col-xs-4');
                                            } else
                                                if (size.toFixed(1) == 0.5) {
                                                    $(replaceElement).addClass('col-xs-6');
                                                }
                                                else
                                                    if (size.toFixed(2) == 0.67) {
                                                        $(replaceElement).addClass('col-xs-8');
                                                    } else
                                                        if (size.toFixed(2) == 0.75) {
                                                            $(replaceElement).addClass('col-xs-9');
                                                        } else
                                                            if (size.toFixed(0) == 1) {
                                                                $(replaceElement).addClass('col-xs-12');
                                                            }

                                    } else {
                                        $(replaceElement).addClass('col-xs-12');
                                    }
                        }

                        $(replaceElement).html($(this).html()).appendTo(divTr);
                    })
                    $(divTr).appendTo(div);
                });
                $(this).after(div).remove();
            }
        );
    }

    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "/css/border-overide.css"
    }).appendTo("head");

    var url = window.location.href;
    var pathname = url.split("/");
    var customTemplate_id = pathname[4]; //'xQGN'
    var name_arr = [];

    var replaceUrl = pathname[0] + '//' + pathname[2] + '/' + pathname[3] + '/' + pathname[4] + '/';

    if (pathname[5]) {
        name_arr = (pathname[5]).split("?");
        if (name_arr.length > 0) {
            var name = name_arr[0];
        } else {
            var name = '';
        }
    } else {
        var name = '';
    }


    if (!customTemplate_id) {
        customTemplate_id = '80Ar'
    }
    var border = $('body').contents().find(".fr-selected-cell");
    $.each($(border), function (k) {
        $(border).removeClass("fr-selected-cell")
    });

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var modalHtml = '<div id="askNameModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">' +
        ' <form class="form-horizontal">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h4 class="modal-title"></h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p>Enter your name </p>' +
        '<div><input type="text" class="form-control" id="personalizationName"/></div>' +
        '</div>' +
        ' <div class="modal-footer">' +
        '<button type="button" class="btn btn-primary" id="okBtn">Ok</button>' +
        '</div>' +
        '</div>' +
        ' </div>' +
        '</form>' +
        '</div>';
    $("body").append(modalHtml);

    var previewer = getUrlParameter('previewer');

    if (!name && !previewer) {
        $.getJSON(dbSever + "showByHashId/" + customTemplate_id, function (result) {
            console.log(result.data);
            var fall_back_option = result.data.fall_back_option;
            if (fall_back_option == 1) {
                $('#askNameModal').modal({
                    backdrop: 'static',
                    keyboard: false
                });

            } else
                if (fall_back_option == 2) {

                } else
                    if (fall_back_option == 3) {
                        var fall_back_word = result.data.fall_back_word;

                        window.open(replaceUrl + fall_back_word, '_self');


                    } else {
                    }
        }, function (error) {
            console.log(error);
        })
    }

    $("#okBtn").click(function () {
        $('#askNameModal').modal('hide');
        var personalizationName = $("#personalizationName").val();

        if (personalizationName) {
            window.open(replaceUrl + personalizationName, '_self');
        } else {
            $('#askNameModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    })

    $("form").submit(function (event) {
        $("span#error").html('');
        var form = $(this).parents('form:first').context;
        var formAction = $(form).attr("action");
        if (!formAction) {
            event.preventDefault();
            var fields = {};
            $(form).children().find("input").each(function () {
                fields[this.name] = $(this).val();
            });
            $.ajax({
                type: "POST",
                url: dbSever + "subscribeUser",
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer '
                },
                data: {
                    fields: fields,
                    hashid: customTemplate_id
                },
                success: function (data, status) {
                    var nextPageUrl = data.data;
                    console.log("The returned data", nextPageUrl);
                    window.open(nextPageUrl + '/' + name, '_self');
                },
                error: function (error) {
                    var server_error = jQuery.parseJSON(error.responseText);
                    var errorMsg = "";
                    for (var k in server_error) {
                        if (server_error.hasOwnProperty(k)) {
                            errorMsg = server_error[k];
                        }
                    }
                    console.log("Error", server_error);
                    $("span#error").show();
                    $("span#error").append("Error<br>" + server_error.error);

                }
            });
        }
    });
});