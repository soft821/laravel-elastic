<?php

namespace App\Repositories;

use App\Models\PlaceReview;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PlaceReviewRepository
 * @package App\Repositories
 * @version July 10, 2018, 11:51 am AEST
 *
 * @method PlaceReview findWithoutFail($id, $columns = ['*'])
 * @method PlaceReview find($id, $columns = ['*'])
 * @method PlaceReview first($columns = ['*'])
 */
class PlaceReviewRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'place_id',
		'timestamp',
		'user_id',
		'mode',
		'code',
		'comment',
		'_meta',
		'_has_meta',
		'watson_indexing',
		'watson_indexed',
		'_has_rev_photo'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return PlaceReview::class;
	}
}
