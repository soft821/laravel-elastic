<?php
declare(strict_types=1);

namespace App\Models\Traits;

use Ramsey\Uuid\Uuid;

trait UseUuidPrimaryKey
{
    /**
     *
     * @return bool Always false
     */
    public function getIncrementing(): bool
    {
        return false;
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = Uuid::uuid4();
        });
    }
}