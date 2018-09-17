<?php

namespace App\Http\Middleware;

use Closure;
use DCN\RBAC\Models\Permission;

class CheckPermissions
{

	protected $except = [
		'api/v1/login',
	];

	/**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();


        $slug   = str_replace("api.","",$request->route()->getName());

    	 if($user){
    	   if (!$user->may($slug)){ // you can pass an id or slug
    	   	 return response()->json(['error' => 'Unauthenticated.'], 401);
	     }
    	 }
    	return $next($request);
    }
}
