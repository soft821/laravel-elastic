<?php declare(strict_types=1);

namespace App\Events;

use App\Models\Users;
use Illuminate\Queue\SerializesModels;

class UserRegistered
{
    use SerializesModels;

    public $user;

    public function __construct(Users $user)
    {
        $this->user = $user;
    }
}