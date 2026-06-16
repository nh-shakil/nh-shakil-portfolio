@php
    use App\Models\ContactMessage;
    $unreadMessages = ContactMessage::query()->whereNull('read_at')->count();
@endphp
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Portfolio Admin</title>
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @endif
    </head>
    <body class="min-h-screen bg-black text-white">
        <div class="container-shell py-10">
            <div class="flex items-center justify-between">
                <div>
                    <div class="text-xl font-semibold">Portfolio Admin</div>
                    <div class="mt-1 text-sm text-white/60">Manage projects & images</div>
                </div>
                <div class="flex items-center gap-2">
                    <a href="/admin/projects" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">Projects</a>
                    <a href="/admin/settings" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">Settings</a>
                    <a href="/admin/timeline" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">Timeline</a>
                    <a href="/admin/gallery" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">Gallery</a>
                    <a href="/admin/contact-messages" class="relative rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
                        Messages
                        @if ($unreadMessages > 0)
                            <span class="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-300/20 px-1.5 py-0.5 text-[11px] text-rose-100">
                                {{ $unreadMessages }}
                            </span>
                        @endif
                    </a>
                    <a href="/admin/blog-posts" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">Blog</a>
                    <a href="/" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">View site</a>
                    <form method="POST" action="{{ route('admin.logout') }}">
                        @csrf
                        <button type="submit" class="rounded-full border border-rose-300/20 bg-rose-300/10 px-4 py-2 text-sm text-rose-100 hover:bg-rose-300/15">
                            Logout
                        </button>
                    </form>
                </div>
            </div>

            @if (session('status'))
                <div class="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
                    {{ session('status') }}
                </div>
            @endif

            <div class="mt-8">
                @yield('content')
            </div>
        </div>
    </body>
</html>

