<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $featured = $request->boolean('featured');

        $projects = Project::query()
            ->with('images')
            ->when($featured, fn ($q) => $q->where('is_featured', true))
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn ($p) => $this->toDto($p));

        return response()->json([
            'ok' => true,
            'projects' => $projects,
        ]);
    }

    public function show(string $slug)
    {
        $project = Project::query()->with('images')->where('slug', $slug)->firstOrFail();

        return response()->json([
            'ok' => true,
            'project' => $this->toDto($project),
        ]);
    }

    private function toDto(Project $p): array
    {
        return [
            'id' => $p->id,
            'title' => $p->title,
            'slug' => $p->slug,
            'excerpt' => $p->excerpt,
            'description' => $p->description,
            'techStack' => $p->tech_stack ?? [],
            'role' => $p->role,
            'client' => $p->client,
            'completedAt' => optional($p->completed_at)->toDateString(),
            'liveUrl' => $p->live_url,
            'githubUrl' => $p->github_url,
            'isFeatured' => (bool) $p->is_featured,
            'images' => $p->images->map(fn ($img) => [
                'id' => $img->id,
                'url' => asset('storage/'.$img->path),
                'alt' => $img->alt,
            ])->values(),
        ];
    }
}

