<?php

namespace App\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;
use Illuminate\Auth\AuthManager;
/**
 * Class MessagesCriteria
 * @package namespace App\Criteria;
 */
class GetMessagesForUserCriteria implements CriteriaInterface
{
    private $userId;
    private $auth;


    
    public function __construct($userId,$auth){
            
        $this->userId = $userId;
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
           // return $model->where('user_to','=',  $this->userId )->orWhere('user_from','=',  $this->auth);

            $authObject = $this->auth;
            $userId = $this->userId;
            return $model->where(function ($query) { 
                $query->where('user_from', '=', $this->auth->id())
                    ->where('user_to', '=', $this->userId);
            })->orWhere(function($query)  {
                $query->where('user_to', '=', $this->auth->id())
                    ->where('user_from', '=', $this->userId);
            });
    }
}
