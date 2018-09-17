<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePlaceMetaAPIRequest;
use App\Http\Requests\API\UpdatePlaceMetaAPIRequest;
use App\Models\PlaceMeta;
use App\Repositories\PlaceMetaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PlaceMetaController
 * @package App\Http\Controllers\API
 */
class PlaceMetaAPIController extends AppBaseController
{
	/** @var  PlaceMetaRepository */
	private $placeMetaRepository;

	public function __construct(PlaceMetaRepository $placeMetaRepo)
	{
		$this->placeMetaRepository = $placeMetaRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeMetas",
	 *      summary="Get a listing of the PlaceMetas.",
	 *      tags={"PlaceMeta"},
	 *      description="Get all PlaceMetas",
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
	 *                  @SWG\Items(ref="#/definitions/PlaceMeta")
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
		$this->placeMetaRepository->pushCriteria(new RequestCriteria($request));
		$this->placeMetaRepository->pushCriteria(new LimitOffsetCriteria($request));
		$placeMetas = $this->placeMetaRepository->all();

		return $this->sendResponse($placeMetas->toArray(), 'Place Metas retrieved successfully');
	}

	/**
	 * @param CreatePlaceMetaAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/placeMetas",
	 *      summary="Store a newly created PlaceMeta in storage",
	 *      tags={"PlaceMeta"},
	 *      description="Store PlaceMeta",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceMeta that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceMeta")
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
	 *                  ref="#/definitions/PlaceMeta"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePlaceMetaAPIRequest $request)
	{
		$input = $request->all();

		$placeMetas = $this->placeMetaRepository->create($input);

		return $this->sendResponse($placeMetas->toArray(), 'Place Meta saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeMetas/{id}",
	 *      summary="Display the specified PlaceMeta",
	 *      tags={"PlaceMeta"},
	 *      description="Get PlaceMeta",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceMeta",
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
	 *                  ref="#/definitions/PlaceMeta"
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
		/** @var PlaceMeta $placeMeta */
		$placeMeta = $this->placeMetaRepository->findWithoutFail($id);

		if (empty($placeMeta)) {
			return $this->sendError('Place Meta not found');
		}

		return $this->sendResponse($placeMeta->toArray(), 'Place Meta retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePlaceMetaAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/placeMetas/{id}",
	 *      summary="Update the specified PlaceMeta in storage",
	 *      tags={"PlaceMeta"},
	 *      description="Update PlaceMeta",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceMeta",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceMeta that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceMeta")
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
	 *                  ref="#/definitions/PlaceMeta"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePlaceMetaAPIRequest $request)
	{
		$input = $request->all();

		/** @var PlaceMeta $placeMeta */
		$placeMeta = $this->placeMetaRepository->findWithoutFail($id);

		if (empty($placeMeta)) {
			return $this->sendError('Place Meta not found');
		}

		$placeMeta = $this->placeMetaRepository->update($input, $id);

		return $this->sendResponse($placeMeta->toArray(), 'PlaceMeta updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/placeMetas/{id}",
	 *      summary="Remove the specified PlaceMeta from storage",
	 *      tags={"PlaceMeta"},
	 *      description="Delete PlaceMeta",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceMeta",
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
		/** @var PlaceMeta $placeMeta */
		$placeMeta = $this->placeMetaRepository->findWithoutFail($id);

		if (empty($placeMeta)) {
			return $this->sendError('Place Meta not found');
		}

		$placeMeta->delete();

		return $this->sendResponse($id, 'Place Meta deleted successfully');
	}
}
