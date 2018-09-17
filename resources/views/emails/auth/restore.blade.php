@extends('emails.includes.layout')
@section('subject_footer')
    @include('emails.includes.subject_footer',['content' => ''])
@endsection
@section('content')
    <h2>Hi
        {{ $first_name }}
    </h2>

    <p>There was recently a request to change the password for your account.<br/></p>
    <p>
        If you have requested this change password, click the following link to reset your
        password: <br><br>
        {!! HTML::link($link, 'Reset Password') !!}<br>
        <br></p>
    <p>
        If you have not made this request, you can ignore this message and your password will remain
        same.</p>

    <p>
        The Life of Riley<br>
        The Best Travelling Experience
    </p>
@endsection
