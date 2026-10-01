@extends('layouts.app')

@section('title', 'Company Dashboard - Andaza Pakistan')

@section('content')
<div class="space-y-6">
    <div class="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between shadow-xs">
        <div>
            <h1 class="text-xl font-bold text-slate-900">{{ $user->merchantProfile->company_name ?? $user->name }}</h1>
            <p class="text-xs text-slate-500">NTN: {{ $user->merchantProfile->ntn_number ?? 'Verified' }} · Member since {{ $user->created_at ? $user->created_at->format('M Y') : '2024' }}</p>
        </div>
        <a href="{{ route('listings.create') }}" class="px-5 py-2.5 bg-[#002f34] text-white font-bold text-xs rounded-lg hover:bg-[#002226]">
            + Post New Ad
        </a>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl border border-slate-200">
            <span class="text-xs text-slate-500">Active Listings</span>
            <p class="text-2xl font-extrabold text-[#002f34]">{{ $metrics['active_count'] }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200">
            <span class="text-xs text-slate-500">Ad Impressions</span>
            <p class="text-2xl font-extrabold text-[#002f34]">{{ number_format($metrics['total_impressions']) }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200">
            <span class="text-xs text-slate-500">Customer Leads</span>
            <p class="text-2xl font-extrabold text-[#002f34]">{{ $metrics['total_inquiries'] }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200">
            <span class="text-xs text-slate-500">Under Review</span>
            <p class="text-2xl font-extrabold text-amber-600">{{ $metrics['pending_count'] }}</p>
        </div>
    </div>
</div>
@endsection
