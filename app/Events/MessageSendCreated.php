<?php

namespace App\Events;

use App\Models\Users;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Models\Messages;
use Illuminate\Auth\AuthManager;
use Illuminate\Support\Facades\Auth;

/**
 * Class MessageSendCreated
 * @package App\Events
 */
class MessageSendCreated implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	/**
	 * @var
	 */
	public $message;
	/**
	 * @var AuthManager
	 */

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct($message)
	{
		//

		$this->message = $message;
	}


	/**
	 * @return array
	 */
	public function broadcastWith()
	{
		return [
			'message' => $this->prepareData(),
		];
	}

	/**
	 * @return array
	 */
	protected function prepareData()
	{
		return [
			'id' => $this->message->id,
			'user_from' => $this->message->user_from,
			'user_to' => $this->message->user_to,
			'group_id' => $this->message->group_id,
			'message' => $this->message->message,
			'created' => $this->message->created,
			'modified' => $this->message->modified,
			'from' => $this->message->from,
			'to' => $this->message->to

		];
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return \Illuminate\Broadcasting\Channel|array
	 */
	public function broadcastOn()
	{

		if ($this->message->group_id) {
			return new PrivateChannel('groupchat.' . $this->message->group_id);

		} else {
			$userA = $this->message->user_from >= $this->message->user_to;

			return new PrivateChannel($userA ? 'chats.' . $this->message->from->id . '.' . $this->message->to->id : 'chats.' . $this->message->to->id . '.' . $this->message->from->id);
		}

		//return new Channel('chats');
	}
}