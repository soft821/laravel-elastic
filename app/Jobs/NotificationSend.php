<?php

namespace App\Jobs;

use App\Podcast;
use App\AudioProcessor;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Events\MessageSendCreated;
use App\Models\Users;
use App\Notifications\ChatMessageSend;

class NotificationSend implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    public function __construct()
    {
    }

 
    public function handle(MessageSendCreated $event)
    {

        $message = $event->message;
          $user = Users::find($message->user_to);
            $user->notify(new ChatMessageSend($message));

     
    }


}