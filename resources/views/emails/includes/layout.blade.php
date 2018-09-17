<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
@include('emails.includes.head')
<body>
<!--*|IF:MC_PREVIEW_TEXT|*-->
<!--[if !gte mso 9]><!----><span class="mcnPreviewText"
                                 style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span>
<!--<![endif]-->
<!--*|END:IF|*-->
<center>
    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
        <tr>
            <td align="center" valign="top" id="bodyCell">
                <!-- BEGIN TEMPLATE // -->

                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" valign="top" id="templateHeader" data-template-container>
                            <!--[if gte mso 9]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"
                                   style="width:600px;">
                                <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                   class="templateContainer">
                                <tr>
                                    <td valign="top" class="headerContainer">
                                        @include('emails.includes.subject')
                                        @yield('subject_footer')
                                    </td>
                                </tr>
                            </table>
                            <!--[if gte mso 9]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" id="templateBody" data-template-container>
                            <!--[if gte mso 9]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"
                                   style="width:600px;">
                                <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                   class="templateContainer">
                                <tr>
                                    <td valign="top" class="bodyContainer">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnTextBlock" style="min-width:100%;">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                    <!--[if mso]>
                                                    <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                           width="100%" style="width:100%;">
                                                        <tr>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    <td valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                           style="max-width:100%; min-width:100%;" width="100%"
                                                           class="mcnTextContentContainer">
                                                        <tbody>
                                                        <tr>

                                                            <td valign="top" class="mcnTextContent"
                                                                style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                                                                @yield('content')
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        {{--<table border="0" cellpadding="0" cellspacing="0" width="100%"--}}
                                               {{--class="mcnButtonBlock" style="min-width:100%;">--}}
                                            {{--<tbody class="mcnButtonBlockOuter">--}}
                                            {{--<tr>--}}
                                                {{--<td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;"--}}
                                                    {{--valign="top" align="center" class="mcnButtonBlockInner">--}}
                                                    {{--<table border="0" cellpadding="0" cellspacing="0"--}}
                                                           {{--class="mcnButtonContentContainer"--}}
                                                           {{--style="border-collapse: separate !important;border-radius: 3px;background-color: #1AB394;">--}}
                                                        {{--<tbody>--}}
                                                        {{--<tr>--}}
                                                            {{--<td align="center" valign="middle" class="mcnButtonContent"--}}
                                                                {{--style="font-family: Helvetica; font-size: 18px; padding: 18px;">--}}
                                                                {{--<a class="mcnButton " title="Login"--}}
                                                                   {{--href="" target="_self"--}}
                                                                   {{--style="font-weight: bold;letter-spacing: -0.5px;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">Login</a>--}}
                                                            {{--</td>--}}
                                                        {{--</tr>--}}
                                                        {{--</tbody>--}}
                                                    {{--</table>--}}
                                                {{--</td>--}}
                                            {{--</tr>--}}
                                            {{--</tbody>--}}
                                        {{--</table>--}}
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnDividerBlock" style="min-width:100%;">
                                            <tbody class="mcnDividerBlockOuter">
                                            <tr>
                                                <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                                                    <table class="mcnDividerContent" border="0" cellpadding="0"
                                                           cellspacing="0" width="100%" style="min-width:100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <span></span>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--<td class="mcnDividerBlockInner" style="padding: 18px;">
                                                        <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                                                    -->
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if gte mso 9]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" id="templateFooter" data-template-container>
                            @include('emails.includes.footer')
                        </td>
                    </tr>
                </table>
                <!-- // END TEMPLATE -->
            </td>
        </tr>
    </table>
</center>
</body>
</html>