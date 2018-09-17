<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="ChatGroup",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="group_name",
 *          description="group_name",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="programme_id",
 *          description="programme_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class ChatGroup extends Model
{


	public $table = 'chat_groups';

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	protected $dates = ['deleted_at'];

	public $fillable = [
		'group_name',
		'description',
		'creator_id'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'id' => 'integer',
		'group_name' => 'string',
		'creator_id' => 'integer'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];


	public function creators()
	{
		return $this->belongsTo(Users::class, 'creator_id');
	}

	public function messages()
	{
		return $this->hasMany(Messages::class, 'group_id');
	}

}