<?php

namespace App\Repositories;

use App\Models\PhotoLabel;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PhotoLabelRepository
 * @package App\Repositories
 * @version July 10, 2018, 11:32 am AEST
 *
 * @method PhotoLabel findWithoutFail($id, $columns = ['*'])
 * @method PhotoLabel find($id, $columns = ['*'])
 * @method PhotoLabel first($columns = ['*'])
 */
class PhotoLabelRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'photo_id',
		'label',
		'src',
		'confidence',
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
		return PhotoLabel::class;
	}
}
