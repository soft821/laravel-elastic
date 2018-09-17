<?php

namespace App\Criteria;

use App\Models\Users;
use Illuminate\Auth\AuthManager;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


/**
 * Class AuthCriteria
 * @package namespace App\Criteria;
 */
class AuthCriteria implements CriteriaInterface
{
    private $auth;

    /**
     * AuthCriteria constructor.
     */

    public function __construct(AuthManager $auth)
    {
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
        if ($this->auth->user()->inRole("GlobalAdmin") || $this->auth->user()->inRole("GeneralAdmin")) {
            return $model;
        } else {
            $model = $model->where('user_id', '=', $this->auth->id());
            return $model;
        }
    }
}
