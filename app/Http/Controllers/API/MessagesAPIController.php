<?php

namespace App\Http\Controllers\API;

use App\Criteria\GetGroupSlidePanelCriteria;
use App\Criteria\GetMessagesForGroupCriteria;
use App\Http\Requests\API\CreateMessagesAPIRequest;
use App\Http\Requests\API\UpdateMessagesAPIRequest;
use App\Models\Messages;
use App\Models\ChatGroup;
use App\Models\Users;
use App\Repositories\MessagesRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Criteria\MessagesCriteria;
use App\Criteria\GetMessagesForUserCriteria;
use App\Criteria\GetUserSlidePanelCriteria;
use Illuminate\Auth\AuthManager;
use Response;
use App\Jobs\NotificationSend;


/**
 * Class MessagesController
 * @package App\Http\Controllers\API
 */
class MessagesAPIController extends AppBaseController
{
	/** @var  MessagesRepository */
	private $messagesRepository;

	public function __construct(MessagesRepository $messagesRepo, AuthManager $auth)
	{
		$this->messagesRepository = $messagesRepo;
		$this->auth = $auth;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/messages",
	 *      summary="Get a listing of the Messages.",
	 *      tags={"Messages"},
	 *      description="Get all Messages",
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
	 *                  @SWG\Items(ref="#/definitions/Messages")
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
		$this->messagesRepository->pushCriteria(new RequestCriteria($request));
		$this->messagesRepository->pushCriteria(new LimitOffsetCriteria($request));
		$this->messagesRepository->pushCriteria(new MessagesCriteria($this->auth));

		$messages = $this->messagesRepository->with(['from', 'to'])->paginate();


		return $this->sendResponse($messages->toArray(), 'Messages retrieved successfully');
	}

	public function getChatMessagesPerGroup($id)
	{

	}

	public function getChatPerGroup(Request $request)
	{
		$this->messagesRepository->pushCriteria(new GetGroupSlidePanelCriteria($this->auth));
		$messages = $this->messagesRepository->with(['from', 'to', 'from.programmeGroups'])->scopeQuery(function ($query) {
			return $query->groupBy('user_from');
		})->all();

		return $this->sendResponse($messages->toArray(), 'Messages retrieved successfully');
	}


	public function getChatMessagesPerUser(Request $request)
	{
		$input = $request->all();
		if ($input['type'] == "individual") {
			$this->messagesRepository->pushCriteria(new GetMessagesForUserCriteria($request->get('from'), $this->auth));
			$messages = $this->messagesRepository->with(['from', 'to'])->scopeQuery(function ($query) {
				return $query->orderBy('created_at');
			})->all();

			return $this->sendResponse($messages->toArray(), 'Messages retrieved successfully');
		} else {
			$messagesArray = array();
			$groupMessages = Messages::where('group_id', '=', $input['from'])->where('message', '!=', "");
			$groupMessagesArray = $groupMessages->orderBy('created_at')->get()->toArray();
			foreach ($groupMessagesArray as $groupMessage) {
				$timestamp = Carbon::parse($groupMessage['created_at']);
				$user = Users::find($groupMessage['user_from']);
				array_push($messagesArray, [
					'created' => $groupMessage['created'], 'from' => array(
						'first_name' => $user->first_name,
						'last_name' => $user->last_name,
						'avatar' => $user->avatar
					),
					'message' => $groupMessage['message'],
					'timestamp' => $timestamp
				]);
			}
			$msgsCollection = collect($messagesArray);
			$sortedCollection = $msgsCollection->sortBy('timestamp');


			return $this->sendResponse($sortedCollection, 'Group Messages retrieved successfully');

		}

	}


	public function getChatList()
	{


		$individualMessagesArray = array();
		$individualMessages = Messages::where('user_to', '=', $this->auth->id())->where('group_id', '=', null)->where('user_from', '!=', $this->auth->id())
			->select('user_from', DB::raw("MAX(created_at) as created"))->groupBy('user_from')->orderBy(DB::raw("MAX(created_at)"), 'desc')->get()->toArray();

		foreach ($individualMessages as $individualMessage) {
			$fromUser = Users::find($individualMessage['user_from']);
			$timestamp = Carbon::parse($individualMessage['created']);
			array_push($individualMessagesArray, ['type' => 'individual', 'id' => $individualMessage['user_from'], 'created_at' => $individualMessage['created'], 'name' => $fromUser->first_name . ' ' . $fromUser->last_name, 'avatar' => $fromUser->avatar, 'timestamp' => $timestamp]);
		}


		$groupMessagesArray = array();
		$groupMessages = Messages::where('user_to', '=', $this->auth->id())->where('group_id', '!=', null)->where('user_from', '!=', $this->auth->id())
			->select('group_id', DB::raw("MAX(created_at) as created"))->groupBy('group_id')->orderBy(DB::raw("MAX(created_at)"), 'desc')->get()->toArray();

		foreach ($groupMessages as $groupMessage) {
			$fromGroup = ChatGroup::find($groupMessage['group_id']);
			$timestamp = Carbon::parse($groupMessage['created']);
			array_push($groupMessagesArray, ['type' => 'group', 'id' => $groupMessage['group_id'], 'created_at' => $groupMessage['created'], 'name' => $fromGroup->group_name, 'avatar' => 'images/Untitled-8-512.png', 'timestamp' => $timestamp]);
		}

		$slideBarArray = array_merge($groupMessagesArray, $individualMessagesArray);
		$slideBarCollection = collect($slideBarArray);
		$sortedCollection = $slideBarCollection->sortByDesc('timestamp');


		return $this->sendResponse($sortedCollection, 'Chat slide bar retrieved  successfully');

	}


	/**
	 * @param CreateMessagesAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/messages",
	 *      summary="Store a newly created Messages in storage",
	 *      tags={"Messages"},
	 *      description="Store Messages",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="Messages that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/Messages")
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
	 *                  ref="#/definitions/Messages"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreateMessagesAPIRequest $request)
	{
		$input = $request->all();
		$messages = $this->messagesRepository->create($input);
		return $this->sendResponse($messages->toArray(), 'Messages saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/messages/{id}",
	 *      summary="Display the specified Messages",
	 *      tags={"Messages"},
	 *      description="Get Messages",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Messages",
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
	 *                  ref="#/definitions/Messages"
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
		/** @var Messages $messages */
		$messages = $this->messagesRepository->findWithoutFail($id);

		if (empty($messages)) {
			return $this->sendError('Messages not found');
		}

		return $this->sendResponse($messages->toArray(), 'Messages retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdateMessagesAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/messages/{id}",
	 *      summary="Update the specified Messages in storage",
	 *      tags={"Messages"},
	 *      description="Update Messages",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Messages",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="Messages that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/Messages")
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
	 *                  ref="#/definitions/Messages"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdateMessagesAPIRequest $request)
	{
		$input = $request->all();

		/** @var Messages $messages */
		$messages = $this->messagesRepository->findWithoutFail($id);

		if (empty($messages)) {
			return $this->sendError('Messages not found');
		}

		$messages = $this->messagesRepository->update($input, $id);

		return $this->sendResponse($messages->toArray(), 'Messages updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/messages/{id}",
	 *      summary="Remove the specified Messages from storage",
	 *      tags={"Messages"},
	 *      description="Delete Messages",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of Messages",
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
		/** @var Messages $messages */
		$messages = $this->messagesRepository->findWithoutFail($id);

		if (empty($messages)) {
			return $this->sendError('Messages not found');
		}

		$messages->delete();

		return $this->sendResponse($id, 'Messages deleted successfully');
	}
}