@php
    $isEdit = isset($item);
    $inputClass = 'mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30';
@endphp

<div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
    <div class="lg:col-span-8 space-y-6">
        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6 space-y-4">
            <label class="block">
                <div class="text-xs font-medium tracking-wide text-white/60">Title</div>
                <input name="title" value="{{ old('title', $isEdit ? $item->title : '') }}" class="{{ $inputClass }}" />
            </label>

            <label class="block">
                <div class="text-xs font-medium tracking-wide text-white/60">Caption</div>
                <textarea name="caption" rows="3" class="{{ $inputClass }}">{{ old('caption', $isEdit ? $item->caption : '') }}</textarea>
            </label>
        </div>

        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold">Images (multiple)</div>
            <div class="mt-1 text-xs text-white/60">Upload one or more images (JPG, PNG, WebP — max 10MB each). Multiple images will auto-slide on the card.</div>

            <input type="file" name="images[]" multiple accept="image/*"
                class="mt-4 block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black" />
            @error('images')<div class="mt-2 text-xs text-rose-200">{{ $message }}</div>@enderror
            @foreach ($errors->getMessages() as $field => $messages)
                @if (str_starts_with($field, 'images.'))
                    @foreach ($messages as $message)
                        <div class="mt-2 text-xs text-rose-200">{{ $message }}</div>
                    @endforeach
                @endif
            @endforeach

            @if ($isEdit && $item->images->count())
                <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    @foreach ($item->images as $img)
                        <label class="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                            <img src="{{ asset('storage/'.$img->path) }}" alt="{{ $img->alt }}" class="h-32 w-full object-cover" />
                            <div class="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-xs text-white/80">
                                <input type="checkbox" name="remove_image_ids[]" value="{{ $img->id }}" class="mr-2">
                                remove
                            </div>
                        </label>
                    @endforeach
                </div>
            @endif
        </div>
    </div>

    <div class="lg:col-span-4">
        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6 space-y-4">
            <label class="block">
                <div class="text-xs font-medium tracking-wide text-white/60">Sort order</div>
                <input name="sort_order" value="{{ old('sort_order', $isEdit ? $item->sort_order : 0) }}" class="{{ $inputClass }}" />
            </label>

            <label class="inline-flex items-center gap-2 text-sm text-white/75">
                <input type="checkbox" name="is_published" value="1" class="rounded border-white/20 bg-black/30" @checked(old('is_published', $isEdit ? $item->is_published : true)) />
                Published
            </label>
        </div>
    </div>
</div>

<div class="mt-6 flex justify-end gap-2">
    <a href="{{ route('admin.gallery.index') }}" class="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10">
        Back
    </a>
    <button type="submit" class="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90">
        Save
    </button>
</div>
