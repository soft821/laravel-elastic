<?php

namespace App\Repositories;

use App\Models\PhotoCat;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PhotoCatRepository
 * @package App\Repositories
 * @version July 10, 2018, 11:37 am AEST
 *
 * @method PhotoCat findWithoutFail($id, $columns = ['*'])
 * @method PhotoCat find($id, $columns = ['*'])
 * @method PhotoCat first($columns = ['*'])
 */
class PhotoCatRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'photo_id',
		'label',
		'confidence',
		'cat_0',
		'cat_1',
		'cat_2',
		'cat_3',
		'cat_4',
		'cat_5',
		'cat_6',
		'cat_7'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return PhotoCat::class;
	}
}
