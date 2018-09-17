<?php

namespace App\Repositories;

use App\Models\Messages;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class MessagesRepository
 * @package App\Repositories
 *
 * @method Messages findWithoutFail($id, $columns = ['*'])
 * @method Messages find($id, $columns = ['*'])
 * @method Messages first($columns = ['*'])
*/
class MessagesRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'user_from',
        'user_to',
        'message',
		'created_at',
		'updated_at'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Messages::class;
    }
}
