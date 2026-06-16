@php
    $isEdit = isset($item);
    $inputClass = 'mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30';
@endphp

<div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6 space-y-4">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label class="block">
            <div class="text-xs font-medium tracking-wide text-white/60">Type</div>
            <select name="type" class="{{ $inputClass }}">
                @php $type = old('type', $isEdit ? $item->type : 'experience'); @endphp
                <option value="experience" @selected($type === 'experience')>Experience</option>
                <option value="education" @selected($type === 'education')>Education</option>
            </select>
        </label>

        <label class="block">
            <div class="text-xs font-medium tracking-wide text-white/60">Sort order</div>
            <input name="sort_order" value="{{ old('sort_order', $isEdit ? $item->sort_order : 0) }}" class="{{ $inputClass }}" />
        </label>

        <label class="block sm:col-span-2">
            <div class="text-xs font-medium tracking-wide text-white/60">Title</div>
            <input name="title" value="{{ old('title', $isEdit ? $item->title : '') }}" class="{{ $inputClass }}" />
        </label>

        <label class="block">
            <div class="text-xs font-medium tracking-wide text-white/60">Organization</div>
            <input name="org" value="{{ old('org', $isEdit ? $item->org : '') }}" class="{{ $inputClass }}" />
        </label>

        <label class="block">
            <div class="text-xs font-medium tracking-wide text-white/60">Employment type</div>
            <input name="employment_type" value="{{ old('employment_type', $isEdit ? $item->employment_type : '') }}" placeholder="Full-time, Part-time" class="{{ $inputClass }}" />
        </label>

        <label class="block">
            <div class="text-xs font-medium tracking-wide text-white/60">Period</div>
            <input name="period" value="{{ old('period', $isEdit ? $item->period : '') }}" placeholder="Jul 2025 — Present · 1 yr" class="{{ $inputClass }}" />
        </label>

        <label class="block sm:col-span-2">
            <div class="text-xs font-medium tracking-wide text-white/60">Location</div>
            <input name="location" value="{{ old('location', $isEdit ? $item->location : '') }}" placeholder="Australia · Remote" class="{{ $inputClass }}" />
        </label>

        <label class="block sm:col-span-2">
            <div class="text-xs font-medium tracking-wide text-white/60">Description</div>
            <textarea name="desc" rows="4" class="{{ $inputClass }}">{{ old('desc', $isEdit ? $item->desc : '') }}</textarea>
        </label>

        <label class="block sm:col-span-2">
            <div class="text-xs font-medium tracking-wide text-white/60">Skills (comma separated)</div>
            <input name="skills" value="{{ old('skills', $isEdit ? $item->skills : '') }}" placeholder="Laravel, REST API, Server Side Programming" class="{{ $inputClass }}" />
        </label>

        <label class="inline-flex items-center gap-2 text-sm text-white/75">
            <input type="checkbox" name="is_published" value="1" class="rounded border-white/20 bg-black/30" @checked(old('is_published', $isEdit ? $item->is_published : true)) />
            Published
        </label>
    </div>
</div>

<div class="mt-6 flex justify-end gap-2">
    <a href="{{ route('admin.timeline.index') }}" class="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10">
        Back
    </a>
    <button type="submit" class="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90">
        Save
    </button>
</div>

