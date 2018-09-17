<?php
/**
 * Created by PhpStorm.
 * User: anthonylucas
 * Date: 2/07/2018
 * Time: 5:52 PM
 */


Route::get('checkAuthentication', 'UsersAPIController@checkAuthentication')->middleware('auth:api')->name('checkAuthentication');
Route::get('check/user', 'UsersAPIController@checkUser')->middleware('auth:api')->name('users.check');


/**
 * @SWG\Post(
 *      path="/api/v1/login",
 *      summary="Requests an access token from the user",
 *      tags={"Users"},
 *      description="Get access token details",
 *      produces={"application/json"},
 *      @SWG\Parameter(
 *          name="email",
 *          description="email of the user",
 *          type="string",
 *          required=true,
 *          in="path"
 *      ),
 *     	@SWG\Parameter(
 *          name="password",
 *          description="password of the user",
 *          type="string",
 *          required=true,
 *          in="path"
 *      ),
 *      @SWG\Response(
 *          response=200,
 *          description="successful operation",
 *          @SWG\Schema(
 *              type="object",
 *              @SWG\Property(
 *                  property="access_token",
 *                  type="string"
 *              ),
 *              @SWG\Property(
 *                  property="refresh_token",
type="string"
 *              ),
 *     *        @SWG\Property(
 *                  property="expires_in",
type="string"
 *              )
 *              @SWG\Property(
 *                  property="token_type",
 *                  type="string"
 *              )
 *          )
 *      )
 * )
 */

Route::get('users/current', 'UsersAPIController@getCurrentUser')->middleware('auth:api')->name('users.current');
Route::get('users/current/menu', 'MenusAPIController@getMenuByUser')->middleware('auth:api')->name('users.current.menu');
Route::post('addRemovePermissionToRole', 'MenusAPIController@addRemovePermissionToRole')->middleware('auth:api')->name('addRemovePermissionToRole');
Route::post('addRemoveMenuToRole', 'MenusAPIController@addRemoveMenuToRole')->middleware('auth:api')->name('addRemoveMenuToRole');

Route::get('/user', function (Request $request) {
	return $request->user();
})->middleware('auth:api');

Route::group(['middleware' => 'guest', 'name' => 'users.store'], function () {
	Route::post('users', 'UsersAPIController@store');
});

Route::group(['middleware' => 'guest'], function () {

	Route::get('auth/redirect', 'AuthAPIController@redirect');
	Route::post('auth/facebook', 'AuthAPIController@facebook');
	Route::post('auth/google', 'AuthAPIController@google');
	Route::post('auth/linkedin', 'AuthAPIController@linkedin');

});

Route::get('menuesByRole', 'MenusAPIController@menuesByRole')->middleware('auth:api')->name('menuesByRole');


Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'photos'], function () {
	Route::resource('photos', 'PhotosAPIController');
});


Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'users'], function () {
	Route::get('users', 'UsersAPIController@index');
	Route::put('users', 'UsersAPIController@update');
	Route::delete('users', 'UsersAPIController@destroy');
});

Route::get('routes', 'MenusAPIController@routes')->middleware('auth:api')->name('allRoutes');

Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'photos.labels'], function () {

	Route::resource('photos/labels', 'PhotoLabelAPIController');
});

Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'photos.faces'], function () {
	Route::resource('photos/faces', 'PhotoFaceAPIController');
});

Route::middleware('auth:api', 'throttle:60,1')->group(function () {
	Route::get('photo/categories', 'PhotoCatAPIController@index');
});

Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'places.map'], function () {
	Route::post('places/map', 'PlaceAPIController@map')->name('places.map.get');
});


Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'places.index.post'], function () {
	Route::post('places/index', 'PlaceAPIController@index')->name('places.index.post');
});



Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'places.reviews'], function () {
	Route::get('places/{id}/reviews', 'PlaceAPIController@reviews')->name('places.reviews');
});



Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'places.details'], function () {
	Route::get('places/{id}/details', 'PlaceAPIController@reviews')->name('places.details');
});



//Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'places.search'], function () {
//	Route::post('places/search', 'PlaceAPIController@search')->name('places.search');
//});
Route::post('places/search', 'PlaceAPIController@search')->name('places.search');


Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'places'], function () {
	Route::resource('places', 'PlaceAPIController');
});


Route::group(['middleware' => ["auth:api", "throttle:60,1"], 'name' => 'messages'], function () {
	Route::resource('messages', 'MessagesAPIController');
});


Route::get('show/messages', 'MessagesAPIController@getChatMessagesPerUser')->middleware('auth:api')->name('show.messages');
Route::get('show/chat', 'MessagesAPIController@getChatPerUser')->middleware('auth:api')->name('show.chat');
Route::get('show/group/messages/{id}', 'MessagesAPIController@getChatMessagesPerGroup')->middleware('auth:api')->name('show.group.messages');
Route::get('show/group/chat', 'MessagesAPIController@getChatPerGroup')->middleware('auth:api')->name('show.group.chat');
Route::get('chat/slideBar/list', 'MessagesAPIController@getChatList')->middleware('auth:api')->name('chat.list');
