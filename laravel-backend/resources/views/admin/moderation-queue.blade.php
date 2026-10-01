@extends('layouts.app')

@section('title', 'Admin Moderation Queue - Andaza Pakistan')

@section('content')
<div class="space-y-6">
    <div class="bg-[#002f34] text-white p-6 rounded-xl flex items-center justify-between">
        <div>
            <h1 class="text-xl font-bold">Admin Moderation & Trust Center</h1>
            <p class="text-xs text-slate-300 mt-1">Review pending listings, counterfeit reports, and verify merchant businesses.</p>
        </div>
        <div class="bg-amber-400 text-[#002f34] px-4 py-2 rounded-lg font-bold text-xs">
            Queue: {{ $listings->total() }} Listings
        </div>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="p-4 border-b border-slate-200 flex gap-4 text-xs font-bold">
            <a href="?status=pending" class="{{ $status === 'pending' ? 'text-teal-700 border-b-2 border-teal-700 pb-2' : 'text-slate-500' }}">Pending Queue</a>
            <a href="?status=active" class="{{ $status === 'active' ? 'text-teal-700 border-b-2 border-teal-700 pb-2' : 'text-slate-500' }}">Live Approved</a>
            <a href="?status=rejected" class="{{ $status === 'rejected' ? 'text-teal-700 border-b-2 border-teal-700 pb-2' : 'text-slate-500' }}">Rejected</a>
        </div>

        <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
                <tr>
                    <th class="p-3">Ad Title</th>
                    <th class="p-3">Seller</th>
                    <th class="p-3">Price (PKR)</th>
                    <th class="p-3">Location</th>
                    <th class="p-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse($listings as $item)
                    <tr>
                        <td class="p-3 font-semibold text-slate-900">{{ $item->title }}</td>
                        <td class="p-3 text-slate-600">{{ $item->seller->name ?? 'User' }}</td>
                        <td class="p-3 font-bold text-[#002f34]">Rs {{ number_format($item->price) }}</td>
                        <td class="p-3 text-slate-500">{{ $item->city }}</td>
                        <td class="p-3 text-right space-x-2">
                            @if($item->status === 'pending')
                                <form action="{{ route('admin.moderation.approve', $item->id) }}" method="POST" class="inline">
                                    @csrf
                                    <button type="submit" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold">Approve</button>
                                </form>
                                <form action="{{ route('admin.moderation.reject', $item->id) }}" method="POST" class="inline">
                                    @csrf
                                    <input type="hidden" name="reason" value="Violates marketplace policy">
                                    <button type="submit" class="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded font-bold">Reject</button>
                                </form>
                            @else
                                <span class="capitalize font-semibold text-slate-500">{{ $item->status }}</span>
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="p-6 text-center text-slate-500">No listings in this queue.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
