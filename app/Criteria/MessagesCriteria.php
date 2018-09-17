<?php
namespace App\Criteria;


use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;
use Illuminate\Auth\AuthManager;
/**
 * Class MessagesCriteria
 * @package namespace App\Criteria;
 */
class MessagesCriteria implements CriteriaInterface
{

    private $auth;

    
    public function __construct(AuthManager $auth){
            
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
         return $model->where('user_from', '=', $this->auth->id())->orWhere('user_to', '=', $this->auth->id());
    }
}
