<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePhotoCatAPIRequest;
use App\Http\Requests\API\UpdatePhotoCatAPIRequest;
use App\Models\PhotoCat;
use App\Repositories\PhotoCatRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PhotoCatController
 * @package App\Http\Controllers\API
 */
class PhotoCatAPIController extends AppBaseController
{
	/** @var  PhotoCatRepository */
	private $photoCatRepository;

	public function __construct(PhotoCatRepository $photoCatRepo)
	{
		$this->photoCatRepository = $photoCatRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/photos/categories",
	 *      summary="Get a listing of Photo Categories.",
	 *      tags={"PhotoCat"},
	 *      description="Get all Photo Categories",
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
	 *                  @SWG\Items(ref="#/definitions/PhotoCat")
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
		$this->photoCatRepository->pushCriteria(new RequestCriteria($request));
		$this->photoCatRepository->pushCriteria(new LimitOffsetCriteria($request));
		$photoCats = $this->photoCatRepository->all();

		return $this->sendResponse($photoCats->toArray(), 'Photo Cats retrieved successfully');
	}

	/**
	 * @param CreatePhotoCatAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/photoCats",
	 *      summary="Store a newly created PhotoCat in storage",
	 *      tags={"PhotoCat"},
	 *      description="Store PhotoCat",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PhotoCat that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PhotoCat")
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
	 *                  ref="#/definitions/PhotoCat"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePhotoCatAPIRequest $request)
	{
		$input = $request->all();

		$photoCats = $this->photoCatRepository->create($input);

		return $this->sendResponse($photoCats->toArray(), 'Photo Cat saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/photoCats/{id}",
	 *      summary="Display the specified PhotoCat",
	 *      tags={"PhotoCat"},
	 *      description="Get PhotoCat",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PhotoCat",
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
	 *                  ref="#/definitions/PhotoCat"
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
		/** @var PhotoCat $photoCat */
		$photoCat = $this->photoCatRepository->findWithoutFail($id);

		if (empty($photoCat)) {
			return $this->sendError('Photo Cat not found');
		}

		return $this->sendResponse($photoCat->toArray(), 'Photo Cat retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePhotoCatAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/photoCats/{id}",
	 *      summary="Update the specified PhotoCat in storage",
	 *      tags={"PhotoCat"},
	 *      description="Update PhotoCat",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PhotoCat",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PhotoCat that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PhotoCat")
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
	 *                  ref="#/definitions/PhotoCat"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePhotoCatAPIRequest $request)
	{
		$input = $request->all();

		/** @var PhotoCat $photoCat */
		$photoCat = $this->photoCatRepository->findWithoutFail($id);

		if (empty($photoCat)) {
			return $this->sendError('Photo Cat not found');
		}

		$photoCat = $this->photoCatRepository->update($input, $id);

		return $this->sendResponse($photoCat->toArray(), 'PhotoCat updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/photoCats/{id}",
	 *      summary="Remove the specified PhotoCat from storage",
	 *      tags={"PhotoCat"},
	 *      description="Delete PhotoCat",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PhotoCat",
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
		/** @var PhotoCat $photoCat */
		$photoCat = $this->photoCatRepository->findWithoutFail($id);

		if (empty($photoCat)) {
			return $this->sendError('Photo Cat not found');
		}

		$photoCat->delete();

		return $this->sendResponse($id, 'Photo Cat deleted successfully');
	}
}
