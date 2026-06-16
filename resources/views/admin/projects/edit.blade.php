@extends('admin.layout')

@section('content')
    <div class="flex items-center justify-between">
        <div>
            <div class="text-sm text-white/60">Edit project</div>
            <div class="mt-1 text-xs text-white/50">Update details and manage images.</div>
        </div>
        <a href="{{ route('admin.projects.index') }}" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">Back</a>
    </div>

    <form method="POST" action="{{ route('admin.projects.update', $project) }}" enctype="multipart/form-data" class="mt-6">
        @csrf
        @method('PUT')
        @include('admin.projects._form', ['project' => $project])

        <div class="mt-6 flex justify-end gap-3">
            <button type="submit" class="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90">
                Update
            </button>
        </div>
    </form>
@endsection

