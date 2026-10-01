@extends('layouts.app')

@section('title', $listing->title . ' - Andaza Pakistan')

@section('content')
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <div class="lg:col-span-8 space-y-6">
        <div class="bg-black rounded-xl overflow-hidden aspect-[16/10] flex items-center justify-center">
            <img src="{{ $listing->primary_image_url }}" alt="{{ $listing->title }}" class="object-contain max-h-full">
        </div>

        <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h2 class="text-lg font-bold text-[#002f34] border-b border-slate-100 pb-3">Details & Specifications</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                    <span class="text-slate-400 block">Condition</span>
                    <span class="font-bold text-slate-800 capitalize">{{ $listing->condition }}</span>
                </div>
                <div>
                    <span class="text-slate-400 block">Location</span>
                    <span class="font-bold text-slate-800">{{ $listing->area }}, {{ $listing->city }}</span>
                </div>
                <div>
                    <span class="text-slate-400 block">Listed</span>
                    <span class="font-bold text-slate-800">{{ $listing->created_at ? $listing->created_at->diffForHumans() : 'Recently' }}</span>
                </div>
            </div>

            <div class="pt-4 border-t border-slate-100">
                <h3 class="text-md font-bold text-[#002f34] mb-2">Description</h3>
                <p class="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{{ $listing->description }}</p>
            </div>
        </div>
    </div>

    <div class="lg:col-span-4 space-y-6">
        <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h1 class="text-3xl font-extrabold text-[#002f34] tabular-nums mb-2">
                Rs {{ number_format($listing->price) }}
            </h1>
            <p class="text-sm font-semibold text-slate-800 mb-4">{{ $listing->title }}</p>
            <div class="text-xs text-slate-500 pt-3 border-t border-slate-100 flex justify-between">
                <span>{{ $listing->city }}</span>
                <span>{{ $listing->created_at ? $listing->created_at->format('d M Y') : 'Active' }}</span>
            </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                    {{ substr($listing->seller->name ?? 'User', 0, 1) }}
                </div>
                <div>
                    <h4 class="font-bold text-slate-900">{{ $listing->seller->name ?? 'Verified Seller' }}</h4>
                    <p class="text-xs text-slate-500">Member since {{ $listing->seller->created_at ? $listing->seller->created_at->format('M Y') : '2024' }}</p>
                </div>
            </div>
            <button class="w-full py-3 bg-[#002f34] text-white font-bold rounded-lg hover:bg-[#002226] text-xs">
                Chat with Seller
            </button>
        </div>
    </div>
</div>
@endsection
