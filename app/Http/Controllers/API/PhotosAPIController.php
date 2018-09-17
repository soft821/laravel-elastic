<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePhotosAPIRequest;
use App\Http\Requests\API\UpdatePhotosAPIRequest;
use App\Models\Photos;
use App\Repositories\PhotosRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PhotosController
 * @package App\Http\Controllers\API
 */

class PhotosAPIController extends AppBaseController
{
    /** @var  PhotosRepository */
    private $photosRepository;

    public function __construct(PhotosRepository $photosRepo)
    {
        $this->photosRepository = $photosRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/photos",
     *      summary="Get a listing of the Photos.",
     *      tags={"Photos"},
     *      description="Get all Photos",
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
     *                  @SWG\Items(ref="#/definitions/Photos")
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
        $this->photosRepository->pushCriteria(new RequestCriteria($request));
        $this->photosRepository->pushCriteria(new LimitOffsetCriteria($request));
		$photos = $this->photosRepository->with(['labels', 'categories', 'faces'])->paginate($request->get('limit'));


        return $this->sendResponse($photos->toArray(), 'Photos retrieved successfully');
    }

    /**
     * @param CreatePhotosAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/photos",
     *      summary="Store a newly created Photos in storage",
     *      tags={"Photos"},
     *      description="Store Photos",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Photos that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Photos")
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
     *                  ref="#/definitions/Photos"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreatePhotosAPIRequest $request)
    {
        $input = $request->all();

        $photos = $this->photosRepository->create($input);

        return $this->sendResponse($photos->toArray(), 'Photos saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/photos/{id}",
     *      summary="Display the specified Photos",
     *      tags={"Photos"},
     *      description="Get Photos",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Photos",
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
     *                  ref="#/definitions/Photos"
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
        /** @var Photos $photos */
		$photos = $this->photosRepository->with(['labels', 'categories', 'faces'])->findWithoutFail($id);

        if (empty($photos)) {
            return $this->sendError('Photos not found');
        }

        return $this->sendResponse($photos->toArray(), 'Photos retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdatePhotosAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/photos/{id}",
     *      summary="Update the specified Photos in storage",
     *      tags={"Photos"},
     *      description="Update Photos",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Photos",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Photos that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Photos")
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
     *                  ref="#/definitions/Photos"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdatePhotosAPIRequest $request)
    {
        $input = $request->all();

        /** @var Photos $photos */
        $photos = $this->photosRepository->findWithoutFail($id);

        if (empty($photos)) {
            return $this->sendError('Photos not found');
        }

        $photos = $this->photosRepository->update($input, $id);

        return $this->sendResponse($photos->toArray(), 'Photos updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/photos/{id}",
     *      summary="Remove the specified Photos from storage",
     *      tags={"Photos"},
     *      description="Delete Photos",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Photos",
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
        /** @var Photos $photos */
        $photos = $this->photosRepository->findWithoutFail($id);

        if (empty($photos)) {
            return $this->sendError('Photos not found');
        }

        $photos->delete();

        return $this->sendResponse($id, 'Photos deleted successfully');
    }
}
