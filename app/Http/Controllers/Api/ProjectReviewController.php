<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectReview;
use Illuminate\Http\Request;

class ProjectReviewController extends Controller
{
    public function store(Request $request, string $slug)
    {
        $project = Project::query()->where('slug', $slug)->firstOrFail();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:2000'],
        ]);

        $review = ProjectReview::create([
            'project_id' => $project->id,
            'name' => $data['name'],
            'rating' => $data['rating'],
            'comment' => $data['comment'],
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Review submitted. Thank you!',
            'review' => [
                'id' => $review->id,
                'name' => $review->name,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'createdAt' => $review->created_at?->toIso8601String(),
            ],
        ], 201);
    }
}
