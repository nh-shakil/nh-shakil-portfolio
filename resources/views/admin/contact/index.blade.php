@extends('admin.layout')

@section('content')
    <div class="text-sm text-white/60">Contact messages</div>

    <div class="mt-6 overflow-hidden rounded-[var(--radius-2xl)] border border-white/10">
        <table class="w-full text-left text-sm">
            <thead class="bg-white/5 text-xs text-white/60">
                <tr>
                    <th class="px-4 py-3">From</th>
                    <th class="px-4 py-3">Message</th>
                    <th class="px-4 py-3">Received</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/10">
                @forelse ($messages as $msg)
                    <tr class="hover:bg-white/5 {{ $msg->read_at ? '' : 'bg-white/[0.03]' }}">
                        <td class="px-4 py-3">
                            <div class="font-medium text-white">{{ $msg->name }}</div>
                            <div class="mt-1 text-xs text-white/50">{{ $msg->email }}</div>
                        </td>
                        <td class="px-4 py-3 text-white/70">
                            <div class="line-clamp-2 max-w-xl">{{ $msg->message }}</div>
                        </td>
                        <td class="px-4 py-3 text-white/60">{{ $msg->created_at->diffForHumans() }}</td>
                        <td class="px-4 py-3">
                            <div class="flex justify-end gap-2">
                                <a
                                    href="{{ route('admin.contact-messages.show', $msg) }}"
                                    class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                                >
                                    View
                                </a>
                                <form method="POST" action="{{ route('admin.contact-messages.destroy', $msg) }}" onsubmit="return confirm('Delete this message?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1.5 text-xs text-rose-100 hover:bg-rose-300/15">
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" class="px-4 py-10 text-center text-white/60">No messages yet.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if ($messages->hasPages())
        <div class="mt-4">{{ $messages->links() }}</div>
    @endif
@endsection
