<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePlaceNLUAPIRequest;
use App\Http\Requests\API\UpdatePlaceNLUAPIRequest;
use App\Models\PlaceNLU;
use App\Repositories\PlaceNLURepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PlaceNLUController
 * @package App\Http\Controllers\API
 */
class PlaceNLUAPIController extends AppBaseController
{
	/** @var  PlaceNLURepository */
	private $placeNLURepository;

	public function __construct(PlaceNLURepository $placeNLURepo)
	{
		$this->placeNLURepository = $placeNLURepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeNLUs",
	 *      summary="Get a listing of the PlaceNLUs.",
	 *      tags={"PlaceNLU"},
	 *      description="Get all PlaceNLUs",
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
	 *                  @SWG\Items(ref="#/definitions/PlaceNLU")
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
		$this->placeNLURepository->pushCriteria(new RequestCriteria($request));
		$this->placeNLURepository->pushCriteria(new LimitOffsetCriteria($request));
		$placeNLUs = $this->placeNLURepository->all();

		return $this->sendResponse($placeNLUs->toArray(), 'Place N L Us retrieved successfully');
	}

	/**
	 * @param CreatePlaceNLUAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/placeNLUs",
	 *      summary="Store a newly created PlaceNLU in storage",
	 *      tags={"PlaceNLU"},
	 *      description="Store PlaceNLU",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceNLU that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceNLU")
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
	 *                  ref="#/definitions/PlaceNLU"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePlaceNLUAPIRequest $request)
	{
		$input = $request->all();

		$placeNLUs = $this->placeNLURepository->create($input);

		return $this->sendResponse($placeNLUs->toArray(), 'Place N L U saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeNLUs/{id}",
	 *      summary="Display the specified PlaceNLU",
	 *      tags={"PlaceNLU"},
	 *      description="Get PlaceNLU",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceNLU",
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
	 *                  ref="#/definitions/PlaceNLU"
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
		/** @var PlaceNLU $placeNLU */
		$placeNLU = $this->placeNLURepository->findWithoutFail($id);

		if (empty($placeNLU)) {
			return $this->sendError('Place N L U not found');
		}

		return $this->sendResponse($placeNLU->toArray(), 'Place N L U retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePlaceNLUAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/placeNLUs/{id}",
	 *      summary="Update the specified PlaceNLU in storage",
	 *      tags={"PlaceNLU"},
	 *      description="Update PlaceNLU",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceNLU",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceNLU that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceNLU")
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
	 *                  ref="#/definitions/PlaceNLU"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePlaceNLUAPIRequest $request)
	{
		$input = $request->all();

		/** @var PlaceNLU $placeNLU */
		$placeNLU = $this->placeNLURepository->findWithoutFail($id);

		if (empty($placeNLU)) {
			return $this->sendError('Place N L U not found');
		}

		$placeNLU = $this->placeNLURepository->update($input, $id);

		return $this->sendResponse($placeNLU->toArray(), 'PlaceNLU updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/placeNLUs/{id}",
	 *      summary="Remove the specified PlaceNLU from storage",
	 *      tags={"PlaceNLU"},
	 *      description="Delete PlaceNLU",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceNLU",
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
		/** @var PlaceNLU $placeNLU */
		$placeNLU = $this->placeNLURepository->findWithoutFail($id);

		if (empty($placeNLU)) {
			return $this->sendError('Place N L U not found');
		}

		$placeNLU->delete();

		return $this->sendResponse($id, 'Place N L U deleted successfully');
	}
}
