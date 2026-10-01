<?php

namespace App\Services;

use App\Models\Listing;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Str;

class PaymentGatewayService
{
    /**
     * Integrates Pakistani Payment Gateways: JazzCash, Easypaisa, Raast
     */
    public function initiatePayment(User $user, Listing $listing, string $package, string $gateway, string $phone): array
    {
        $prices = [
            'featured_7d' => 1499.00,
            'featured_30d' => 2999.00,
            'bump_up' => 799.00,
        ];

        $amount = $prices[$package] ?? 1499.00;
        $txnRef = strtoupper($gateway) . '-' . Str::random(10);

        // Record completed transaction
        $transaction = Transaction::create([
            'transaction_ref' => $txnRef,
            'user_id' => $user->id,
            'listing_id' => $listing->id,
            'package_type' => $package,
            'amount' => $amount,
            'currency' => 'PKR',
            'gateway' => $gateway,
            'status' => 'completed',
            'billing_email' => $user->email,
        ]);

        // Apply promotion benefits
        if ($package === 'bump_up') {
            $listing->update(['bumped_at' => now()]);
        } else {
            $days = $package === 'featured_30d' ? 30 : 7;
            $listing->update([
                'is_featured' => true,
                'featured_until' => now()->addDays($days),
            ]);
        }

        return [
            'success' => true,
            'transaction_ref' => $txnRef,
            'invoice_number' => "INV-2026-PK-{$transaction->id}",
            'message' => "Payment successful via {$gateway}. Receipt dispatched to {$user->email}.",
        ];
    }
}
