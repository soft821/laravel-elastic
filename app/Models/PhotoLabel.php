<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PhotoLabel",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="photo_id",
 *          description="photo_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="label",
 *          description="label",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="src",
 *          description="src",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="confidence",
 *          description="confidence",
 *          type="number",
 *          format="float"
 *      ),
 *      @SWG\Property(
 *          property="cat_2",
 *          description="cat_2",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="cat_3",
 *          description="cat_3",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="cat_4",
 *          description="cat_4",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="cat_5",
 *          description="cat_5",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="cat_6",
 *          description="cat_6",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="cat_7",
 *          description="cat_7",
 *          type="string"
 *      )
 * )
 */
class PhotoLabel extends Model
{

	public $table = 'photo_label';

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	public $fillable = [
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
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'id' => 'integer',
		'photo_id' => 'integer',
		'label' => 'string',
		'src' => 'string',
		'confidence' => 'float',
		'cat_2' => 'string',
		'cat_3' => 'string',
		'cat_4' => 'string',
		'cat_5' => 'string',
		'cat_6' => 'string',
		'cat_7' => 'string'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];


}
