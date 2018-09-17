<?php

namespace App\Repositories;

use App\Models\Menus;
use InfyOm\Generator\Common\BaseRepository;

class MenusRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'id',
		'parent_id',
		'name',
		'tool_tips',
		'icon',
		'view_name',
		'order_number'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return Menus::class;
	}
}
