<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthManager;
use App\Repositories\UsersRepository;

class ForbidBannedUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    private $auth;

    public function __construct(AuthManager $auth, UsersRepository $usersRepo)
    {
        $this->auth = $auth;
        $this->usersRepository = $usersRepo;
    }

    public function handle($request, Closure $next)
    {
        $id = $this->auth->id();
        $user = $this->usersRepository->findWithoutFail($id);
        if ($user && $user->isBanned()) {
            \Session::flush();
            return redirect('login')->withInput()->withErrors([
                'email' => 'This account is blocked.',
            ]);
        }
        return $next($request);
    }
}
