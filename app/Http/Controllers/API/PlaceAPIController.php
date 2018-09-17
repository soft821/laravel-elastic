<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePlaceAPIRequest;
use App\Http\Requests\API\UpdatePlaceAPIRequest;
use App\Models\Place;
use App\Repositories\PlaceRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class PlaceController
 * @package App\Http\Controllers\API
 */
class PlaceAPIController extends AppBaseController
{
	/** @var  PlaceRepository */
	private $placeRepository;
	private $jsonObject;

	public function __construct(PlaceRepository $placeRepo)
	{
		$this->placeRepository = $placeRepo;
	}

	private function buildMap(Request $request, array $fields = [])
	{

		$filter = $request->get('filter');

		if(empty($fields)) {
			$fields = ["place_id", "name", "lat", "lng", "domain", "_score"];
		}

		$fields = json_encode($fields);


		if (gettype($filter) === "string") {
			$filter = json_decode($filter);
		} else if (gettype($filter) === "array") {
			$filter = (object)$filter;
		} else {
			$filter = new \stdClass();
			$filter->minLat = 49;
			$filter->maxLat = 60;
			$filter->minLng = -11;
			$filter->maxLng = 0;
		}


		$jsonQuery = '{"body": 
					{
		 			"_source": '.$fields.',
		 			"sort": [],
					"query":{"bool":{"must":
					[
						{"range":
						{"lat":
							{
							"gt": "' . $filter->minLat . '",
							"lte": "' . $filter->maxLat . '"
						}
						}
						},
						{"range":
						{"lng":
							{
							"gt": "' . $filter->minLng . '",
							"lte": "' . $filter->maxLng . '"
							}
						}
						}
						],"must_not":[],"should":[]}},"from":' . ($request->get('page') - 1) * $request->get('limit') . ',"size":10,"sort":[],"aggs":{}}}';
		$this->jsonObject = json_decode($jsonQuery);


		$centerLat = $request->get('maxLat') - $request->get('minLat');
		$centerLng = $request->get('maxLng') - $request->get('minLng');


		array_push($this->jsonObject->body->sort, '_score');
		array_push($this->jsonObject->body->sort, (object)array('_geo_distance' =>
			(object)array(
				'location' => $centerLat . ',' . $centerLng,
				'order' => 'asc',
				'unit' => 'km'
			)));


	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/places/search",
	 *      summary="Get a listing of the Places with filters.",
	 *      tags={"Place"},
	 *      description="Get all Places",
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
	 *                  @SWG\Items(ref="#/definitions/Place")
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function search(Request $request)
	{
		$fields = ["place_id", "name", "lat", "lng", "domain", "categories.*", "_score"];

		$this->buildMap($request, $fields);

//		$additionalFilters = $request->get('additionalFilters') ?? [];
//
//		$customObject = $this->jsonObject;
//
//		if (count($additionalFilters)) {
//			$count = 0;
//			foreach ($additionalFilters as $filter) {
//				array_push($customObject->body->query->bool->must, (object)(array('term' => $filter)));
//			}
//		}
//
//		$places = Place::complexSearch($customObject);

		$search = $request->get('name');
		$places = Place::search($search);

		$placesArray['data'] = $places->toArray();
		$placesArray['totalItems'] = $places->totalHits();
		$placesArray['page'] = $request->get('page');
		$placesArray['itemsPerPage'] = $request->get('limit') ?? 10;

		return $this->sendResponse($placesArray, 'Places retrieved successfully');
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/places",
	 *      summary="Get a listing of the Places.",
	 *      tags={"Place"},
	 *      description="Get all Places",
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
	 *                  @SWG\Items(ref="#/definitions/Place")
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


		$this->buildMap($request);

		$additionalFilters = $request->get('additionalFilters') ?? [];


		$customObject = $this->jsonObject;


		if (count($additionalFilters)) {
			$count = 0;
			foreach ($additionalFilters as $filter) {
				array_push($customObject->body->query->bool->must, (object)(array('term' => $filter)));
			}


		}


		$places = Place::complexSearch($customObject);
		$placesArray['data'] = $places->toArray();
		$placesArray['totalItems'] = $places->totalHits();
		$placesArray['page'] = $request->get('page');
		$placesArray['itemsPerPage'] = $request->get('limit') ?? 10;

		return $this->sendResponse($placesArray, 'Places retrieved successfully');
	}

