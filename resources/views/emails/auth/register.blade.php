@extends('emails.includes.layout')
@section('subject_footer')
    @include('emails.includes.subject_footer',['content' => 'Welcome'])
@endsection
@section('content')
    <h2><b>Hi!</b></h2>

    <h3>Welcome to the Life of riley. We've generated your account details as follows:</h3>
    <p>E-mail :
        {{$email}}<br>
        Password:
        {{$password}}</p>

    <p>
        Best Regards,
    </p>
    <p>
        Life of riley
    </p>

@endsection