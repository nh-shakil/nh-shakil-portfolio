<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::query()
            ->withCount('images')
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();

        return view('admin.projects.index', compact('projects'));
    }

    public function create()
    {
        return view('admin.projects.create');
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        $slugBase = $data['slug'] ?: Str::slug($data['title']);
        $data['slug'] = $this->uniqueSlug($slugBase);

        $project = Project::create($data);
        $this->syncImages($project, $request);

        return redirect()->route('admin.projects.index')->with('status', 'Project created.');
    }

    public function edit(Project $project)
    {
        $project->load('images');
        return view('admin.projects.edit', compact('project'));
    }

    public function update(Request $request, Project $project)
    {
        $data = $this->validated($request);

        if (($data['slug'] ?? '') !== '') {
            $project->slug = $this->uniqueSlug($data['slug'], $project->id);
        } else {
            $project->slug = $this->uniqueSlug(Str::slug($data['title']), $project->id);
        }

        $project->fill($data)->save();
        $this->syncImages($project, $request);

        return redirect()->route('admin.projects.edit', $project)->with('status', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('admin.projects.index')->with('status', 'Project deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'slug' => ['nullable', 'string', 'max:220'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'tech_stack' => ['nullable', 'string'],
            'role' => ['nullable', 'string', 'max:120'],
            'client' => ['nullable', 'string', 'max:120'],
            'completed_at' => ['nullable', 'date'],
            'live_url' => ['nullable', 'url'],
            'github_url' => ['nullable', 'url'],
            'is_featured' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'remove_image_ids' => ['nullable', 'array'],
            'remove_image_ids.*' => ['integer'],
            'images' => ['nullable', 'array'],
            'images.*' => ['file', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        $data['is_featured'] = (bool) ($request->boolean('is_featured'));
        $data['sort_order'] = (int) ($data['sort_order'] ?? 0);

        $stack = array_filter(array_map('trim', explode(',', (string) ($data['tech_stack'] ?? ''))));
        $data['tech_stack'] = $stack === [] ? null : $stack;

        return $data;
    }

    private function uniqueSlug(string $base, ?int $ignoreId = null): string
    {
        $base = Str::slug($base);
        if ($base === '') $base = 'project';

        $slug = $base;
        $i = 2;
        while (
            Project::query()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }

    private function syncImages(Project $project, Request $request): void
    {
        $removeIds = $request->input('remove_image_ids', []);
        if (is_array($removeIds) && $removeIds !== []) {
            $project->images()->whereIn('id', $removeIds)->delete();
        }

        $files = $request->file('images', []);
        if (!is_array($files)) return;

        $nextSort = (int) ($project->images()->max('sort_order') ?? 0) + 10;

        foreach ($files as $file) {
            if (!$file) continue;
            $path = $file->store('projects', 'public');
            $project->images()->create([
                'path' => $path,
                'alt' => $project->title,
                'sort_order' => $nextSort,
            ]);
            $nextSort += 10;
        }
    }
}

