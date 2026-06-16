<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SiteSettingsService;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json([
            'ok' => true,
            'site' => SiteSettingsService::toSiteArray(),
        ]);
    }
}
