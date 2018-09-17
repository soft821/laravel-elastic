<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PlaceMeta",
 *      required={""},
 *      @SWG\Property(
 *          property="type",
 *          description="type",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="value",
 *          description="value",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="asset_src",
 *          description="asset_src",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="asset_dl",
 *          description="asset_dl",
 *          type="boolean"
 *      )
 * )
 */
class PlaceMeta extends Model
{

	public $table = 'place_meta';

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	public $fillable = [
		'place_id',
		'type',
		'value',
		'asset_src',
		'asset_dl'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'type' => 'string',
		'value' => 'string',
		'asset_src' => 'string',
		'asset_dl' => 'boolean'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];


}
