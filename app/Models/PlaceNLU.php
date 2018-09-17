<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PlaceNLU",
 *      required={""},
 *      @SWG\Property(
 *          property="place_nlu_id",
 *          description="place_nlu_id",
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
 *          property="nlu",
 *          description="nlu",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="photos",
 *          description="photos",
 *          type="string"
 *      )
 * )
 */
class PlaceNLU extends Model
{

	public $table = 'place_nlu';

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';




	public $fillable = [
		'place_id',
		'nlu',
		'photos'
	];



	public function getNluAttribute()
	{
		return json_decode($this->attributes['nlu']);
	}

	public function objects()
	{
		$photos =  json_decode($this->attributes['photos']);

		return "hello";

	}

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'place_nlu_id' => 'integer',
		'place_id' => 'integer',
		'nlu' => 'string',
		'photos' => 'string'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];


}
