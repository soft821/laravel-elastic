<?php

namespace App\Notifications;

use App\Models\Users;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Messages;

class ChatMessageSend extends Notification
{
	use Queueable;


	private $message;


	/**
	 * Create a new notification instance.
	 *
	 * @return void
	 */
	public function __construct(Messages $message)
	{
		$this->message = $message;

	}

	/**
	 * Get the notification's delivery channels.
	 *
	 * @param  mixed $notifiable
	 * @return array
	 */
	public function via($notifiable)
	{
		return ['mail', 'database'];
	}

	/**
	 * Get the mail representation of the notification.
	 *
	 * @param  mixed $notifiable
	 * @return \Illuminate\Notifications\Messages\MailMessage
	 */

	public function toFcm($notifiable)
	{


	}


	public function toMail($notifiable)
	{
		return (new MailMessage)
			->subject($this->message->from->first_name . ' ' . $this->message->from->last_name . ' has sent you a message')
			->greeting('Hello ' . $this->message->to->first_name . ' ' . $this->message->to->last_name . '!')
			->line($this->message->from->first_name . ' ' . $this->message->from->last_name . ' has sent you a message')
			->line($this->message->message)
			->action('Login to reply', 'http://localhost:7555');

	}

	/**
	 * Get the array representation of the notification.
	 *
	 * @param  mixed $notifiable
	 * @return array
	 */
	public function toArray($notifiable)
	{

		return [
			'id' => $this->message->id,
			'to' => $this->message->to->get(['first_name', 'last_name', 'id']),
			"from" => $this->message->from->get(['first_name', 'last_name', 'id']),
			"body" => $this->message->message

		];
	}
}