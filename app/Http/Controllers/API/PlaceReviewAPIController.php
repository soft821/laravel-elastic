<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePlaceReviewAPIRequest;
use App\Http\Requests\API\UpdatePlaceReviewAPIRequest;
use App\Models\PlaceReview;
use App\Repositories\PlaceReviewRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PlaceReviewController
 * @package App\Http\Controllers\API
 */
class PlaceReviewAPIController extends AppBaseController
{
	/** @var  PlaceReviewRepository */
	private $placeReviewRepository;

	public function __construct(PlaceReviewRepository $placeReviewRepo)
	{
		$this->placeReviewRepository = $placeReviewRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeReviews",
	 *      summary="Get a listing of the PlaceReviews.",
	 *      tags={"PlaceReview"},
	 *      description="Get all PlaceReviews",
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
	 *                  @SWG\Items(ref="#/definitions/PlaceReview")
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
		$this->placeReviewRepository->pushCriteria(new RequestCriteria($request));
		$this->placeReviewRepository->pushCriteria(new LimitOffsetCriteria($request));
		$placeReviews = $this->placeReviewRepository->all();

		return $this->sendResponse($placeReviews->toArray(), 'Place Reviews retrieved successfully');
	}

	/**
	 * @param CreatePlaceReviewAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/placeReviews",
	 *      summary="Store a newly created PlaceReview in storage",
	 *      tags={"PlaceReview"},
	 *      description="Store PlaceReview",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceReview that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceReview")
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
	 *                  ref="#/definitions/PlaceReview"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePlaceReviewAPIRequest $request)
	{
		$input = $request->all();

		$placeReviews = $this->placeReviewRepository->create($input);

		return $this->sendResponse($placeReviews->toArray(), 'Place Review saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeReviews/{id}",
	 *      summary="Display the specified PlaceReview",
	 *      tags={"PlaceReview"},
	 *      description="Get PlaceReview",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceReview",
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
	 *                  ref="#/definitions/PlaceReview"
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
		/** @var PlaceReview $placeReview */
		$placeReview = $this->placeReviewRepository->findWithoutFail($id);

		if (empty($placeReview)) {
			return $this->sendError('Place Review not found');
		}

		return $this->sendResponse($placeReview->toArray(), 'Place Review retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePlaceReviewAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/placeReviews/{id}",
	 *      summary="Update the specified PlaceReview in storage",
	 *      tags={"PlaceReview"},
	 *      description="Update PlaceReview",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceReview",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceReview that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceReview")
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
	 *                  ref="#/definitions/PlaceReview"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePlaceReviewAPIRequest $request)
	{
		$input = $request->all();

		/** @var PlaceReview $placeReview */
		$placeReview = $this->placeReviewRepository->findWithoutFail($id);

		if (empty($placeReview)) {
			return $this->sendError('Place Review not found');
		}

		$placeReview = $this->placeReviewRepository->update($input, $id);

		return $this->sendResponse($placeReview->toArray(), 'PlaceReview updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/placeReviews/{id}",
	 *      summary="Remove the specified PlaceReview from storage",
	 *      tags={"PlaceReview"},
	 *      description="Delete PlaceReview",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceReview",
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
		/** @var PlaceReview $placeReview */
		$placeReview = $this->placeReviewRepository->findWithoutFail($id);

		if (empty($placeReview)) {
			return $this->sendError('Place Review not found');
		}

		$placeReview->delete();

		return $this->sendResponse($id, 'Place Review deleted successfully');
	}
}
