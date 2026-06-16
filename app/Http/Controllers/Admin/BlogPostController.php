<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::query()
            ->orderByDesc('is_published')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();

        return view('admin.blog.index', compact('posts'));
    }

    public function create()
    {
        return view('admin.blog.create');
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        $slugBase = $data['slug'] ?: Str::slug($data['title']);
        $data['slug'] = $this->uniqueSlug($slugBase);

        $data['cover_image'] = $this->storeCover($request);
        $post = BlogPost::create($data);

        return redirect()->route('admin.blog-posts.edit', $post)->with('status', 'Blog post created.');
    }

    public function edit(BlogPost $blog_post)
    {
        return view('admin.blog.edit', ['post' => $blog_post]);
    }

    public function update(Request $request, BlogPost $blog_post)
    {
        $data = $this->validated($request);
        $data['slug'] = $data['slug'] ? $this->uniqueSlug($data['slug'], $blog_post->id) : $this->uniqueSlug(Str::slug($data['title']), $blog_post->id);

        $cover = $this->storeCover($request);
        if ($cover) $data['cover_image'] = $cover;

        $blog_post->fill($data)->save();

        return back()->with('status', 'Blog post updated.');
    }

    public function destroy(BlogPost $blog_post)
    {
        $blog_post->delete();
        return redirect()->route('admin.blog-posts.index')->with('status', 'Blog post deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'slug' => ['nullable', 'string', 'max:220'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['nullable', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'cover' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        $data['is_published'] = (bool) $request->boolean('is_published');
        $data['sort_order'] = (int) ($data['sort_order'] ?? 0);

        return $data;
    }

    private function uniqueSlug(string $base, ?int $ignoreId = null): string
    {
        $base = Str::slug($base);
        if ($base === '') $base = 'post';

        $slug = $base;
        $i = 2;
        while (
            BlogPost::query()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }

    private function storeCover(Request $request): ?string
    {
        $file = $request->file('cover');
        if (!$file) return null;
        return $file->store('blog', 'public');
    }
}

