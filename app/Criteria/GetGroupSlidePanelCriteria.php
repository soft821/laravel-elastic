<?php

namespace App\Criteria;

use Illuminate\Auth\AuthManager;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class GetGroupSlidePanelCriteria.
 *
 * @package namespace App\Criteria;
 */
class GetGroupSlidePanelCriteria implements CriteriaInterface
{
	private $auth;

	public function __construct(AuthManager $auth)
	{
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
		return $model->where('user_from', '!=', $this->auth->id())->where('group_id', '!=', null);
	}
}