<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Services\SiteSettingsService;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::query()
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (BlogPost $p) => $this->toListDto($p));

        return response()->json([
            'ok' => true,
            'posts' => $posts,
        ]);
    }

    public function show(string $slug)
    {
        $post = BlogPost::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json([
            'ok' => true,
            'post' => $this->toDetailDto($post),
        ]);
    }

    private function toListDto(BlogPost $p): array
    {
        return [
            'id' => $p->id,
            'title' => $p->title,
            'slug' => $p->slug,
            'excerpt' => $p->excerpt,
            'coverUrl' => $p->cover_image ? SiteSettingsService::publicUrl($p->cover_image) : null,
            'publishedAt' => optional($p->published_at)->toDateString(),
        ];
    }

    private function toDetailDto(BlogPost $p): array
    {
        return array_merge($this->toListDto($p), [
            'content' => $p->content,
        ]);
    }
}
