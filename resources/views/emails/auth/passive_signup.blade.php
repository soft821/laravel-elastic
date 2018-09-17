@extends('emails.includes.layout')
@section('subject_footer')
    @include('emails.includes.subject_footer',['content' => ''])
@endsection
@section('content')
    <h2>Hi
        {{ $first_name }}
    </h2>

    <h4> Welcome to the life of Riley! </h4>
    <p> We are pleased that you have chosen to use Life of Riley as your travelling experience. <br/> </ p>
    <p> You have entered the following information: <br> <br>
        {{$first_name}} {{$last_name}} <br>
        {{$email}} <br>
    </p>
    <p> To activate your account, click this link -

        {!! HTML :: link ($link, 'Enable your account') !!} </p>
    <p> The best regards </p>
    <P>
         The Life of Riley<br>
         Best Travelling Experience
    </P>
@endsection