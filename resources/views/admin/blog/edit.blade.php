@extends('admin.layout')

@section('content')
    <div class="flex items-center justify-between">
        <div>
            <div class="text-sm text-white/60">Edit blog post</div>
            <div class="mt-1 text-xs text-white/50">Update content, cover image, and publishing status.</div>
        </div>
        <a href="{{ route('admin.blog-posts.index') }}" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">Back</a>
    </div>

    <form method="POST" action="{{ route('admin.blog-posts.update', $post) }}" enctype="multipart/form-data" class="mt-6">
        @csrf
        @method('PUT')
        @include('admin.blog._form', ['post' => $post])

        <div class="mt-6 flex justify-end gap-3">
            <button type="submit" class="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90">
                Update
            </button>
        </div>
    </form>
@endsection

