@php
    $isEdit = isset($project);
@endphp

<div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
    <div class="lg:col-span-8">
        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="sm:col-span-2">
                    <label class="text-xs font-medium text-white/60">Title</label>
                    <input name="title" value="{{ old('title', $project->title ?? '') }}" required
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                    @error('title')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                </div>

                <div class="sm:col-span-2">
                    <label class="text-xs font-medium text-white/60">Slug (optional)</label>
                    <input name="slug" value="{{ old('slug', $project->slug ?? '') }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                    @error('slug')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                </div>

                <div class="sm:col-span-2">
                    <label class="text-xs font-medium text-white/60">Excerpt (short summary)</label>
                    <textarea name="excerpt" rows="3"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30">{{ old('excerpt', $project->excerpt ?? '') }}</textarea>
                    @error('excerpt')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                </div>

                <div class="sm:col-span-2">
                    <label class="text-xs font-medium text-white/60">Description</label>
                    <textarea name="description" rows="8"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30">{{ old('description', $project->description ?? '') }}</textarea>
                    @error('description')<div class="mt-1 text-xs text-rose-200">{{ $message }}</div>@enderror
                </div>
            </div>
        </div>

        <div class="mt-6 rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold">Images (multiple)</div>
            <div class="mt-1 text-xs text-white/60">Upload multiple images. If a project has multiple images, the website will show a slider.</div>

            <input type="file" name="images[]" multiple accept="image/*"
                class="mt-4 block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-white/90" />
            @error('images')<div class="mt-2 text-xs text-rose-200">{{ $message }}</div>@enderror
            @error('images.*')<div class="mt-2 text-xs text-rose-200">{{ $message }}</div>@enderror

            @if ($isEdit && $project->images->count())
                <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    @foreach ($project->images as $img)
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
        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold">Metadata</div>

            <div class="mt-4 space-y-4">
                <div>
                    <label class="text-xs font-medium text-white/60">Tech stack (comma separated)</label>
                    <input name="tech_stack" value="{{ old('tech_stack', isset($project) && is_array($project->tech_stack) ? implode(', ', $project->tech_stack) : '') }}"
                        placeholder="Laravel, Flutter, REST API"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                </div>
                <div>
                    <label class="text-xs font-medium text-white/60">Role</label>
                    <input name="role" value="{{ old('role', $project->role ?? '') }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                </div>
                <div>
                    <label class="text-xs font-medium text-white/60">Client</label>
                    <input name="client" value="{{ old('client', $project->client ?? '') }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                </div>
                <div>
                    <label class="text-xs font-medium text-white/60">Completed date</label>
                    <input type="date" name="completed_at" value="{{ old('completed_at', isset($project->completed_at) ? $project->completed_at->format('Y-m-d') : '') }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                </div>
                <div>
                    <label class="text-xs font-medium text-white/60">Live demo URL</label>
                    <input name="live_url" value="{{ old('live_url', $project->live_url ?? '') }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                </div>
                <div>
                    <label class="text-xs font-medium text-white/60">GitHub URL</label>
                    <input name="github_url" value="{{ old('github_url', $project->github_url ?? '') }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                    <div>
                        <div class="text-sm font-medium text-white/85">Featured</div>
                        <div class="text-xs text-white/55">Show on homepage “Featured Projects”</div>
                    </div>
                    <input type="checkbox" name="is_featured" value="1" {{ old('is_featured', $project->is_featured ?? false) ? 'checked' : '' }} />
                </div>
                <div>
                    <label class="text-xs font-medium text-white/60">Sort order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $project->sort_order ?? 0) }}"
                        class="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30" />
                </div>
            </div>
        </div>
    </div>
</div>

