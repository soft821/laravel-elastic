<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PlaceMetaData",
 *      required={""},
 *      @SWG\Property(
 *          property="key",
 *          description="key",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="value",
 *          description="value",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="value_long",
 *          description="value_long",
 *          type="string"
 *      )
 * )
 */
class PlaceMetaData extends Model
{

	public $table = 'place_md';

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';




	public $fillable = [
		'place_id',
		'key',
		'value',
		'value_long'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'key' => 'string',
		'value' => 'string',
		'value_long' => 'string'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];


}
