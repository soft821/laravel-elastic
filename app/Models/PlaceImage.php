<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PlaceImage",
 *      required={""},
 *      @SWG\Property(
 *          property="place_image_id",
 *          description="place_image_id",
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
 *          property="path",
 *          description="path",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="sid",
 *          description="sid",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="analyzed",
 *          description="analyzed",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="is_photo",
 *          description="is_photo",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="colors",
 *          description="colors",
 *          type="string"
 *      )
 * )
 */
class PlaceImage extends Model
{

	public $table = 'place_image';

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';




	public $fillable = [
		'place_id',
		'path',
		'sid',
		'analyzed',
		'is_photo',
		'colors'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'place_image_id' => 'integer',
		'place_id' => 'integer',
		'path' => 'string',
		'sid' => 'integer',
		'analyzed' => 'boolean',
		'is_photo' => 'boolean',
		'colors' => 'string'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];


}
