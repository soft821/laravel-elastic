<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePhotoFaceAPIRequest;
use App\Http\Requests\API\UpdatePhotoFaceAPIRequest;
use App\Models\PhotoFace;
use App\Repositories\PhotoFaceRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PhotoFaceController
 * @package App\Http\Controllers\API
 */

class PhotoFaceAPIController extends AppBaseController
{
    /** @var  PhotoFaceRepository */
    private $photoFaceRepository;

    public function __construct(PhotoFaceRepository $photoFaceRepo)
    {
        $this->photoFaceRepository = $photoFaceRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/photoFaces",
     *      summary="Get a listing of the PhotoFaces.",
     *      tags={"PhotoFace"},
     *      description="Get all PhotoFaces",
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
     *                  @SWG\Items(ref="#/definitions/PhotoFace")
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
        $this->photoFaceRepository->pushCriteria(new RequestCriteria($request));
        $this->photoFaceRepository->pushCriteria(new LimitOffsetCriteria($request));
        $photoFaces = $this->photoFaceRepository->all();

        return $this->sendResponse($photoFaces->toArray(), 'Photo Faces retrieved successfully');
    }

    /**
     * @param CreatePhotoFaceAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/photoFaces",
     *      summary="Store a newly created PhotoFace in storage",
     *      tags={"PhotoFace"},
     *      description="Store PhotoFace",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="PhotoFace that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/PhotoFace")
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
     *                  ref="#/definitions/PhotoFace"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreatePhotoFaceAPIRequest $request)
    {
        $input = $request->all();

        $photoFaces = $this->photoFaceRepository->create($input);

        return $this->sendResponse($photoFaces->toArray(), 'Photo Face saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/photoFaces/{id}",
     *      summary="Display the specified PhotoFace",
     *      tags={"PhotoFace"},
     *      description="Get PhotoFace",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of PhotoFace",
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
     *                  ref="#/definitions/PhotoFace"
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
        /** @var PhotoFace $photoFace */
        $photoFace = $this->photoFaceRepository->findWithoutFail($id);

        if (empty($photoFace)) {
            return $this->sendError('Photo Face not found');
        }

        return $this->sendResponse($photoFace->toArray(), 'Photo Face retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdatePhotoFaceAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/photoFaces/{id}",
     *      summary="Update the specified PhotoFace in storage",
     *      tags={"PhotoFace"},
     *      description="Update PhotoFace",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of PhotoFace",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="PhotoFace that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/PhotoFace")
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
     *                  ref="#/definitions/PhotoFace"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdatePhotoFaceAPIRequest $request)
    {
        $input = $request->all();

        /** @var PhotoFace $photoFace */
        $photoFace = $this->photoFaceRepository->findWithoutFail($id);

        if (empty($photoFace)) {
            return $this->sendError('Photo Face not found');
        }

        $photoFace = $this->photoFaceRepository->update($input, $id);

        return $this->sendResponse($photoFace->toArray(), 'PhotoFace updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/photoFaces/{id}",
     *      summary="Remove the specified PhotoFace from storage",
     *      tags={"PhotoFace"},
     *      description="Delete PhotoFace",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of PhotoFace",
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
        /** @var PhotoFace $photoFace */
        $photoFace = $this->photoFaceRepository->findWithoutFail($id);

        if (empty($photoFace)) {
            return $this->sendError('Photo Face not found');
        }

        $photoFace->delete();

        return $this->sendResponse($id, 'Photo Face deleted successfully');
    }
}
