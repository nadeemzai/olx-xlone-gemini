<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\Transaction;
use App\Services\PaymentGatewayService;
use Illuminate\Http\Request;

class MerchantDashboardController extends Controller
{
    protected PaymentGatewayService $paymentService;

    public function __construct(PaymentGatewayService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function index()
    {
        $user = auth()->user() ?? \App\Models\User::first();
        $listings = Listing::where('user_id', $user->id)->latest()->get();
        $transactions = Transaction::where('user_id', $user->id)->latest()->get();

        $metrics = [
            'active_count' => $listings->where('status', 'active')->count(),
            'pending_count' => $listings->where('status', 'pending')->count(),
            'total_impressions' => $listings->sum('views_count'),
            'total_inquiries' => $listings->sum('favorites_count'),
        ];

        return view('merchant.dashboard', compact('listings', 'transactions', 'metrics', 'user'));
    }

    public function promote(Request $request, Listing $listing)
    {
        $validated = $request->validate([
            'package' => 'required|in:featured_7d,featured_30d,bump_up',
            'gateway' => 'required|in:jazzcash,easypaisa,raast,card',
            'phone' => 'required|string',
        ]);

        $user = auth()->user() ?? \App\Models\User::first();

        $result = $this->paymentService->initiatePayment(
            $user,
            $listing,
            $validated['package'],
            $validated['gateway'],
            $validated['phone']
        );

        return response()->json($result);
    }
}
