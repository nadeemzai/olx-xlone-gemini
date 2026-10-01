@extends('layouts.app')

@section('title', 'Andaza Pakistan - #1 Classifieds Marketplace')

@section('content')
<div class="space-y-8">
    <!-- Hero Banner -->
    <div class="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#002f34] via-[#00474e] to-[#002f34] text-white p-6 sm:p-8 shadow-sm">
        <div class="max-w-2xl space-y-3">
            <span class="text-xs font-bold uppercase tracking-widest text-[#23e5db]">Pakistan's #1 Marketplace</span>
            <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Buy & Sell Vehicles, Real Estate & Electronics in Pakistan
            </h1>
            <p class="text-xs sm:text-sm text-slate-200">
                Connect directly with verified buyers and sellers in Karachi, Lahore, Islamabad, and across Pakistan.
            </p>
            <div class="flex items-center gap-3 pt-2">
                <a href="{{ route('listings.create') }}" class="px-6 py-2.5 bg-[#ffce32] hover:bg-amber-400 text-[#002f34] font-extrabold text-xs sm:text-sm rounded-lg transition-colors">
                    Post an Ad (Sell Free)
                </a>
            </div>
        </div>
    </div>

    <!-- Listings Grid -->
    <div class="space-y-4">
        <h2 class="text-sm font-bold text-[#002f34] uppercase tracking-wider">Fresh Recommendations</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            @forelse($listings as $listing)
                <div class="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    <a href="{{ route('listings.show', $listing->slug) }}">
                        <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                            <img src="{{ $listing->primary_image_url }}" class="w-full h-full object-cover">
                            @if($listing->is_featured)
                                <span class="absolute top-2 left-2 bg-[#ffce32] text-[#002f34] text-[9px] font-black px-1.5 py-0.5 rounded">
                                    FEATURED
                                </span>
                            @endif
                        </div>
                        <div class="p-3">
                            <span class="text-lg font-extrabold text-[#002f34] tabular-nums block">
                                Rs {{ number_format($listing->price) }}
                            </span>
                            <h3 class="text-xs font-semibold text-slate-800 line-clamp-2 my-1">{{ $listing->title }}</h3>
                            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                                <span>{{ $listing->area }}, {{ $listing->city }}</span>
                                <span>{{ $listing->created_at ? $listing->created_at->diffForHumans() : 'Recently' }}</span>
                            </div>
                        </div>
                    </a>
                </div>
            @empty
                <div class="col-span-full py-12 text-center text-slate-500">
                    <p>No active listings found matching your search.</p>
                </div>
            @endforelse
        </div>
        <div class="pt-4">
            {{ $listings->links() }}
        </div>
    </div>
</div>
@endsection
