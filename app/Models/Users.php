<?php

namespace App\Models;


use App\Models\UsersTrainers;
use App\Models\UserInvites;
use App\Listeners\MailUserAfterRegister;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\HasApiTokens;
use Ramsey\Uuid\Uuid;
use Reepay\Api\CustomerApi;
use Reepay\Model\Customer;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Auth\Passwords\CanResetPassword;
use Laravel\Cashier\Billable;


use Illuminate\Foundation\Auth\User as Authenticatable;
use DCN\RBAC\Traits\HasRoleAndPermission;
use DCN\RBAC\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;
use DCN\RBAC\Models\Role;

/**
 * @SWG\Definition(
 *      definition="Users",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="name",
 *          description="name",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="email",
 *          description="email",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="password",
 *          description="password",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="remember_token",
 *          description="remember_token",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="stripe_id",
 *          description="stripe_id",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="braintree_id",
 *          description="braintree_id",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="paypal_email",
 *          description="paypal_email",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="card_brand",
 *          description="card_brand",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="card_last_four",
 *          description="card_last_four",
 *          type="string"
 *      )
 * )
 */
class Users extends Authenticatable implements HasRoleAndPermissionContract, CanResetPasswordContract
{
	use HasApiTokens, Notifiable, HasRoleAndPermission;
	use CanResetPassword;
	use SoftDeletes;
	use Billable;


	/**
	 * @var string
	 */
	public $table = 'users';

	/**
	 *
	 */
	const CREATED_AT = 'created_at';
	/**
	 *
	 */
	const UPDATED_AT = 'updated_at';

	/**
	 * @var array
	 */
	protected $dates = ['deleted_at'];


	/**
	 * @var array
	 */
	public $fillable = [
		'first_name',
		'last_name',
		'mobile',
		'email',
		'street',
		'city',
		'country',
		'zip_code',
		'password',
		'remember_token',
		'stripe_id',
		'braintree_id',
		'paypal_email',
		'card_brand',
		'card_last_four',
		'trial_ends_at',
		'username',
		'address_line_1'
	];

	//  protected $encrypt = ['password'];

	protected $hidden = ['password', 'remember_token'];
	private $originalPassword;


	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'id' => 'integer',
		'first_name' => 'string',
		'last_name' => 'string',
		'mobile' => 'string',
		'email' => 'string',
		'street' => 'string',
		'city' => 'string',
		'country' => 'string',
		'zip_code' => 'string',
		'password' => 'string',
		'remember_token' => 'string',
		'stripe_id' => 'string',
		'braintree_id' => 'string',
		'paypal_email' => 'string',
		'card_brand' => 'string',
		'card_last_four' => 'string',
		'username' => 'string',
		'address_line_1' => 'string'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [
		'password' => 'sometimes|required|min:5',
		'email' => 'required|email',

	];

	public function setOriginalPassword($password)
	{
		$this->originalPassword = $password;
	}


	/**
	 *
	 */
	protected static function boot()
	{
		static::creating(function ($model) {
			$model->user_ref = (string)Uuid::uuid4();
		});
	}


	/**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}

	public function setPasswordAttribute($val)
	{


		$this->attributes['password'] = bcrypt($val);


	}

	/**
	 * Get the e-mail address where password reminders are sent.
	 *
	 * @return string
	 */
	public function getReminderEmail()
	{
		return $this->email;
	}


	public function getToken()
	{
		return $this->tokens->first()->token;
	}


	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 **/
	public function permissionUsers()
	{
		return $this->hasMany(\App\Models\PermissionUser::class, 'user_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 **/
	public function roleUsers()
	{
		return $this->hasMany(\App\Models\RoleUser::class);
	}


	public function groupTypes()
	{
		return $this->belongsToMany(GroupTypes::class, 'user_group_types', 'user_id', 'group_type_id');
	}

	public function userGroupTypes()
	{
		return $this->hasMany(UserGroupTypes::class);
	}

	/**
	 * @return mixed
	 */
	public function roles()
	{
		return $this->belongsToMany(Role::class, 'role_user', 'user_id');

	}

	public function documents()
	{
		return $this->HasMany(Document::class);

	}

	public function invites()
	{

		return $this->hasMany(UserInvites::class);

	}

	public function usersTrainers()
	{

		return $this->hasMany(UsersTrainers::class);

	}


	public function inRole($role_name): bool
	{
		$role = Roles::where('name', '=', $role_name)
			->first();
		if ($role) {

			foreach ($this->roles()->get() as $role) {
				if ($role->name == $role_name) {
					return true;
				}
			}
			return false;
		} else {
			return false;
		}
	}
}
