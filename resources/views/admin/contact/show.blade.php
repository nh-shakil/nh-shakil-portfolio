@extends('admin.layout')

@section('content')
    <div class="flex items-center justify-between">
        <div class="text-sm text-white/60">Message from {{ $message->name }}</div>
        <a href="{{ route('admin.contact-messages.index') }}" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            Back
        </a>
    </div>

    <div class="mt-6 rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
        <div class="text-sm text-white/60">Email</div>
        <div class="mt-1 text-white">{{ $message->email }}</div>

        <div class="mt-6 text-sm text-white/60">Received</div>
        <div class="mt-1 text-white/80">{{ $message->created_at->format('M j, Y g:i A') }}</div>

        <div class="mt-6 text-sm text-white/60">Message</div>
        <div class="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/80">{{ $message->message }}</div>
    </div>

    <form method="POST" action="{{ route('admin.contact-messages.destroy', $message) }}" class="mt-6" onsubmit="return confirm('Delete this message?')">
        @csrf
        @method('DELETE')
        <button type="submit" class="rounded-full border border-rose-300/20 bg-rose-300/10 px-4 py-2 text-sm text-rose-100 hover:bg-rose-300/15">
            Delete message
        </button>
    </form>
@endsection
