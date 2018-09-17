<?php

namespace App\Repositories;

use App\Models\Photos;
use InfyOm\Generator\Common\BaseRepository;
use Prettus\Repository\Contracts\CacheableInterface;
use Prettus\Repository\Traits\CacheableRepository;

/**
 * Class PhotosRepository
 * @package App\Repositories
 * @version July 4, 2018, 4:15 am AEST
 *
 * @method Photos findWithoutFail($id, $columns = ['*'])
 * @method Photos find($id, $columns = ['*'])
 * @method Photos first($columns = ['*'])
*/
class PhotosRepository extends BaseRepository implements CacheableInterface
{
	use CacheableRepository;

	/**
     * @var array
     */
    protected $fieldSearchable = [
        'path',
        'src',
        'link',
        'aws_indexing',
        'aws_done',
        'src_done',
        'watson_done',
        'valid',
        'watson_cats_done'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Photos::class;
    }
}
