@extends('admin.layout')

@section('content')
    <div class="flex items-center justify-between">
        <div class="text-sm text-white/60">Edit gallery card</div>
        <form method="POST" action="{{ route('admin.gallery.destroy', $item) }}" onsubmit="return confirm('Delete this card?')">
            @csrf
            @method('DELETE')
            <button type="submit" class="rounded-full border border-rose-300/20 bg-rose-300/10 px-4 py-2 text-sm text-rose-100 hover:bg-rose-300/15">
                Delete
            </button>
        </form>
    </div>

    <form method="POST" action="{{ route('admin.gallery.update', $item) }}" enctype="multipart/form-data" class="mt-6">
        @csrf
        @method('PUT')
        @include('admin.gallery._form', ['item' => $item])
    </form>
@endsection
