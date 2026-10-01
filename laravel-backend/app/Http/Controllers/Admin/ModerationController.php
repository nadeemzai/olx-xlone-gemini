<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\ModerationLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModerationController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status', 'pending');
        $listings = Listing::with(['seller', 'category', 'images'])
            ->where('status', $status)
            ->latest()
            ->paginate(20);

        return view('admin.moderation-queue', compact('listings', 'status'));
    }

    public function approve(Listing $listing)
    {
        DB::transaction(function () use ($listing) {
            $listing->update([
                'status' => 'active',
                'rejection_reason' => null,
                'bumped_at' => now(),
            ]);

            ModerationLog::create([
                'listing_id' => $listing->id,
                'moderator_id' => auth()->id() ?? 1,
                'action' => 'approved',
                'reason' => 'Compliant with community standards',
                'ip_address' => request()->ip(),
            ]);
        });

        return back()->with('success', "Listing #{$listing->id} approved and published live.");
    }

    public function reject(Request $request, Listing $listing)
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($listing, $validated) {
            $listing->update([
                'status' => 'rejected',
                'rejection_reason' => $validated['reason'],
            ]);

            ModerationLog::create([
                'listing_id' => $listing->id,
                'moderator_id' => auth()->id() ?? 1,
                'action' => 'rejected',
                'reason' => $validated['reason'],
                'ip_address' => request()->ip(),
            ]);
        });

        return back()->with('success', "Listing #{$listing->id} rejected.");
    }
}
