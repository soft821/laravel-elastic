<?php declare(strict_types=1);

namespace App\Listeners;

use App\Events\UserRegistered;
use Illuminate\Support\Facades\Mail;
use Reepay\Model\Customer;
use Reepay\Api\CustomerApi;
use Reepay\ApiClient;
use Reepay\Configuration;
use Exception;
use Illuminate\Support\Facades\Log;

class CreateCustomerAfterRegister
{
    private $mail;

    /**
     * CreateCustomerAfterRegister constructor.
     */
    public function __construct(Mail $mail)
    {
        $this->mail = $mail;
    }

    /**
     * Handle the event.
     *
     * @param  UserRegistered $event
     * @return void
     */
    public function handle(UserRegistered $event)
    {
        $user = $event->user;
    }
}
