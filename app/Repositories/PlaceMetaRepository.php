<?php

namespace App\Repositories;

use App\Models\PlaceMeta;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PlaceMetaRepository
 * @package App\Repositories
 * @version July 10, 2018, 2:58 pm AEST
 *
 * @method PlaceMeta findWithoutFail($id, $columns = ['*'])
 * @method PlaceMeta find($id, $columns = ['*'])
 * @method PlaceMeta first($columns = ['*'])
 */
class PlaceMetaRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'place_id',
		'type',
		'value',
		'asset_src',
		'asset_dl'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return PlaceMeta::class;
	}
}
