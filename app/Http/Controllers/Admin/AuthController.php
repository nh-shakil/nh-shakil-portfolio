<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('admin.auth.login');
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $user = (string) config('portfolio.admin_user', 'admin');
        $pass = (string) config('portfolio.admin_pass', '');

        if ($pass === '') {
            return back()->withErrors(['password' => 'Admin password not configured in .env'])->onlyInput('username');
        }

        if ($data['username'] !== $user || $data['password'] !== $pass) {
            return back()->withErrors(['password' => 'Invalid credentials'])->onlyInput('username');
        }

        $request->session()->put('admin.authed', true);
        $request->session()->regenerate();

        return redirect()->route('admin.projects.index');
    }

    public function logout(Request $request)
    {
        $request->session()->forget('admin.authed');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}

