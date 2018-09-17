<?php

namespace App\Providers;


use App\Events\MessageSendCreated;
use App\Events\UserPasswordCreated;
use App\Events\UserRegistered;

use App\Jobs\NotificationSend;
use App\Models\Messages;
use App\Models\Users;

use App\Listeners\MailUserAfterRegister;
use App\Listeners\CreateCustomerAfterRegister;


use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{

	/**
	 * The event handler mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = [
		UserPasswordCreated::class => [
			MailUserAfterRegister::class
		],
		UserRegistered::class => [
			CreateCustomerAfterRegister::class
		],
		MessageSendCreated::class => [
			NotificationSend::class
		],
	];

	/**
	 * Register any other events for your application.
	 *
	 * @return void
	 */
	public function boot()
	{
		parent::boot();

		Users::created(function (Users $user) {
			event(new UserRegistered($user));
		});
		Messages::created(function (Messages $message) {
			event(new MessageSendCreated($message));
		});


	}
}
