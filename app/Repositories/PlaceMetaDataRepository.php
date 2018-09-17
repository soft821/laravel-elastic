<?php

namespace App\Repositories;

use App\Models\PlaceMetaData;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PlaceMetaDataRepository
 * @package App\Repositories
 * @version July 10, 2018, 11:45 am AEST
 *
 * @method PlaceMetaData findWithoutFail($id, $columns = ['*'])
 * @method PlaceMetaData find($id, $columns = ['*'])
 * @method PlaceMetaData first($columns = ['*'])
 */
class PlaceMetaDataRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'place_id',
		'key',
		'value',
		'value_long'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return PlaceMetaData::class;
	}
}
