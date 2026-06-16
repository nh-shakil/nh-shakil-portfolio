<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\SiteSettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function edit()
    {
        $settings = Setting::query()
            ->whereIn('key', SiteSettingsService::allKeys())
            ->get()
            ->keyBy('key');

        return view('admin.settings.edit', [
            'textKeys' => SiteSettingsService::textKeys(),
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'values' => ['required', 'array'],
            'profile_image_upload' => ['nullable', 'image', 'max:4096'],
            'cv_file_upload' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:8192'],
            'remove_cv' => ['nullable', 'boolean'],
        ]);

        foreach (SiteSettingsService::textKeys() as $key) {
            $val = $data['values'][$key] ?? null;
            Setting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $val === null ? null : (string) $val],
            );
        }

        if ($request->hasFile('profile_image_upload')) {
            $path = $request->file('profile_image_upload')->store('profile', 'public');
            Setting::query()->updateOrCreate(
                ['key' => 'profile_image'],
                ['value' => $path],
            );
        }

        if ($request->boolean('remove_cv')) {
            $this->deleteStoredFile(Setting::query()->where('key', 'cv_file')->value('value'));
            Setting::query()->where('key', 'cv_file')->delete();
        } elseif ($request->hasFile('cv_file_upload')) {
            $old = Setting::query()->where('key', 'cv_file')->value('value');
            $path = $request->file('cv_file_upload')->store('cvs', 'public');
            Setting::query()->updateOrCreate(
                ['key' => 'cv_file'],
                ['value' => $path],
            );
            $this->deleteStoredFile($old);
        }

        return back()->with('status', 'Settings updated.');
    }

    private function deleteStoredFile(?string $path): void
    {
        if (! $path || str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return;
        }

        Storage::disk('public')->delete($path);
    }
}
