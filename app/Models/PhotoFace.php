<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="PhotoFace",
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
 *          property="face_recognized",
 *          description="face_recognized",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="data",
 *          description="data",
 *          type="string"
 *      )
 * )
 */
class PhotoFace extends Model
{

    public $table = 'photo_face';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';




    public $fillable = [
        'photo_id',
        'face_recognized',
        'data'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'photo_id' => 'integer',
        'face_recognized' => 'boolean',
        'data' => 'string'
    ];

	public function getDataAttribute()
	{
		$str = preg_replace('/(\w+)\s{0,1}:/', '"\1":', str_replace(array("\r\n", "\r", "\n", "\t"), "", $this->attributes['data']));
		$array_data = json_decode($str);

		return $array_data;
	}

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
    public function photo()
    {
		return $this->belongsTo(\App\Models\Photo::class);
    }
}
