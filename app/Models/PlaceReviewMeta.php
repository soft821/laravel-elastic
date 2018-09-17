<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PlaceReviewMeta",
 *      required={""},
 *      @SWG\Property(
 *          property="place_review_meta_id",
 *          description="place_review_meta_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="place_review_id",
 *          description="place_review_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="place_id",
 *          description="place_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="data",
 *          description="data",
 *          type="string"
 *      )
 * )
 */
class PlaceReviewMeta extends Model
{

	public $table = 'place_review_meta';

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	public $fillable = [
		'place_review_id',
		'place_id',
		'data'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'place_review_meta_id' => 'integer',
		'place_review_id' => 'integer',
		'place_id' => 'integer',
		'data' => 'string'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];


}
