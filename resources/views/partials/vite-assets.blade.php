@if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
    @vite(['resources/css/app.css', 'resources/js/app.js'])
@elseif (file_exists(base_path('bootstrap/vite-assets.php')))
    @php($viteAssets = require base_path('bootstrap/vite-assets.php'))
    @foreach ($viteAssets['css'] ?? [] as $href)
        <link rel="stylesheet" href="{{ $href }}" />
    @endforeach
    @foreach ($viteAssets['js'] ?? [] as $src)
        <script type="module" src="{{ $src }}"></script>
    @endforeach
@endif
