@extends('layouts.app')

@section('title', 'Post an Ad - Andaza Pakistan')

@section('content')
<div class="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
    <h1 class="text-lg font-bold text-[#002f34] mb-6 border-b border-slate-100 pb-3">POST YOUR AD</h1>

    <form action="{{ route('listings.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
        @csrf
        <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Ad Title</label>
            <input type="text" name="title" required placeholder="e.g. Honda Civic RS Turbo 2023 or iPhone 15 Pro Max" class="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg">
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select name="category_id" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white">
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}">{{ $category->name_en }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Price (PKR)</label>
                <input type="number" name="price" required placeholder="Rs" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold">
            </div>
        </div>

        <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Condition</label>
            <select name="condition" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white">
                <option value="Used">Used</option>
                <option value="New">New</option>
                <option value="Refurbished">Refurbished</option>
            </select>
        </div>

        <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Description</label>
            <textarea name="description" rows="5" required placeholder="Mention features, warranty, PTA status, or condition..." class="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input type="text" name="city" required placeholder="e.g. Lahore, Karachi, Islamabad" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Area / Locality</label>
                <input type="text" name="area" required placeholder="e.g. DHA Phase 5, Gulberg, Clifton" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg">
            </div>
        </div>

        <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Upload Photos</label>
            <input type="file" name="images[]" multiple accept="image/*" class="w-full text-xs text-slate-500">
        </div>

        <div class="pt-4 border-t border-slate-100 flex justify-end">
            <button type="submit" class="px-8 py-3 bg-[#002f34] text-white font-bold text-xs rounded-lg hover:bg-[#002226]">
                Post Ad Now
            </button>
        </div>
    </form>
</div>
@endsection
