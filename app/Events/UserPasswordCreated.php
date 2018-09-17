<?php declare(strict_types=1);

namespace App\Events;

use Illuminate\Queue\SerializesModels;

class UserPasswordCreated
{
    use SerializesModels;

    public $user;

    public function __construct(array $user)
    {
        $this->user = $user;
    }
}