	public function map(Request $request)
	{
		$this->buildMap($request);
		$additionalFilters = $request->get('additionalFilters') ?? [];
		$customObject = $this->jsonObject;


		if (count($additionalFilters)) {
			$count = 0;
			foreach ($additionalFilters as $filter) {
				array_push($customObject->body->query->bool->must, (object)(array('term' => $filter)));
			}


		}

		$customObject->from = 0;
		$customObject->size = 10000;
		$places = Place::complexSearch($customObject);
		return $this->sendResponse($places->toArray(), 'Places retrieved successfully');
	}

	/**
	 * @param CreatePlaceAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/places",
	 *      summary="Store a newly created Place in storage",
	 *      tags={"Place"},
	 *      description="Store Place",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="Place that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/Place")
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
	 *                  ref="#/definitions/Place"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreatePlaceAPIRequest $request)
	{
		$input = $request->all();

		$places = $this->placeRepository->create($input);

		return $this->sendResponse($places->toArray(), 'Place saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/places/{id}",
	 *      summary="Display the specified Place",
	 *      tags={"Place"},
	 *      description="Get Place",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Place",
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
	 *                  ref="#/definitions/Place"
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
		/** @var Place $place */


		$place = $this->placeRepository->with(['meta', 'meta_data', 'image', 'nlu', 'review'])->findWithoutFail($id);

		if (empty($place)) {
			return $this->sendError('Place not found');
		}

		return $this->sendResponse($place->toArray(), 'Place retrieved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/places/{id}/details",
	 *      summary="Display the specified Place with details",
	 *      tags={"Place"},
	 *      description="Get Place and its details",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Place",
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
	 *                  ref="#/definitions/Place"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function details($id) {
		/** @var Place $place */


		$place = $this->placeRepository->with(['meta', 'meta_data'])->findWithoutFail($id);

		if (empty($place)) {
			return $this->sendError('Place not found');
		}

		return $this->sendResponse($place->toArray(), 'Place retrieved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/places/{id}/reviews",
	 *      summary="Display the specified Place with reviews",
	 *      tags={"Place"},
	 *      description="Get Place and its reviews",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Place",
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
	 *                  ref="#/definitions/Place"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */

	public function reviews($id, Request $request) {
		/** @var Place $place */


		$place = $this->placeRepository->findWithoutFail($id);

		$place->load(['review' => function($q) use ($request) {
			$q->paginate($request->get('limit'));
		}]);

		if (empty($place)) {
			return $this->sendError('Place not found');
		}

		return $this->sendResponse($place->toArray(), 'Place retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdatePlaceAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/places/{id}",
	 *      summary="Update the specified Place in storage",
	 *      tags={"Place"},
	 *      description="Update Place",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Place",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="Place that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/Place")
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
	 *                  ref="#/definitions/Place"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdatePlaceAPIRequest $request)
	{
		$input = $request->all();

		/** @var Place $place */
		$place = $this->placeRepository->findWithoutFail($id);

		if (empty($place)) {
			return $this->sendError('Place not found');
		}

		$place = $this->placeRepository->update($input, $id);

		return $this->sendResponse($place->toArray(), 'Place updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/places/{id}",
	 *      summary="Remove the specified Place from storage",
	 *      tags={"Place"},
	 *      description="Delete Place",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Place",
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
		/** @var Place $place */
		$place = $this->placeRepository->findWithoutFail($id);

		if (empty($place)) {
			return $this->sendError('Place not found');
		}

		$place->delete();

		return $this->sendResponse($id, 'Place deleted successfully');
	}
}
