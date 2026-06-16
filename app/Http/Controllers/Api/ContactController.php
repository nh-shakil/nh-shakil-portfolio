<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        // Intentionally minimal: you can later wire this to Mail, DB, or a CRM.
        // Returning a stable JSON response keeps the frontend UX predictable.
        return response()->json([
            'ok' => true,
            'message' => 'Message received.',
            'data' => [
                'name' => $data['name'],
                'email' => $data['email'],
            ],
        ]);
    }
}

