<?php

namespace App\Repositories;

use App\Models\PlaceReviewMeta;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PlaceReviewMetaRepository
 * @package App\Repositories
 * @version July 10, 2018, 11:56 am AEST
 *
 * @method PlaceReviewMeta findWithoutFail($id, $columns = ['*'])
 * @method PlaceReviewMeta find($id, $columns = ['*'])
 * @method PlaceReviewMeta first($columns = ['*'])
 */
class PlaceReviewMetaRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'place_review_id',
		'place_id',
		'data'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return PlaceReviewMeta::class;
	}
}
