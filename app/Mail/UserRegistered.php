<?php

namespace App\Mail;

use App\Models\Users;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class UserRegistered extends Mailable
{
    use Queueable, SerializesModels;
    private $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $user)
    {
        $this->user = $user;
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
//        Log::useDailyFiles(storage_path().'/logs/laravel.log');
//        Log::info('email created@ ' . date('H:i:s'));
//        die();

        return $this->view('emails.auth.register')
            ->with([
                'email' => $this->user['username'],
                'username' => $this->user['username'],
                'password' => $this->user['password']
            ]);
    }
}
