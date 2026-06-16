@extends('admin.layout')

@section('content')
    <div class="text-sm text-white/60">Add gallery card</div>

    <form method="POST" action="{{ route('admin.gallery.store') }}" enctype="multipart/form-data" class="mt-6">
        @csrf
        @include('admin.gallery._form')
    </form>
@endsection
