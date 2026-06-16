<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use App\Support\ImageUpload;
use Illuminate\Http\Request;

class GalleryItemController extends Controller
{
    public function index()
    {
        $items = GalleryItem::query()
            ->withCount('images')
            ->orderByDesc('is_published')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();

        return view('admin.gallery.index', compact('items'));
    }

    public function create()
    {
        return view('admin.gallery.create');
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        if (! $request->hasFile('images')) {
            return back()
                ->withInput()
                ->withErrors(['images' => 'Please upload at least one image.']);
        }

        $item = GalleryItem::create($data);
        $this->syncImages($item, $request);

        return redirect()->route('admin.gallery.edit', $item)->with('status', 'Gallery card created.');
    }

    public function edit(GalleryItem $gallery)
    {
        $gallery->load('images');

        return view('admin.gallery.edit', ['item' => $gallery]);
    }

    public function update(Request $request, GalleryItem $gallery)
    {
        $data = $this->validated($request);
        $gallery->fill($data)->save();
        $this->syncImages($gallery, $request);

        return back()->with('status', 'Gallery card updated.');
    }

    public function destroy(GalleryItem $gallery)
    {
        $gallery->delete();

        return redirect()->route('admin.gallery.index')->with('status', 'Gallery card deleted.');
    }

    private function validated(Request $request): array
    {
        ImageUpload::assertValidFiles($request);

        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:180'],
            'caption' => ['nullable', 'string', 'max:500'],
            'is_published' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'remove_image_ids' => ['nullable', 'array'],
            'remove_image_ids.*' => ['integer'],
            'images' => ['nullable', 'array'],
            'images.*' => ImageUpload::imageRules(),
        ]);

        $data['is_published'] = (bool) $request->boolean('is_published');
        $data['sort_order'] = (int) ($data['sort_order'] ?? 0);

        return $data;
    }

    private function syncImages(GalleryItem $item, Request $request): void
    {
        $removeIds = $request->input('remove_image_ids', []);
        if (is_array($removeIds) && $removeIds !== []) {
            $item->images()->whereIn('id', $removeIds)->get()->each->delete();
        }

        $files = $request->file('images', []);
        if (! is_array($files)) {
            return;
        }

        $nextSort = (int) ($item->images()->max('sort_order') ?? 0) + 10;

        foreach ($files as $file) {
            if (! $file) {
                continue;
            }

            $path = $file->store('gallery', 'public');
            $item->images()->create([
                'path' => $path,
                'alt' => $item->title,
                'sort_order' => $nextSort,
            ]);
            $nextSort += 10;
        }
    }
}
