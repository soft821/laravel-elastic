<?php

namespace App\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class AuthParentCriteriaCriteria
 * @package namespace App\Criteria;
 */
class AuthParentCriteriaCriteria implements CriteriaInterface
{

    private $parentModel;
    private $auth;

    /**
     * AuthParentCriteriaCriteria constructor.
     */
    public function __construct($parentModel, $auth)
    {
        $this->parentModel = $parentModel;
        $this->auth = $auth;
    }

    /**
     * Apply criteria in query repository
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        $model = $model->whereHas($this->parentModel, function ($query) {
            $query->where('user_id', '=', $this->auth->id());
        });
        return $model;
    }
}
