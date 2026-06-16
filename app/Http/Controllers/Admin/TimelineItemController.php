<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TimelineItem;
use Illuminate\Http\Request;

class TimelineItemController extends Controller
{
    public function index()
    {
        $items = TimelineItem::query()
            ->orderByDesc('is_published')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();

        return view('admin.timeline.index', compact('items'));
    }

    public function create()
    {
        return view('admin.timeline.create');
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $item = TimelineItem::create($data);

        return redirect()->route('admin.timeline.edit', $item)->with('status', 'Timeline item created.');
    }

    public function edit(TimelineItem $timeline)
    {
        return view('admin.timeline.edit', ['item' => $timeline]);
    }

    public function update(Request $request, TimelineItem $timeline)
    {
        $data = $this->validated($request);
        $timeline->fill($data)->save();

        return back()->with('status', 'Timeline item updated.');
    }

    public function destroy(TimelineItem $timeline)
    {
        $timeline->delete();

        return redirect()->route('admin.timeline.index')->with('status', 'Timeline item deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'type' => ['required', 'in:experience,education'],
            'title' => ['required', 'string', 'max:180'],
            'org' => ['nullable', 'string', 'max:180'],
            'employment_type' => ['nullable', 'string', 'max:40'],
            'period' => ['nullable', 'string', 'max:80'],
            'location' => ['nullable', 'string', 'max:180'],
            'desc' => ['nullable', 'string'],
            'skills' => ['nullable', 'string', 'max:500'],
            'is_published' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:100000'],
        ]);

        $data['is_published'] = (bool) $request->boolean('is_published');
        $data['sort_order'] = (int) ($data['sort_order'] ?? 0);

        return $data;
    }
}

