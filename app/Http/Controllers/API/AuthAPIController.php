<?php namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Models\Roles;
use Illuminate\Http\Request;
use GuzzleHttp;
use App\Models\Users;


class AuthAPIController extends AppBaseController
{

    /**
     * Generate JSON Web Token.
     */
    protected function createToken($user)
    {
        return  $user->createToken('facebook')->accessToken;
    }


    /**
     * Unlink provider.
     */
    public function unlink(Request $request, $provider)
    {
        $user = Users::find($request['user']['sub']);

        if (!$user)
        {
            return response()->json(['message' => 'User not found']);
        }

        $user->$provider = '';
        $user->save();

        return response()->json(array('token' => $this->createToken($user)));
    }

    /**
     * Log in with Email and Password.
     */
    public function login(Request $request)
    {

    }

    /**
     * Create Email and Password Account.
     */
    public function signup(Request $request)
    {

    }


	/**
     * Login with Facebook.
     */
    public function facebook(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'redirect_uri' => $request->input('redirectUri'),
            'client_secret' => config('services.facebook.client_secret')
        ];


        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/oauth/access_token', [
            'query' => $params
        ]);

        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $fields = 'id,email,first_name,last_name,link,name';
        $profileResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/me', [
            'query' => [
                'access_token' => $accessToken['access_token'],
                'fields' => $fields
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);


		$user = Users::where('facebook', '=', $profile['id']);

            if ($user->first())
            {
                return response()->json(['token' => $this->createToken($user->first())]);
            }


		$username = $user->username ?? $profile['email'];
		$password = md5(time());


		$user = Users::updateOrCreate(['email' => $profile['email']],
			['facebook' => $profile['id'], 'username' => $username, 'password' => $password]);

		$role = Roles::where('slug', 'app')->first();

            $user->save();

            $user->roles()->attach($role);


            return response()->json(['token' => $this->createToken($user)]);

	}
    /**
     * Login with Google.
     */
    public function google(Request $request)
    {
        $client = new GuzzleHttp\Client();



        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'client_secret' => config('services.google.client_secret'),
            'redirect_uri' => $request->input('redirectUri'),
            'grant_type' => 'authorization_code',
        ];


        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('POST', 'https://accounts.google.com/o/oauth2/token', [
            'form_params' => $params
        ],
            [
                'headers' => [
                    'encoding' => 'application/x-www-form-urlencoded'
                ]
            ]);

        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://www.googleapis.com/plus/v1/people/me/openIdConnect', [
            'headers' => array('Authorization' => 'Bearer ' . $accessToken['access_token'])
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {


            $user = Users::where('google', '=', $profile['sub']);



            if ($user->first())
            {
                return response()->json(['token' => $this->createToken($user->first())]);
            }




            $user = auth('api')->user();

            if($user) {
                $user->google = $profile['sub'];
                $user->email = $user->email ?: $profile['email'];
                $user->username = $user->username ?? $profile['email'];
                $user->password = md5(time());

                //  $user->displayName = $user->displayName ?: $profile['name'];
                $user->save();

                return response()->json(['token' => $this->createToken($user)]);
            }else {
                return response()->json(['error' => 'error with this token'], 409);
            }
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $user = Users::where('google', '=', $profile['sub']);

            if ($user->first())
            {
                return response()->json(['token' => $this->createToken($user->first())]);
            }

            $user = new Users;
            $user->facebook = $profile['id'];
            $user->email = $profile['email'];
            $user->username = $user->username ?? $profile['email'];
            $user->password = md5(time());

            $role = Roles::where('slug','consumer')->first();

            $user->save();

            $user->roles()->attach($role);


            return response()->json(['token' => $this->createToken($user)]);
        }
    }

    /**
     * Login with Linkedin.
     */
    public function linkedin(Request $request)
    {
        $client = new GuzzleHttp\Client();

        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'redirect_uri' => $request->input('redirectUri'),
            'client_secret' => config('services.linkedin.client_secret'),
            'grant_type' => 'authorization_code'
        ];


        // Step 1. Exchange authorization code for access token.

        $accessTokenResponse = $client->request('POST', 'https://www.linkedin.com/uas/oauth2/accessToken', [
            'form_params' => $params
        ]);

        $accessToken = json_decode($accessTokenResponse->getBody(), true);

        // Step 2. Retrieve profile information about the current user.
        $profileResponse = $client->request('GET', 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address)', [
            'query' => [
                'oauth2_access_token' => $accessToken['access_token'],
                'format' => 'json'
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);

        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {


            $user = Users::where('linkedin', '=', $profile['id']);



            if ($user->first())
            {
                return response()->json(['token' => $this->createToken($user->first())]);
            }




            $user = auth('api')->user();

            if($user) {
                $user->linkedin = $profile['id'];
                $user->email = $user->email ?: $profile['email'];
                $user->username = $user->username ?? $profile['email'];
                $user->password = md5(time());

                //  $user->displayName = $user->displayName ?: $profile['name'];
                $user->save();

                return response()->json(['token' => $this->createToken($user)]);
            }else {
                return response()->json(['error' => 'error with this token'], 409);
            }
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $user = Users::where('linkedin', '=', $profile['id']);

            if ($user->first())
            {
                return response()->json(['token' => $this->createToken($user->first())]);
            }

            $user = new Users;
            $user->facebook = $profile['id'];

            $user->email = $profile['emailAddress'];
            $user->username = $user->username ?? $profile['emailAddress'];
            $user->password = md5(time());

            $role = Roles::where('slug','consumer')->first();

            $user->save();

            $user->roles()->attach($role);


            return response()->json(['token' => $this->createToken($user)]);
        }
    }


}