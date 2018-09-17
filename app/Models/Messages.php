<?php

namespace App\Models;

use Carbon\Carbon;
use Eloquent as Model;

/**
 * @SWG\Definition(
 *      definition="Messages",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="user_from",
 *          description="user_from",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="user_to",
 *          description="user_to",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="message",
 *          description="message",
 *          type="string"
 *      )
 * )
 */
class Messages extends Model
{


	public $table = 'messages';


	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	protected $dates = ['created_at', 'updated_at'];


	public $fillable = [
		'user_from',
		'user_to',
		'message',
		'created_at',
		'updated_at',
		'group_id'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'id' => 'integer',
		'user_from' => 'integer',
		'user_to' => 'integer',
		'message' => 'string',
		'group_id' => 'integer'
	];


	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 **/
	public function from()
	{
		return $this->belongsTo(Users::class, 'user_from');
	}

	public function to()
	{
		return $this->belongsTo(Users::class, 'user_to');
	}


	public function group()
	{
		return $this->belongsTo(ProgrammeGroups::class, 'group_id');
	}
}