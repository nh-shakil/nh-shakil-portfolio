@extends('admin.layout')

@section('content')
    <div class="flex items-center justify-between">
        <div class="text-sm text-white/60">Edit timeline item</div>
        <form method="POST" action="{{ route('admin.timeline.destroy', $item) }}" onsubmit="return confirm('Delete this item?')">
            @csrf
            @method('DELETE')
            <button type="submit" class="rounded-full border border-rose-300/20 bg-rose-300/10 px-4 py-2 text-sm text-rose-100 hover:bg-rose-300/15">
                Delete
            </button>
        </form>
    </div>

    <form method="POST" action="{{ route('admin.timeline.update', $item) }}" class="mt-6">
        @csrf
        @method('PUT')
        @include('admin.timeline._form', ['item' => $item])
    </form>
@endsection

