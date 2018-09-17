<?php

namespace App\Models;

use Elasticquent\ElasticquentTrait;
use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Place",
 *      required={""},
 *      @SWG\Property(
 *          property="name",
 *          description="name",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="lat",
 *          description="lat",
 *          type="number",
 *          format="float"
 *      ),
 *      @SWG\Property(
 *          property="lng",
 *          description="lng",
 *          type="number",
 *          format="float"
 *      ),
 *      @SWG\Property(
 *          property="jsg_id",
 *          description="jsg_id",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="jsfa_id",
 *          description="jsfa_id",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="jsfs_id",
 *          description="jsfs_id",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="jsyelp_id",
 *          description="jsyelp_id",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="jsta_id",
 *          description="jsta_id",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="domain",
 *          description="domain",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="domain_indexed",
 *          description="domain_indexed",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="url_src",
 *          description="url_src",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="url_redir",
 *          description="url_redir",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="domain_path",
 *          description="domain_path",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="merge_complete",
 *          description="merge_complete",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="place_analyzed",
 *          description="place_analyzed",
 *          type="boolean"
 *      )
 * )
 */
class Place extends Model
{

	use ElasticquentTrait;

	public $table = 'place';
	protected $primaryKey = "place_id";

	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	public $fillable = [
		'name',
		'lat',
		'lng',
		'jsg_id',
		'jsfb_id',
		'jsfa_id',
		'jsfs_id',
		'jsyelp_id',
		'jsta_id',
		'domain',
		'domain_indexed',
		'url_src',
		'url_redir',
		'domain_path',
		'merge_complete',
		'place_analyzed'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'name' => 'string',
		'lat' => 'float',
		'lng' => 'float',
		'jsg_id' => 'string',
		'jsfa_id' => 'string',
		'jsfs_id' => 'string',
		'jsyelp_id' => 'string',
		'jsta_id' => 'string',
		'domain' => 'string',
		'domain_indexed' => 'boolean',
		'url_src' => 'string',
		'url_redir' => 'string',
		'domain_path' => 'string',
		'merge_complete' => 'boolean',
		'place_analyzed' => 'boolean'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [

	];

	protected $appends = ['location'];


	protected $mappingProperties = array(
		'location' => array(
			'type' => 'geo_point'
		)
	);



	public function getLocationAttribute() {
		return [$this->lng, $this->lat];
	}

	public function meta()
	{
		return $this->hasMany(PlaceMeta::class, 'place_id');
	}

	public function meta_data()
	{
		return $this->hasMany(PlaceMetaData::class, 'place_id');
	}

	public function image()
	{
		return $this->hasMany(PlaceImage::class, 'place_id');
	}

	public function nlu()
	{
		return $this->hasMany(PlaceNLU::class, 'place_id');
	}

	public function review()
	{
		return $this->hasMany(PlaceReview::class, 'place_id');
	}


}
