@extends('emails.includes.layout')
@section('subject_footer')
    @include('emails.includes.subject_footer',['content' => 'Welcome'])
@endsection
@section('content')
    <h3>Hi!</h3>
    <p>
        user contacted you, </p>
    <p>

    <table border="0" cellpadding="0" cellspacing="0" width="100%"
           class="mcnButtonBlock" style="min-width:100%;">
        <tr>
            <td></td>
            <td class="container" width="600">
                <div class="content">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="content-wrap">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <img class="img-responsive" src=""/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block">

                                            <br/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block">
                                            send By :  {{$name}}
                                            <br/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block">
                                            subject :  {{$subject}}
                                            <br/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block">
                                            message : {{$comment}}
                                            <br/>
                                            <br/>
                                            <br/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Regards,
                                            <br/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block">
                                            <a href="mailto:{{$email}}"
                                               style="margin: 0;padding: 0;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;color: #2ba6cb;">{{$name}}</a>
                                            <br/>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer">
                        <table width="100%">
                            <tr>
                            <!--                            <td class="aligncenter content-block">Follow <a href="#">@Company</a> on Twitter.</td>-->
                            </tr>
                        </table>
                    </div>
                </div>
            </td>
            <td></td>
        </tr>
    </table>
@endsection