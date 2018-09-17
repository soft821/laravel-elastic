<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePlaceMetaDataAPIRequest;
use App\Http\Requests\API\UpdatePlaceMetaDataAPIRequest;
use App\Models\PlaceMetaData;
use App\Repositories\PlaceMetaDataRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PlaceMetaDataController
 * @package App\Http\Controllers\API
 */
class PlaceMetaDataAPIController extends AppBaseController
{
	/** @var  PlaceMetaDataRepository */
	private $placeMetaDataRepository;

	public function __construct(PlaceMetaDataRepository $placeMetaDataRepo)
	{
		$this->placeMetaDataRepository = $placeMetaDataRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeMetaDatas",
	 *      summary="Get a listing of the PlaceMetaDatas.",
	 *      tags={"PlaceMetaData"},
	 *      description="Get all PlaceMetaDatas",
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
	 *                  @SWG\Items(ref="#/definitions/PlaceMetaData")
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
		$this->placeMetaDataRepository->pushCriteria(new RequestCriteria($request));
		$this->placeMetaDataRepository->pushCriteria(new LimitOffsetCriteria($request));
		$placeMetaDatas = $this->placeMetaDataRepository->all();

		return $this->sendResponse($placeMetaDatas->toArray(), 'Place Meta Datas retrieved successfully');
	}

	/**
	 * @param CreatePlaceMetaDataAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/placeMetaDatas",
	 *      summary="Store a newly created PlaceMetaData in storage",
	 *      tags={"PlaceMetaData"},
	 *      description="Store PlaceMetaData",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceMetaData that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceMetaData")
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
	 *                  ref="#/definitions/PlaceMetaData"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePlaceMetaDataAPIRequest $request)
	{
		$input = $request->all();

		$placeMetaDatas = $this->placeMetaDataRepository->create($input);

		return $this->sendResponse($placeMetaDatas->toArray(), 'Place Meta Data saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeMetaDatas/{id}",
	 *      summary="Display the specified PlaceMetaData",
	 *      tags={"PlaceMetaData"},
	 *      description="Get PlaceMetaData",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceMetaData",
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
	 *                  ref="#/definitions/PlaceMetaData"
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
		/** @var PlaceMetaData $placeMetaData */
		$placeMetaData = $this->placeMetaDataRepository->findWithoutFail($id);

		if (empty($placeMetaData)) {
			return $this->sendError('Place Meta Data not found');
		}

		return $this->sendResponse($placeMetaData->toArray(), 'Place Meta Data retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePlaceMetaDataAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/placeMetaDatas/{id}",
	 *      summary="Update the specified PlaceMetaData in storage",
	 *      tags={"PlaceMetaData"},
	 *      description="Update PlaceMetaData",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceMetaData",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceMetaData that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceMetaData")
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
	 *                  ref="#/definitions/PlaceMetaData"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePlaceMetaDataAPIRequest $request)
	{
		$input = $request->all();

		/** @var PlaceMetaData $placeMetaData */
		$placeMetaData = $this->placeMetaDataRepository->findWithoutFail($id);

		if (empty($placeMetaData)) {
			return $this->sendError('Place Meta Data not found');
		}

		$placeMetaData = $this->placeMetaDataRepository->update($input, $id);

		return $this->sendResponse($placeMetaData->toArray(), 'PlaceMetaData updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/placeMetaDatas/{id}",
	 *      summary="Remove the specified PlaceMetaData from storage",
	 *      tags={"PlaceMetaData"},
	 *      description="Delete PlaceMetaData",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceMetaData",
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
		/** @var PlaceMetaData $placeMetaData */
		$placeMetaData = $this->placeMetaDataRepository->findWithoutFail($id);

		if (empty($placeMetaData)) {
			return $this->sendError('Place Meta Data not found');
		}

		$placeMetaData->delete();

		return $this->sendResponse($id, 'Place Meta Data deleted successfully');
	}
}
