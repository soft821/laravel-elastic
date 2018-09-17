<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePhotoLabelAPIRequest;
use App\Http\Requests\API\UpdatePhotoLabelAPIRequest;
use App\Models\PhotoLabel;
use App\Repositories\PhotoLabelRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PhotoLabelController
 * @package App\Http\Controllers\API
 */
class PhotoLabelAPIController extends AppBaseController
{
	/** @var  PhotoLabelRepository */
	private $photoLabelRepository;

	public function __construct(PhotoLabelRepository $photoLabelRepo)
	{
		$this->photoLabelRepository = $photoLabelRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/photoLabels",
	 *      summary="Get a listing of the PhotoLabels.",
	 *      tags={"PhotoLabel"},
	 *      description="Get all PhotoLabels",
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
	 *                  @SWG\Items(ref="#/definitions/PhotoLabel")
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
		$this->photoLabelRepository->pushCriteria(new RequestCriteria($request));
		$this->photoLabelRepository->pushCriteria(new LimitOffsetCriteria($request));
		$photoLabels = $this->photoLabelRepository->all();

		return $this->sendResponse($photoLabels->toArray(), 'Photo Labels retrieved successfully');
	}

	/**
	 * @param CreatePhotoLabelAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/photoLabels",
	 *      summary="Store a newly created PhotoLabel in storage",
	 *      tags={"PhotoLabel"},
	 *      description="Store PhotoLabel",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PhotoLabel that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PhotoLabel")
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
	 *                  ref="#/definitions/PhotoLabel"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePhotoLabelAPIRequest $request)
	{
		$input = $request->all();

		$photoLabels = $this->photoLabelRepository->create($input);

		return $this->sendResponse($photoLabels->toArray(), 'Photo Label saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/photoLabels/{id}",
	 *      summary="Display the specified PhotoLabel",
	 *      tags={"PhotoLabel"},
	 *      description="Get PhotoLabel",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PhotoLabel",
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
	 *                  ref="#/definitions/PhotoLabel"
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
		/** @var PhotoLabel $photoLabel */
		$photoLabel = $this->photoLabelRepository->findWithoutFail($id);

		if (empty($photoLabel)) {
			return $this->sendError('Photo Label not found');
		}

		return $this->sendResponse($photoLabel->toArray(), 'Photo Label retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePhotoLabelAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/photoLabels/{id}",
	 *      summary="Update the specified PhotoLabel in storage",
	 *      tags={"PhotoLabel"},
	 *      description="Update PhotoLabel",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PhotoLabel",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="PhotoLabel that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/PhotoLabel")
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
	 *                  ref="#/definitions/PhotoLabel"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePhotoLabelAPIRequest $request)
	{
		$input = $request->all();

		/** @var PhotoLabel $photoLabel */
		$photoLabel = $this->photoLabelRepository->findWithoutFail($id);

		if (empty($photoLabel)) {
			return $this->sendError('Photo Label not found');
		}

		$photoLabel = $this->photoLabelRepository->update($input, $id);

		return $this->sendResponse($photoLabel->toArray(), 'PhotoLabel updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/photoLabels/{id}",
	 *      summary="Remove the specified PhotoLabel from storage",
	 *      tags={"PhotoLabel"},
	 *      description="Delete PhotoLabel",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of PhotoLabel",
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
		/** @var PhotoLabel $photoLabel */
		$photoLabel = $this->photoLabelRepository->findWithoutFail($id);

		if (empty($photoLabel)) {
			return $this->sendError('Photo Label not found');
		}

		$photoLabel->delete();

		return $this->sendResponse($id, 'Photo Label deleted successfully');
	}
}
