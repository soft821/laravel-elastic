<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateMenusAPIRequest;
use App\Http\Requests\API\UpdateMenusAPIRequest;
use App\Models\Menus;
use App\Models\Users;
use App\Repositories\MenusRepository;
use DCN\RBAC\RBACServiceProvider;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Illuminate\Support\Facades\DB;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use Carbon\Carbon;
use Auth;
use App\Models\Role;
use DCN\RBAC\Models\Permission;

/**
 * Class MenusController
 * @package App\Http\Controllers\API
 */
class MenusAPIController extends AppBaseController
{
	/** @var  MenusRepository */
	private $menusRepository;

	public function __construct(MenusRepository $menusRepo)
	{
		$this->menusRepository = $menusRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/menuses",
	 *      summary="Get a listing of the Menuses.",
	 *      tags={"Menus"},
	 *      description="Get all Menuses",
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
	 *                  @SWG\Items(ref="#/definitions/Menus")
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
		$page = $request['page'];
		$this->menusRepository->pushCriteria(new RequestCriteria($request));
		$this->menusRepository->pushCriteria(new LimitOffsetCriteria($request));
		$menus = $this->menusRepository; //->paginate(15); //->all();

		if ($page) {
			$menus = $menus->paginate(10);
		} else {
			$length = $menus->count();
			$menus = $menus->paginate($length);
		}

		return $this->sendResponse($menus->toArray(), 'Menuses retrieved successfully');
	}

