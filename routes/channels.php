<?php

use App\Models\Messages;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chats.{trainer}.{client}', function ($user, $trainer, $client) {

	return true;
	return ($user->id === $trainer || ($user->id === $client));
});


Broadcast::channel('groupchat.{group}', function ($user) {

	return true;
});
?>