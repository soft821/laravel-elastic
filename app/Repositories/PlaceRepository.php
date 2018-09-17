<?php

namespace App\Repositories;

use App\Models\Place;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PlaceRepository
 * @package App\Repositories
 * @version July 10, 2018, 11:40 am AEST
 *
 * @method Place findWithoutFail($id, $columns = ['*'])
 * @method Place find($id, $columns = ['*'])
 * @method Place first($columns = ['*'])
 */
class PlaceRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
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
	 * Configure the Model
	 **/
	public function model()
	{
		return Place::class;
	}
}
