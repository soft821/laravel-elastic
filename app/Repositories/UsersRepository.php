<?php

namespace App\Repositories;

use App\Models\Users;
use InfyOm\Generator\Common\BaseRepository;

class UsersRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'id',
		'first_name' => 'like',
		'last_name' => 'like',
		'email' => 'like',
//        'password',
//        'remember_token',
//        'stripe_id',
//        'braintree_id',
//        'paypal_email',
//        'card_brand',
//        'card_last_four',
//        'trial_ends_at',
		'username' => 'like',
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return Users::class;
	}
}
