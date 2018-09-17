<?php

namespace App\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class GetMessagesForGroupCriteria.
 *
 * @package namespace App\Criteria;
 */
class GetMessagesForGroupCriteria implements CriteriaInterface
{
	private $userId;
	private $auth;


	public function __construct($userId, $auth)
	{

		$this->userId = $userId;
		$this->auth = $auth;

	}

	/**
	 * Apply criteria in query repository
	 *
	 * @param string $model
	 * @param RepositoryInterface $repository
	 *
	 * @return mixed
	 */
	public function apply($model, RepositoryInterface $repository)
	{
		$authObject = $this->auth;
		$userId = $this->userId;
		return $model->where(function ($query) {
			$query->where('user_from', '=', $this->auth->id())
				->where('user_to', '=', $this->userId)
				->where('group_id', '!=', null)
				->where('message', '!=', "");
		})->orWhere(function ($query) {
			$query->where('user_to', '=', $this->auth->id())
				->where('user_from', '=', $this->userId)
				->where('group_id', '!=', null)
				->where('message', '!=', "");
		});
	}
}