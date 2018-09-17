<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactUs extends Mailable
{
    use Queueable, SerializesModels;
    private $message;
    /**
     * Create a new message instance.
     *
     * @return void
     */

    public function __construct($message)
    {
        //
//        $this->message = $message;
        $this->message['name'] = $message['name'];
        $this->message['subject'] = $message['event_url'];
        $this->message['email'] = $message['email'];
        $this->message['message'] = $message['comments'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.contact_us')->with(
            [
                'name' => $this->message['name'],
                'subject' => $this->message['subject'],
                'email' => $this->message['email'],
                'comment' => $this->message['message']
            ]);
    }
}
