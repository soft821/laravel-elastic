<?php

namespace App\Repositories;

use App\Models\PlaceNLU;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class PlaceNLURepository
 * @package App\Repositories
 * @version July 10, 2018, 11:48 am AEST
 *
 * @method PlaceNLU findWithoutFail($id, $columns = ['*'])
 * @method PlaceNLU find($id, $columns = ['*'])
 * @method PlaceNLU first($columns = ['*'])
 */
class PlaceNLURepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'place_id',
		'nlu',
		'photos'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return PlaceNLU::class;
	}
}
