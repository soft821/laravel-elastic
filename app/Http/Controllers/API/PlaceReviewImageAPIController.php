<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePlaceReviewImageAPIRequest;
use App\Http\Requests\API\UpdatePlaceReviewImageAPIRequest;
use App\Models\PlaceReviewImage;
use App\Repositories\PlaceReviewImageRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PlaceReviewImageController
 * @package App\Http\Controllers\API
 */
class PlaceReviewImageAPIController extends AppBaseController
{
	/** @var  PlaceReviewImageRepository */
	private $placeReviewImageRepository;

	public function __construct(PlaceReviewImageRepository $placeReviewImageRepo)
	{
		$this->placeReviewImageRepository = $placeReviewImageRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeReviewImages",
	 *      summary="Get a listing of the PlaceReviewImages.",
	 *      tags={"PlaceReviewImage"},
	 *      description="Get all PlaceReviewImages",
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
	 *                  @SWG\Items(ref="#/definitions/PlaceReviewImage")
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
		$this->placeReviewImageRepository->pushCriteria(new RequestCriteria($request));
		$this->placeReviewImageRepository->pushCriteria(new LimitOffsetCriteria($request));
		$placeReviewImages = $this->placeReviewImageRepository->all();

		return $this->sendResponse($placeReviewImages->toArray(), 'Place Review Images retrieved successfully');
	}

	/**
	 * @param CreatePlaceReviewImageAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/placeReviewImages",
	 *      summary="Store a newly created PlaceReviewImage in storage",
	 *      tags={"PlaceReviewImage"},
	 *      description="Store PlaceReviewImage",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceReviewImage that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceReviewImage")
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
	 *                  ref="#/definitions/PlaceReviewImage"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePlaceReviewImageAPIRequest $request)
	{
		$input = $request->all();

		$placeReviewImages = $this->placeReviewImageRepository->create($input);

		return $this->sendResponse($placeReviewImages->toArray(), 'Place Review Image saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeReviewImages/{id}",
	 *      summary="Display the specified PlaceReviewImage",
	 *      tags={"PlaceReviewImage"},
	 *      description="Get PlaceReviewImage",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceReviewImage",
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
	 *                  ref="#/definitions/PlaceReviewImage"
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
		/** @var PlaceReviewImage $placeReviewImage */
		$placeReviewImage = $this->placeReviewImageRepository->findWithoutFail($id);

		if (empty($placeReviewImage)) {
			return $this->sendError('Place Review Image not found');
		}

		return $this->sendResponse($placeReviewImage->toArray(), 'Place Review Image retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePlaceReviewImageAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/placeReviewImages/{id}",
	 *      summary="Update the specified PlaceReviewImage in storage",
	 *      tags={"PlaceReviewImage"},
	 *      description="Update PlaceReviewImage",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceReviewImage",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceReviewImage that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceReviewImage")
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
	 *                  ref="#/definitions/PlaceReviewImage"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePlaceReviewImageAPIRequest $request)
	{
		$input = $request->all();

		/** @var PlaceReviewImage $placeReviewImage */
		$placeReviewImage = $this->placeReviewImageRepository->findWithoutFail($id);

		if (empty($placeReviewImage)) {
			return $this->sendError('Place Review Image not found');
		}

		$placeReviewImage = $this->placeReviewImageRepository->update($input, $id);

		return $this->sendResponse($placeReviewImage->toArray(), 'PlaceReviewImage updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/placeReviewImages/{id}",
	 *      summary="Remove the specified PlaceReviewImage from storage",
	 *      tags={"PlaceReviewImage"},
	 *      description="Delete PlaceReviewImage",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceReviewImage",
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
		/** @var PlaceReviewImage $placeReviewImage */
		$placeReviewImage = $this->placeReviewImageRepository->findWithoutFail($id);

		if (empty($placeReviewImage)) {
			return $this->sendError('Place Review Image not found');
		}

		$placeReviewImage->delete();

		return $this->sendResponse($id, 'Place Review Image deleted successfully');
	}
}
