@extends('admin.layout')

@section('content')
    <div class="text-sm text-white/60">Create timeline item</div>

    <form method="POST" action="{{ route('admin.timeline.store') }}" class="mt-6">
        @csrf
        @include('admin.timeline._form')
    </form>
@endsection

