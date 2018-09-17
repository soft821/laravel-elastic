@extends('emails.includes.layout')
@section('subject_footer')
    @include('emails.includes.subject_footer',['content' => 'Welcome'])
@endsection
@section('content')
    <h3>Hi!</h3>
    <p>
        To reset your password, </p>
    <p>
    <p>
        Click below:
    </p>
    <table border="0" cellpadding="0" cellspacing="0" width="100%"
           class="mcnButtonBlock" style="min-width:100%;">
        <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;"
                valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0"
                       class="mcnButtonContentContainer"
                       style="border-collapse: separate !important;border-radius: 3px;background-color: #1AB394;">
                    <tbody>
                    <tr>
                        <td align="center" valign="middle" class="mcnButtonContent"
                            style="font-family: Helvetica; font-size: 18px; padding: 18px;">
                            <a class="mcnButton " title="Login"
                               href="http://localhost:7555/#/home/{{$token}}" target="_self"
                               style="font-weight: bold;letter-spacing: -0.5px;line-height: 100%;
                                      text-align: center;text-decoration: none;color: #FFFFFF;">
                                Reset Password
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
@endsection