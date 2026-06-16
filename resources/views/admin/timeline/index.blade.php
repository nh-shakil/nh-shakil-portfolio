@extends('admin.layout')

@section('content')
    <div class="flex items-center justify-between">
        <div class="text-sm text-white/60">Timeline (Job Experience + Education)</div>
        <a
            href="{{ route('admin.timeline.create') }}"
            class="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
        >
            Add item
        </a>
    </div>

    <div class="mt-6 overflow-hidden rounded-[var(--radius-2xl)] border border-white/10">
        <table class="w-full text-left text-sm">
            <thead class="bg-white/5 text-xs text-white/60">
                <tr>
                    <th class="px-4 py-3">Title</th>
                    <th class="px-4 py-3">Type</th>
                    <th class="px-4 py-3">Published</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/10">
                @forelse ($items as $it)
                    <tr class="hover:bg-white/5">
                        <td class="px-4 py-3">
                            <div class="font-medium text-white">{{ $it->title }}</div>
                            <div class="mt-1 text-xs text-white/50">{{ $it->org }} @if($it->period) — {{ $it->period }} @endif</div>
                        </td>
                        <td class="px-4 py-3 text-white/70">{{ ucfirst($it->type) }}</td>
                        <td class="px-4 py-3 text-white/70">{{ $it->is_published ? 'Yes' : 'No' }}</td>
                        <td class="px-4 py-3">
                            <div class="flex justify-end gap-2">
                                <a
                                    href="{{ route('admin.timeline.edit', $it) }}"
                                    class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                                >
                                    Edit
                                </a>
                                <form method="POST" action="{{ route('admin.timeline.destroy', $it) }}" onsubmit="return confirm('Delete this item?')">
                                    @csrf
                                    @method('DELETE')
                                    <button
                                        type="submit"
                                        class="rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1.5 text-xs text-rose-100 hover:bg-rose-300/15"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" class="px-4 py-10 text-center text-white/60">
                            No timeline items yet. Click “Add item”.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection

