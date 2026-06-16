<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Admin Login</title>
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @endif
    </head>
    <body class="min-h-screen bg-black text-white">
        <div class="container-shell py-14">
            <div class="mx-auto max-w-lg rounded-[var(--radius-2xl)] glass-strong p-8">
                <div class="text-xl font-semibold">Admin Login</div>
                <div class="mt-2 text-sm text-white/65">Sign in to manage Settings, Projects, and Blog.</div>

                <form method="POST" action="{{ route('admin.login.post') }}" class="mt-6 space-y-4">
                    @csrf

                    <label class="block">
                        <div class="text-xs font-medium tracking-wide text-white/60">Username</div>
                        <input
                            name="username"
                            value="{{ old('username', 'admin') }}"
                            class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30"
                            required
                        />
                        @error('username')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                    </label>

                    <label class="block">
                        <div class="text-xs font-medium tracking-wide text-white/60">Password</div>
                        <input
                            name="password"
                            type="password"
                            class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30"
                            required
                        />
                        @error('password')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                    </label>

                    <button
                        type="submit"
                        class="mt-2 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    </body>
</html>

