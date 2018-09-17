<?php

namespace App\Repositories;

use App\Models\PlaceImage;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PlaceImageRepository
 * @package App\Repositories
 * @version July 10, 2018, 11:43 am AEST
 *
 * @method PlaceImage findWithoutFail($id, $columns = ['*'])
 * @method PlaceImage find($id, $columns = ['*'])
 * @method PlaceImage first($columns = ['*'])
 */
class PlaceImageRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'place_id',
		'path',
		'sid',
		'analyzed',
		'is_photo',
		'colors'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return PlaceImage::class;
	}
}
