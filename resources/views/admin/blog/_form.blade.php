@php
    $isEdit = isset($post);
@endphp

<div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
    <div class="lg:col-span-8">
        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="sm:col-span-2">
                    <label class="text-xs font-medium text-white/60">Title</label>
                    <input name="title" value="{{ old('title', $post->title ?? '') }}" required
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                    @error('title')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                </div>

                <div class="sm:col-span-2">
                    <label class="text-xs font-medium text-white/60">Slug (optional)</label>
                    <input name="slug" value="{{ old('slug', $post->slug ?? '') }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                    @error('slug')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                </div>

                <div class="sm:col-span-2">
                    <label class="text-xs font-medium text-white/60">Excerpt</label>
                    <textarea name="excerpt" rows="3"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30">{{ old('excerpt', $post->excerpt ?? '') }}</textarea>
                    @error('excerpt')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                </div>

                <div class="sm:col-span-2">
                    <label class="text-xs font-medium text-white/60">Content</label>
                    <textarea name="content" rows="10"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30">{{ old('content', $post->content ?? '') }}</textarea>
                    @error('content')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                </div>
            </div>
        </div>
    </div>

    <div class="lg:col-span-4">
        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold">Publishing</div>

            <div class="mt-4 space-y-4">
                <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                    <div>
                        <div class="text-sm font-medium text-white/85">Published</div>
                        <div class="text-xs text-white/55">Show publicly on blog</div>
                    </div>
                    <input type="checkbox" name="is_published" value="1" {{ old('is_published', $post->is_published ?? false) ? 'checked' : '' }} />
                </div>

                <div>
                    <label class="text-xs font-medium text-white/60">Published at</label>
                    <input type="date" name="published_at" value="{{ old('published_at', isset($post->published_at) ? $post->published_at->format('Y-m-d') : '') }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                </div>

                <div>
                    <label class="text-xs font-medium text-white/60">Sort order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $post->sort_order ?? 0) }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                </div>

                <div>
                    <label class="text-xs font-medium text-white/60">Cover image</label>
                    <input type="file" name="cover" accept="image/*"
                        class="mt-2 block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-white/90" />
                    @error('cover')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror

                    @if ($isEdit && $post->cover_image)
                        <div class="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                            <img src="{{ asset('storage/'.$post->cover_image) }}" alt="Cover" class="h-36 w-full object-cover" />
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>

