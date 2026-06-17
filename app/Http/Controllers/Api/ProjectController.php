<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\SiteSettingsService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $featured = $request->boolean('featured');

        $projects = Project::query()
            ->with('images')
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
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
        $project = Project::query()
            ->with(['images', 'reviews'])
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'ok' => true,
            'project' => $this->toDto($project, includeReviews: true),
        ]);
    }

    private function toDto(Project $p, bool $includeReviews = false): array
    {
        $dto = [
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
            'reviewCount' => (int) ($p->reviews_count ?? $p->reviews?->count() ?? 0),
            'averageRating' => $this->averageRating($p),
            'images' => $p->images->map(fn ($img) => [
                'id' => $img->id,
                'url' => SiteSettingsService::publicUrl($img->path),
                'alt' => $img->alt,
            ])->values(),
        ];

        if ($includeReviews) {
            $dto['reviews'] = $p->reviews->map(fn ($review) => [
                'id' => $review->id,
                'name' => $review->name,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'createdAt' => $review->created_at?->toIso8601String(),
            ])->values();
        }

        return $dto;
    }

    private function averageRating(Project $p): ?float
    {
        if ($p->reviews_avg_rating !== null) {
            return round((float) $p->reviews_avg_rating, 1);
        }

        if ($p->relationLoaded('reviews') && $p->reviews->isNotEmpty()) {
            return round((float) $p->reviews->avg('rating'), 1);
        }

        return null;
    }
}
