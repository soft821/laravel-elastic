<?php

namespace App\Repositories;

use App\Models\PlaceReviewImage;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PlaceReviewImageRepository
 * @package App\Repositories
 * @version July 10, 2018, 11:53 am AEST
 *
 * @method PlaceReviewImage findWithoutFail($id, $columns = ['*'])
 * @method PlaceReviewImage find($id, $columns = ['*'])
 * @method PlaceReviewImage first($columns = ['*'])
 */
class PlaceReviewImageRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'place_review_id',
		'place_id',
		'text',
		'path',
		'src'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return PlaceReviewImage::class;
	}
}
