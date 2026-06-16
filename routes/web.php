<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\TimelineItemController;
use App\Http\Controllers\Admin\GalleryItemController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Services\SiteSettingsService;

function portfolioWelcomeView()
{
    $title = 'NH Shakil — Software Engineer & Full Stack Developer';
    $description = 'NH Shakil — Software Engineer & Full Stack Developer from Bangladesh.';

    try {
        $site = SiteSettingsService::toSiteArray();
        if (! empty($site['name']) && ! empty($site['title'])) {
            $title = $site['name'].' — '.$site['title'];
        }
        if (! empty($site['tagline'])) {
            $description = $site['tagline'];
        }
    } catch (\Throwable) {
        // Keep defaults when settings are unavailable during setup.
    }

    return view('welcome', [
        'title' => $title,
        'description' => $description,
        'hasBuild' => file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')),
    ]);
}

Route::get('/', portfolioWelcomeView(...));

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::middleware('admin.auth')->group(function () {
        Route::redirect('/', '/admin/projects');
        Route::resource('projects', ProjectController::class)->except(['show']);
        Route::get('/settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::post('/settings', [SettingController::class, 'update'])->name('settings.update');
        Route::resource('blog-posts', BlogPostController::class)->except(['show']);
        Route::resource('timeline', TimelineItemController::class)->except(['show']);
        Route::resource('gallery', GalleryItemController::class)->except(['show']);
        Route::get('/contact-messages', [ContactMessageController::class, 'index'])->name('contact-messages.index');
        Route::get('/contact-messages/{contact_message}', [ContactMessageController::class, 'show'])->name('contact-messages.show');
        Route::delete('/contact-messages/{contact_message}', [ContactMessageController::class, 'destroy'])->name('contact-messages.destroy');
    });
});

Route::fallback(function () {
    if (request()->is('admin', 'admin/*')) {
        abort(404);
    }

    return portfolioWelcomeView();
});
