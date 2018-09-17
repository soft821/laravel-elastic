<?php

namespace App\Repositories;

use App\Models\Roles;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class RolesRepository
 * @package App\Repositories
 * @version September 4, 2017, 11:17 pm UTC
 *
 * @method Roles findWithoutFail($id, $columns = ['*'])
 * @method Roles find($id, $columns = ['*'])
 * @method Roles first($columns = ['*'])
 */
class RolesRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'name',
		'slug',
		'description',
		'parent_id'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return Roles::class;
	}
}