	/**
	 * @param CreateMenusAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/menuses",
	 *      summary="Store a newly created Menus in storage",
	 *      tags={"Menus"},
	 *      description="Store Menus",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="Menus that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/Menus")
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
	 *                  ref="#/definitions/Menus"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreateMenusAPIRequest $request)
	{
		$input = $request->all();

		$menuses = $this->menusRepository->create($input);

		return $this->sendResponse($menuses->toArray(), 'Menus saved successfully');
	}


	public function fixPassword()
	{
		$user = Users::find(1);
		//$user->password = bcrypt('password');
		//$user->trial_ends_at = Carbon::now()->addDays(14);

		$role = Role::find(1);
		$user->attachRole($role);
		$user->save();

		$createUsersPermission = Permission::create([
			'name' => 'Menuses create',
			'slug' => 'menuses.create',
			'description' => '', // optional
		]);

		$role->attachPermission($createUsersPermission); // permission attached to a role

		return $createUsersPermission;
	}

	public function routes()
	{

		$roles = Role::all();
		$routeCollection = \Route::getRoutes();
		$array = array();
		foreach ($routeCollection as $value) {

			$temp = array(
				'name' => $value->getName(),
				'path' => $value->uri(),
				'method' => $value->methods[0],
				'permission' => false
			);
			$permissionObj = Permission::where("slug", "=", str_replace("api.", "", $temp['name']))->first();
			$temp['permissionObj'] = $permissionObj;

			array_push($array, $temp);
		}

		foreach ($roles as $role) {
			$newArray = array();
			foreach ($array as $route) {
				if ($route['permissionObj']) {
					$existPermission = Permission::where('id', "=", $route['permissionObj']->id)
						->with('roles')
						->with(array('roles' => function ($query) use ($role) {
							$query->where("role_id", "=", $role['id']);
						}))
						->first();
					if ($existPermission) {
						if (count($existPermission['roles']) > 0) {
							$route['permission'] = true;
						}
					}
				}
				array_push($newArray, $route);
			}
			$role->routes = $newArray;
		}
		return $roles;
	}

	public function addRemovePermissionToRole(Request $request)
	{
		$input = $request->input();
		$roleId = $input['roleId'];
		$permission = $input['permission'];
		$role = \DCN\RBAC\Models\Role::find($roleId);


		$apiArray = explode('.', $input['name']);
		array_shift($apiArray);
		$slug = implode('.', $apiArray);

		$permissions = Permission::where('name', '=', $slug);


		if ($permissions->count() === 0) {
			$permissions = Permission::create([
				'name' => $slug,
				'slug' => $slug,
				'description' => '', // optional
			]);


		} else {
			$permissions = $permissions->first();
		}

		$permissionObj = $permissions;

		if ($role && $permissionObj) {
			if ($permission == 1) {
				$role->attachPermission($permissionObj); // permission attached to a role
			} else {
				$role->detachPermission($permissionObj); // permission detached to a role
			}
		}
		return $permissionObj;
	}


	public function menuesByRole()
	{

		$roles = Role::all();


		foreach ($roles as $role) {
			$newArray = array();
			$menues = Menus::all();
			foreach ($menues as $menu) {
				$menu['permission'] = false;
			}
			foreach ($menues as $menu) {

				$temp = $menu;
				$exitPermission = Menus::where('id', "=", $temp->id)
					->with('roles')
					->with(array('roles' => function ($query) use ($role) {
						$query->where("role_id", "=", $role['id']);
					}))
					->first();

				if ($exitPermission) {
					if (count($exitPermission['roles']) > 0) {
						$temp['permission'] = true;
					}
				}

				array_push($newArray, $temp);
			}
			$role->menus = $newArray;
		}
		return $roles;
	}


	public function addRemoveMenuToRole(Request $request)
	{
		$input = $request->input();
		$roleId = $input['roleId'];
		$menuId = $input['menuId'];
		$permission = $input['permission'];

		$role = Role::find($roleId);
		$menu = Menus::find($menuId);

		if ($role && $menu) {
			if ($permission == 1) {
				$role->menus()->attach($menuId); // permission attached to a role
			} else {
				$role->menus()->detach($menuId); // permission detached to a role
			}
		}
		return $menu;
	}


	public function getMenuByUser()
	{
		if (Auth::user()) {
			// Auth::user() returns an instance of the authenticated user...
			$id = Auth::user()->id;
			$user = Users::where('id', '=', $id)->with('roles')->first();
			$groupId = $user->roles[0]->id;

			if ($user->roleIs('consumer')) {
				$menues = Role::where('id', '=', $groupId)
					->with(array('menus' => function ($query) {
						$query->orderBy('order_number', 'asc');
					}))->first();


			} else {

				$menues = Role::where('id', '=', $groupId)
					->with(array('menus' => function ($query) {
						$query->orderBy('order_number', 'asc');
					}))
					->first();
			}

			return $menues;
		}

	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/menuses/{id}",
	 *      summary="Display the specified Menus",
	 *      tags={"Menus"},
	 *      description="Get Menus",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Menus",
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
	 *                  ref="#/definitions/Menus"
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
		/** @var Menus $menus */
		$menus = $this->menusRepository->findWithoutFail($id);

		if (empty($menus)) {
			return $this->sendError('Menus not found');
		}

		return $menus->toArray();
	}

	/**
	 * @param int $id
	 * @param UpdateMenusAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/menuses/{id}",
	 *      summary="Update the specified Menus in storage",
	 *      tags={"Menus"},
	 *      description="Update Menus",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Menus",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="Menus that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/Menus")
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
	 *                  ref="#/definitions/Menus"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdateMenusAPIRequest $request)
	{
		$input = $request->all();

		/** @var Menus $menus */
		$menus = $this->menusRepository->findWithoutFail($id);

		if (empty($menus)) {
			return $this->sendError('Menus not found');
		}

		$menus = $this->menusRepository->update($input, $id);

		return $this->sendResponse($menus->toArray(), 'Menus updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/menuses/{id}",
	 *      summary="Remove the specified Menus from storage",
	 *      tags={"Menus"},
	 *      description="Delete Menus",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Menus",
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
		/** @var Menus $menus */
		$menus = $this->menusRepository->findWithoutFail($id);

		if (empty($menus)) {
			return $this->sendError('Menus not found');
		}

		$menus->delete();

		return $this->sendResponse($id, 'Menus deleted successfully');
	}
}
