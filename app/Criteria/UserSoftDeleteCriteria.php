<?php

namespace App\Criteria;


use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class AuthCriteria
 * @package namespace App\Criteria;
 */
class UserSoftDeleteCriteria implements CriteriaInterface
{
    private $auth;
    /**
     * AuthCriteria constructor.
     */


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
        $model = $model->whereNull('deleted_at');
        return $model;

    }
}
