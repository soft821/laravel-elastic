<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PlaceReviewImage",
 *      required={""},
 *      @SWG\Property(
 *          property="place_review_image_id",
 *          description="place_review_image_id",
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
 *          property="text",
 *          description="text",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="path",
 *          description="path",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="src",
 *          description="src",
 *          type="string"
 *      )
 * )
 */
class PlaceReviewImage extends Model
{

	public $table = 'place_review_image';

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';




	public $fillable = [
		'place_review_id',
		'place_id',
		'text',
		'path',
		'src'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'place_review_image_id' => 'integer',
		'place_review_id' => 'integer',
		'place_id' => 'integer',
		'text' => 'string',
		'path' => 'string',
		'src' => 'string'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];


}
