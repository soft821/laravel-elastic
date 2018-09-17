@extends('emails.includes.layout')
@section('subject_footer')
    @include('emails.includes.subject_footer',['content' => ''])
@endsection
@section('content')
    <h3>Hi!</h3>
    <p>
        Your password has been reset.
    </p>
@endsection