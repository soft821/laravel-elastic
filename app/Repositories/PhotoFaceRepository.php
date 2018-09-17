<?php

namespace App\Repositories;

use App\Models\PhotoFace;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PhotoFaceRepository
 * @package App\Repositories
 * @version July 10, 2018, 11:34 am AEST
 *
 * @method PhotoFace findWithoutFail($id, $columns = ['*'])
 * @method PhotoFace find($id, $columns = ['*'])
 * @method PhotoFace first($columns = ['*'])
*/
class PhotoFaceRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'photo_id',
        'face_recognized',
        'data'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return PhotoFace::class;
    }
}
