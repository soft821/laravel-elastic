<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePlaceReviewMetaAPIRequest;
use App\Http\Requests\API\UpdatePlaceReviewMetaAPIRequest;
use App\Models\PlaceReviewMeta;
use App\Repositories\PlaceReviewMetaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PlaceReviewMetaController
 * @package App\Http\Controllers\API
 */
class PlaceReviewMetaAPIController extends AppBaseController
{
	/** @var  PlaceReviewMetaRepository */
	private $placeReviewMetaRepository;

	public function __construct(PlaceReviewMetaRepository $placeReviewMetaRepo)
	{
		$this->placeReviewMetaRepository = $placeReviewMetaRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeReviewMetas",
	 *      summary="Get a listing of the PlaceReviewMetas.",
	 *      tags={"PlaceReviewMeta"},
	 *      description="Get all PlaceReviewMetas",
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
	 *                  @SWG\Items(ref="#/definitions/PlaceReviewMeta")
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
		$this->placeReviewMetaRepository->pushCriteria(new RequestCriteria($request));
		$this->placeReviewMetaRepository->pushCriteria(new LimitOffsetCriteria($request));
		$placeReviewMetas = $this->placeReviewMetaRepository->all();

		return $this->sendResponse($placeReviewMetas->toArray(), 'Place Review Metas retrieved successfully');
	}

	/**
	 * @param CreatePlaceReviewMetaAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/placeReviewMetas",
	 *      summary="Store a newly created PlaceReviewMeta in storage",
	 *      tags={"PlaceReviewMeta"},
	 *      description="Store PlaceReviewMeta",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceReviewMeta that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceReviewMeta")
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
	 *                  ref="#/definitions/PlaceReviewMeta"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePlaceReviewMetaAPIRequest $request)
	{
		$input = $request->all();

		$placeReviewMetas = $this->placeReviewMetaRepository->create($input);

		return $this->sendResponse($placeReviewMetas->toArray(), 'Place Review Meta saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/placeReviewMetas/{id}",
	 *      summary="Display the specified PlaceReviewMeta",
	 *      tags={"PlaceReviewMeta"},
	 *      description="Get PlaceReviewMeta",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceReviewMeta",
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
	 *                  ref="#/definitions/PlaceReviewMeta"
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
		/** @var PlaceReviewMeta $placeReviewMeta */
		$placeReviewMeta = $this->placeReviewMetaRepository->findWithoutFail($id);

		if (empty($placeReviewMeta)) {
			return $this->sendError('Place Review Meta not found');
		}

		return $this->sendResponse($placeReviewMeta->toArray(), 'Place Review Meta retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePlaceReviewMetaAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/placeReviewMetas/{id}",
	 *      summary="Update the specified PlaceReviewMeta in storage",
	 *      tags={"PlaceReviewMeta"},
	 *      description="Update PlaceReviewMeta",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceReviewMeta",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PlaceReviewMeta that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PlaceReviewMeta")
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
	 *                  ref="#/definitions/PlaceReviewMeta"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePlaceReviewMetaAPIRequest $request)
	{
		$input = $request->all();

		/** @var PlaceReviewMeta $placeReviewMeta */
		$placeReviewMeta = $this->placeReviewMetaRepository->findWithoutFail($id);

		if (empty($placeReviewMeta)) {
			return $this->sendError('Place Review Meta not found');
		}

		$placeReviewMeta = $this->placeReviewMetaRepository->update($input, $id);

		return $this->sendResponse($placeReviewMeta->toArray(), 'PlaceReviewMeta updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/placeReviewMetas/{id}",
	 *      summary="Remove the specified PlaceReviewMeta from storage",
	 *      tags={"PlaceReviewMeta"},
	 *      description="Delete PlaceReviewMeta",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PlaceReviewMeta",
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
		/** @var PlaceReviewMeta $placeReviewMeta */
		$placeReviewMeta = $this->placeReviewMetaRepository->findWithoutFail($id);

		if (empty($placeReviewMeta)) {
			return $this->sendError('Place Review Meta not found');
		}

		$placeReviewMeta->delete();

		return $this->sendResponse($id, 'Place Review Meta deleted successfully');
	}
}
