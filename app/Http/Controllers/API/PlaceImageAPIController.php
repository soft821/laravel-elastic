<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePlaceImageAPIRequest;
use App\Http\Requests\API\UpdatePlaceImageAPIRequest;
use App\Models\PlaceImage;
use App\Repositories\PlaceImageRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PlaceImageController
 * @package App\Http\Controllers\API
 */
class PlaceImageAPIController extends AppBaseController
{
	/** @var  PlaceImageRepository */
	private $placeImageRepository;

	public function __construct(PlaceImageRepository $placeImageRepo)
	{
		$this->placeImageRepository = $placeImageRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeImages",
	 *      summary="Get a listing of the PlaceImages.",
	 *      tags={"PlaceImage"},
	 *      description="Get all PlaceImages",
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
	 *                  @SWG\Items(ref="#/definitions/PlaceImage")
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
		$this->placeImageRepository->pushCriteria(new RequestCriteria($request));
		$this->placeImageRepository->pushCriteria(new LimitOffsetCriteria($request));
		$placeImages = $this->placeImageRepository->all();

		return $this->sendResponse($placeImages->toArray(), 'Place Images retrieved successfully');
	}

	/**
	 * @param CreatePlaceImageAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/placeImages",
	 *      summary="Store a newly created PlaceImage in storage",
	 *      tags={"PlaceImage"},
	 *      description="Store PlaceImage",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceImage that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceImage")
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
	 *                  ref="#/definitions/PlaceImage"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePlaceImageAPIRequest $request)
	{
		$input = $request->all();

		$placeImages = $this->placeImageRepository->create($input);

		return $this->sendResponse($placeImages->toArray(), 'Place Image saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeImages/{id}",
	 *      summary="Display the specified PlaceImage",
	 *      tags={"PlaceImage"},
	 *      description="Get PlaceImage",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceImage",
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
	 *                  ref="#/definitions/PlaceImage"
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
		/** @var PlaceImage $placeImage */
		$placeImage = $this->placeImageRepository->findWithoutFail($id);

		if (empty($placeImage)) {
			return $this->sendError('Place Image not found');
		}

		return $this->sendResponse($placeImage->toArray(), 'Place Image retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePlaceImageAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/placeImages/{id}",
	 *      summary="Update the specified PlaceImage in storage",
	 *      tags={"PlaceImage"},
	 *      description="Update PlaceImage",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceImage",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceImage that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceImage")
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
	 *                  ref="#/definitions/PlaceImage"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePlaceImageAPIRequest $request)
	{
		$input = $request->all();

		/** @var PlaceImage $placeImage */
		$placeImage = $this->placeImageRepository->findWithoutFail($id);

		if (empty($placeImage)) {
			return $this->sendError('Place Image not found');
		}

		$placeImage = $this->placeImageRepository->update($input, $id);

		return $this->sendResponse($placeImage->toArray(), 'PlaceImage updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/placeImages/{id}",
	 *      summary="Remove the specified PlaceImage from storage",
	 *      tags={"PlaceImage"},
	 *      description="Delete PlaceImage",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceImage",
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
		/** @var PlaceImage $placeImage */
		$placeImage = $this->placeImageRepository->findWithoutFail($id);

		if (empty($placeImage)) {
			return $this->sendError('Place Image not found');
		}

		$placeImage->delete();

		return $this->sendResponse($id, 'Place Image deleted successfully');
	}
}
