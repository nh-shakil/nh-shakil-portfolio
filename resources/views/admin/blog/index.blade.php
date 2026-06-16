@extends('admin.layout')

@section('content')
    <div class="flex items-center justify-between">
        <div class="text-sm text-white/60">Blog posts</div>
        <a
            href="{{ route('admin.blog-posts.create') }}"
            class="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
        >
            Add post
        </a>
    </div>

    <div class="mt-6 overflow-hidden rounded-[var(--radius-2xl)] border border-white/10">
        <table class="w-full text-left text-sm">
            <thead class="bg-white/5 text-xs text-white/60">
                <tr>
                    <th class="px-4 py-3">Title</th>
                    <th class="px-4 py-3">Published</th>
                    <th class="px-4 py-3">Updated</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/10">
                @forelse ($posts as $p)
                    <tr class="hover:bg-white/5">
                        <td class="px-4 py-3">
                            <div class="font-medium text-white">{{ $p->title }}</div>
                            <div class="mt-1 text-xs text-white/50">/{{ $p->slug }}</div>
                        </td>
                        <td class="px-4 py-3 text-white/70">{{ $p->is_published ? 'Yes' : 'No' }}</td>
                        <td class="px-4 py-3 text-white/60">{{ $p->updated_at->diffForHumans() }}</td>
                        <td class="px-4 py-3">
                            <div class="flex justify-end gap-2">
                                <a
                                    href="{{ route('admin.blog-posts.edit', $p) }}"
                                    class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                                >
                                    Edit
                                </a>
                                <form method="POST" action="{{ route('admin.blog-posts.destroy', $p) }}" onsubmit="return confirm('Delete this post?')">
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
                            No posts yet. Click “Add post”.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection

