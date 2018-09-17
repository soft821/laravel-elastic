<?php
/**
 * Created by PhpStorm.
 * User: anthonylucas
 * Date: 4/08/2017
 * Time: 12:55 PM
 */

namespace App\Listeners;


use App\Http\Requests\Request;
use App\Events\UserPasswordCreated;
use App\Mail\UserRegistered as UserMail;
use Illuminate\Mail\Mailer;


class MailUserAfterRegister
{

    private $mail;

    public function __construct(Mailer $mailer)
    {
        $this->mail = $mailer;
    }

    public function handle(UserPasswordCreated $userRegistered)
    {

        $user = $userRegistered->user;

        $this->mail->to($userRegistered->user['username'])
            ->queue(new UserMail($user));

    }
}