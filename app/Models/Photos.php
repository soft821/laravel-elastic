<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Elasticquent\ElasticquentTrait;

/**
 * @SWG\Definition(
 *      definition="Photos",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
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
 *      ),
 *      @SWG\Property(
 *          property="link",
 *          description="link",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="aws_indexing",
 *          description="aws_indexing",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="aws_done",
 *          description="aws_done",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="src_done",
 *          description="src_done",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="watson_done",
 *          description="watson_done",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="valid",
 *          description="valid",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="watson_cats_done",
 *          description="watson_cats_done",
 *          type="boolean"
 *      )
 * )
 */
class Photos extends Model
{
	use ElasticquentTrait;


	public $table = 'photo';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';



    public $fillable = [
        'path',
        'src',
        'link',
        'aws_indexing',
        'aws_done',
        'src_done',
        'watson_done',
        'valid',
        'watson_cats_done'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'path' => 'string',
        'src' => 'string',
        'link' => 'string',
        'aws_indexing' => 'boolean',
        'aws_done' => 'boolean',
        'src_done' => 'boolean',
        'watson_done' => 'boolean',
        'valid' => 'boolean',
        'watson_cats_done' => 'boolean'
    ];

	protected $fieldSearchable = [
		'path' => 'like',
		'src' => 'like',
		'link' => 'like'
	];


	public static $rules = [
		'path' => 'required',
		'src' => 'required',
		'link' => 'required'
	];


	public function categories()
	{
		return $this->hasMany(PhotoCat::class, 'photo_id');
	}

	public function faces()
	{
		return $this->hasMany(PhotoFace::class, 'photo_id');
	}

	public function labels()
	{
		return $this->hasMany(PhotoLabel::class, 'photo_id');
	}




    
}
