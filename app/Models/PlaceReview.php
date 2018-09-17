<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PlaceReview",
 *      required={""},
 *      @SWG\Property(
 *          property="timestamp",
 *          description="timestamp",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="user_id",
 *          description="user_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="mode",
 *          description="mode",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="code",
 *          description="code",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="comment",
 *          description="comment",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="_meta",
 *          description="_meta",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="_has_meta",
 *          description="_has_meta",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="watson_indexing",
 *          description="watson_indexing",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="watson_indexed",
 *          description="watson_indexed",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="_has_rev_photo",
 *          description="_has_rev_photo",
 *          type="boolean"
 *      )
 * )
 */
class PlaceReview extends Model
{

	public $table = 'place_review';

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';




	public $fillable = [
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
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'timestamp' => 'integer',
		'user_id' => 'integer',
		'mode' => 'boolean',
		'code' => 'boolean',
		'comment' => 'string',
		'_meta' => 'string',
		'_has_meta' => 'boolean',
		'watson_indexing' => 'boolean',
		'watson_indexed' => 'boolean',
		'_has_rev_photo' => 'boolean'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];


}
