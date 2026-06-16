<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminSessionAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->session()->get('admin.authed') === true) {
            return $next($request);
        }

        return redirect()->route('admin.login');
    }
}

