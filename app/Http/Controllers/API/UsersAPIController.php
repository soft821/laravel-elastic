<?php

namespace App\Http\Controllers\API;

use App\Events\UserPasswordCreated;
use App\Http\Requests\API\CreateUsersAPIRequest;
use App\Http\Requests\API\UpdateUsersAPIRequest;
use App\Models\Users;
use App\Repositories\UsersRepository;
use GuzzleHttp\Client;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Illuminate\Mail\Mailer;

use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Stripe\Customer;

use Exception;
use App\Repositories\RolesRepository;
use App\Criteria\UserSoftDeleteCriteria;

use Firebase\JWT\JWT;

/**
 * Class UsersController
 * @package App\Http\Controllers\API
 */
class UsersAPIController extends AppBaseController
{
	/** @var  UsersRepository */
	private $usersRepository;
	private $rolesRepository;
	private $mail;
	private $auth;


	public function __construct(UsersRepository $usersRepo, AuthManager $auth, Mailer $mail, RolesRepository $roleRepo)
	{
		$this->usersRepository = $usersRepo;
		$this->auth = $auth;
		$this->mail = $mail;
		$this->rolesRepository = $roleRepo;

	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/users",
	 *      summary="Get a listing of the Users.",
	 *      tags={"Users"},
	 *      description="Get all Users",
	 *      produces={"application/json"},
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  type="array",
	 *                  @SWG\Items(ref="#/definitions/Users")
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function index(Request $request)
	{
		$this->usersRepository->pushCriteria(new RequestCriteria($request));
		$this->usersRepository->pushCriteria(new LimitOffsetCriteria($request));
		$this->usersRepository->pushCriteria(new UserSoftDeleteCriteria());
		if ($request['lastDay']) {
			$this->usersRepository->pushCriteria(new UsersLastDayCriteria());
		}

		$users = $this->usersRepository->paginate($request->get('limit'));


		return $this->sendResponse($users->toArray(), 'Users retrieved successfully');


	}


	/**
	 * @param CreateUsersAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/users",
	 *      summary="Register a newly created User",
	 *      tags={"Users"},
	 *      description="Store Users",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="Users that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/Users")
	 *      ),
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  ref="#/definitions/Users"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreateUsersAPIRequest $request)
	{

		$users = null;
		$role_user = null;
		$input = $request->all();

		try {
			$input['username'] = $input['email'];
			$input['password_confirmation'] = $input['password'];

			$user = $this->usersRepository->create($input);


			$userArray = ['username' => $input['username'], 'password' => $input['password']];
			event(new UserPasswordCreated($userArray));


			$role = $this->rolesRepository->find(1);


			$user->roles()->attach($role);


			return $this->sendResponse($user, 'Users saved successfully');
		} catch (Exception $exception) {

			return $this->sendError($exception->getMessage(), '401');
		}
	}

	protected function createToken($user)
	{
		$payload = [
			'sub' => $user->id,
			'iat' => time(),
			'exp' => time() + (2 * 7 * 24 * 60 * 60)
		];
		return JWT::encode($payload, 'jsdhfuyu234eeswyf34ruhsdefh');
	}

	/**
	 * @desc get details of the selected card
	 * @param
	 * @return array $card
	 */
	public function getCardDetails(Request $request)
	{

		//get details of the selected card
		$card_id = $request->get('card_id');//card id

		$id = Auth::id();//get the currently logged user id
		$user = Users::find($id);//get information of currently logged user

		$customer = Customer::retrieve($user->stripe_customer_id);//get details of customer from stripe


		$value = $customer->sources->retrieve($card_id); //card details

		$card = array(
			'customer' => $user->stripe_customer_id,
			'card_id' => $value->id,
			'last4' => $value->last4,
			'brand' => $value->brand,
			'exp_month' => $value->exp_month,
			'exp_year' => $value->exp_year,
			'country' => $value->country
		);

		$this->sendResponse($card, 'success');

	}


	/**
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/users/current",
	 *      summary="Get the current user",
	 *      tags={"Users"},
	 *      description="Get the current user",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="Users that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/Users")
	 *      ),
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  ref="#/definitions/Users"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */

	public function getCurrentUser()
	{

		//get currently logged user's details
		$user = $this->usersRepository->with(['roles'])->findWithoutFail($this->auth->id());
		return $user;

	}


	public function checkUser()
	{
		$user = $this->usersRepository->findWithoutFail($this->auth->id());
		if (empty($user)) {
			return $this->sendError('Users not found');
		}
		return $this->sendResponse($user->id, 'Users retrieved successfully');
	}

	public function checkAuthentication()
	{

		try {
			if (Auth::user()) {
				// Auth::user() returns an instance of the authenticated user...
				$id = Auth::user()->id;
				return Response::json(array('status' => 'success', 'data' => $id), 200, [], JSON_NUMERIC_CHECK);
				//return $this->sendResponse($this->auth->id(), "Successfully set this card as default");
			}
		} catch (Exception $ex) {
			return Response::json(array('status' => 'error', 'data' => $ex->getMessage()), 500);
		}
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/users/{id}",
	 *      summary="Display the specified Users",
	 *      tags={"Users"},
	 *      description="Get Users",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Users",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  ref="#/definitions/Users"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function show($id)
	{
		/** @var Users $users */

		$users = $this->usersRepository->with(['roles'])->findWithoutFail($id);


		if (empty($users)) {
			return $this->sendError('Users not found');
		}

		return $this->sendResponse($users->toArray(), 'Users retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdateUsersAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/users/{id}",
	 *      summary="Update the specified Users in storage",
	 *      tags={"Users"},
	 *      description="Update Users",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Users",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="Users that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/Users")
	 *      ),
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  ref="#/definitions/Users"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdateUsersAPIRequest $request)
	{
		$input = $request->all();

		/** @var Users $users */
		$users = $this->usersRepository->findWithoutFail($id);

		if (empty($users)) {
			return $this->sendError('Users not found');
		}

		$role = false;


		$users->roles()->detach();

		if (!empty($input['role_id'])) {
			$role = $this->rolesRepository->find($input['role_id']);
		}


		if (!$role) {
			$role = $this->rolesRepository->find(1);
		}

		$users->roles()->attach($role);

		/* return $this->sendResponse($role, 'Users updated successfully');
		 die();*/
		$users = $this->usersRepository->update($input, $id);

		return $this->sendResponse($users->toArray(), 'Users updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/users/{id}",
	 *      summary="Remove the specified Users from storage",
	 *      tags={"Users"},
	 *      description="Delete Users",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Users",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  type="string"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function destroy($id)
	{
		/** @var Users $users */
		$users = $this->usersRepository->findWithoutFail($id);

		if (empty($users)) {
			return $this->sendError('Users not found');
		}

		$users->delete();

		return $this->sendResponse($id, 'Users deleted successfully');
	}

	public function login(Request $request)
	{

		$username = $request->get('username');
		$password = $request->get('password');
		$client = new Client();

		$data = ['username' => $username, 'password' => $password, 'client_id' => config('auth.client_id'), 'client_secret' => config('auth.client_secret')];

		$response = $client->request('POST', $request->root() . '/oauth/token',
			['json' => $data]);

		return $response;


	}
}