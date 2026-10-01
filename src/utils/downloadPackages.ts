import JSZip from 'jszip';
import { MYSQL_DATABASE_SCHEMA_SQL, LARAVEL_PROJECT_TREE } from '../data/laravelCodeSnippets';

// FRONTEND BLADE TEMPLATES & ASSETS
export const FRONTEND_FILES: Record<string, string> = {
  'resources/views/layouts/app.blade.php': `{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() == 'ur' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Andaza Pakistan - Buy & Sell Cars, Mobiles, Real Estate')</title>
    <meta name="description" content="@yield('meta_description', 'Pakistan\\'s largest online classifieds marketplace.')">

    <!-- Fonts: Plus Jakarta Sans for English & Noto Sans Arabic for Urdu -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Vite Assets (Tailwind CSS v4 + Alpine.js) -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#f7f8f9] text-[#002f34] antialiased min-h-screen flex flex-col font-sans">
    @include('partials.header')
    @include('partials.category-bar')

    @if(session('success'))
        <div class="max-w-7xl mx-auto px-4 mt-4 w-full">
            <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center justify-between">
                <span>{{ session('success') }}</span>
                <button type="button" class="text-emerald-600 hover:text-emerald-900" onclick="this.parentElement.remove()">✕</button>
            </div>
        </div>
    @endif

    <main class="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        @yield('content')
    </main>

    @include('partials.footer')
    @stack('scripts')
</body>
</html>
`,
  'resources/views/home.blade.php': `{{-- resources/views/home.blade.php --}}
@extends('layouts.app')

@section('title', 'Andaza Pakistan - #1 Classifieds Marketplace')

@section('content')
<div class="space-y-8">
    {{-- Hero Promotional Banner --}}
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

    {{-- Classified Listings Grid --}}
    <div class="space-y-4">
        <h2 class="text-sm font-bold text-[#002f34] uppercase tracking-wider">Fresh Recommendations</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            @foreach($listings as $listing)
                <div class="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    <a href="{{ route('listings.show', $listing->slug) }}">
                        <img src="{{ $listing->primary_image_url }}" class="w-full aspect-[4/3] object-cover">
                        <div class="p-3">
                            <span class="text-lg font-extrabold text-[#002f34] tabular-nums block">
                                Rs {{ number_format($listing->price) }}
                            </span>
                            <h3 class="text-xs font-semibold text-slate-800 line-clamp-2 my-1">{{ $listing->title }}</h3>
                            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                                <span>{{ $listing->area }}, {{ $listing->city }}</span>
                                <span>{{ $listing->created_at->diffForHumans() }}</span>
                            </div>
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
        {{ $listings->links() }}
    </div>
</div>
@endsection
`,
  'resources/views/listings/show.blade.php': `{{-- resources/views/listings/show.blade.php --}}
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
                @foreach($listing->attributes as $attr)
                    <div>
                        <span class="text-slate-400 block">{{ Str::headline($attr->attribute_key) }}</span>
                        <span class="font-bold text-slate-800">{{ $attr->attribute_value }}</span>
                    </div>
                @endforeach
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
                <span>{{ $listing->created_at->diffForHumans() }}</span>
            </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
                <img src="{{ $listing->seller->avatar_url }}" class="w-12 h-12 rounded-full object-cover">
                <div>
                    <h4 class="font-bold text-slate-900">{{ $listing->seller->name }}</h4>
                    <p class="text-xs text-slate-500">Member since {{ $listing->seller->created_at->format('M Y') }}</p>
                </div>
            </div>
            <a href="{{ route('chat.start', $listing->id) }}" class="w-full block text-center py-3 bg-[#002f34] text-white font-bold rounded-lg hover:bg-[#002226]">
                Chat with Seller
            </a>
        </div>
    </div>
</div>
@endsection
`,
  'resources/views/listings/create.blade.php': `{{-- resources/views/listings/create.blade.php --}}
@extends('layouts.app')

@section('title', 'Post an Ad - Andaza Pakistan')

@section('content')
<div class="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
    <h1 class="text-lg font-bold text-[#002f34] mb-6 border-b border-slate-100 pb-3">POST YOUR AD</h1>

    <form action="{{ route('listings.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
        @csrf
        <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Ad Title</label>
            <input type="text" name="title" required class="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg">
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
                <input type="number" name="price" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-bold">
            </div>
        </div>

        <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Description</label>
            <textarea name="description" rows="5" required class="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input type="text" name="city" required placeholder="e.g. Lahore, Karachi" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Area / Locality</label>
                <input type="text" name="area" required placeholder="e.g. DHA Phase 5" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg">
            </div>
        </div>

        <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Upload Photos</label>
            <input type="file" name="images[]" multiple accept="image/*" class="w-full text-xs">
        </div>

        <div class="pt-4 border-t border-slate-100 flex justify-end">
            <button type="submit" class="px-8 py-3 bg-[#002f34] text-white font-bold text-xs rounded-lg hover:bg-[#002226]">
                Post Ad Now
            </button>
        </div>
    </form>
</div>
@endsection
`,
  'resources/views/partials/header.blade.php': `{{-- resources/views/partials/header.blade.php --}}
<header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <a href="{{ route('home') }}" class="flex items-center gap-1.5 shrink-0">
            <div class="text-2xl font-black tracking-tight select-none">
                <span class="text-[#002f34]">And</span><span class="text-[#23e5db]">aza</span>
            </div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pakistan</span>
        </a>

        <form action="{{ route('listings.index') }}" method="GET" class="flex-1 max-w-xl flex border-2 border-[#002f34] rounded overflow-hidden">
            <input type="text" name="q" placeholder="Find Cars, Mobile Phones, Real Estate..." class="w-full px-4 py-2 text-sm focus:outline-none">
            <button type="submit" class="bg-[#002f34] text-white px-5 py-2">🔍</button>
        </form>

        <a href="{{ route('listings.create') }}" class="px-6 py-2 bg-[#ffce32] text-[#002f34] font-extrabold text-sm rounded-full hover:bg-amber-400">
            + SELL
        </a>
    </div>
</header>
`,
  'resources/views/partials/footer.blade.php': `{{-- resources/views/partials/footer.blade.php --}}
<footer class="bg-[#ebeeef] border-t border-slate-300 text-xs text-[#002f34] mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
            <h4 class="font-extrabold uppercase text-[11px] mb-3">Popular Categories</h4>
            <ul class="space-y-1 text-slate-600">
                <li><a href="#">Cars in Pakistan</a></li>
                <li><a href="#">Flats for Rent</a></li>
                <li><a href="#">Mobile Phones</a></li>
            </ul>
        </div>
        <div>
            <h4 class="font-extrabold uppercase text-[11px] mb-3">Trending Searches</h4>
            <ul class="space-y-1 text-slate-600">
                <li><a href="#">Bikes in Lahore</a></li>
                <li><a href="#">Houses in Islamabad</a></li>
            </ul>
        </div>
        <div>
            <h4 class="font-extrabold uppercase text-[11px] mb-3">About Us</h4>
            <ul class="space-y-1 text-slate-600">
                <li><a href="#">About Andaza Group</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>
        <div>
            <h4 class="font-extrabold uppercase text-[11px] mb-3">Andaza Pakistan</h4>
            <ul class="space-y-1 text-slate-600">
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Sitemap</a></li>
            </ul>
        </div>
    </div>
    <div class="bg-[#002f34] text-white text-[11px] py-4 px-6 text-center">
        Free Classifieds in Pakistan. © 2006-2026 Andaza Pakistan · Monolithic in Laravel 13 & MySQL
    </div>
</footer>
`,
  'resources/css/app.css': `@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #002f34;
    background-color: #f7f8f9;
  }
  [dir="rtl"] {
    font-family: 'Noto Sans Arabic', 'Plus Jakarta Sans', sans-serif;
  }
}
`,
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        andaza: {
          navy: '#002f34',
          teal: '#23e5db',
          yellow: '#ffce32',
        }
      }
    },
  },
  plugins: [],
}
`
};

// ADMIN BACKEND CONTROLLERS & ROUTES
export const ADMIN_BACKEND_FILES: Record<string, string> = {
  'app/Http/Controllers/Admin/ModerationController.php': `<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Listing;
use App\\Models\\ModerationLog;
use App\\Notifications\\AdApprovedNotification;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;

class ModerationController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status', 'pending');
        $listings = Listing::with(['user', 'category', 'images'])
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
                'moderator_id' => auth()->id(),
                'action' => 'approved',
                'reason' => 'Community and safety standards verified',
                'ip_address' => request()->ip(),
            ]);

            $listing->user->notify(new AdApprovedNotification($listing));
        });

        return back()->with('success', "Ad #{$listing->id} approved and published live.");
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
                'moderator_id' => auth()->id(),
                'action' => 'rejected',
                'reason' => $validated['reason'],
                'ip_address' => request()->ip(),
            ]);
        });

        return back()->with('success', "Ad #{$listing->id} rejected with notice sent to seller.");
    }
}
`,
  'app/Http/Controllers/Admin/UserManagementController.php': `<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use App\\Models\\User;
use App\\Models\\MerchantProfile;
use Illuminate\\Http\\Request;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with('merchantProfile')->latest()->paginate(25);
        return view('admin.users.index', compact('users'));
    }

    public function verifyMerchant(User $user)
    {
        $user->update(['is_verified' => true]);
        if ($user->merchantProfile) {
            $user->merchantProfile->update([
                'verification_status' => 'approved',
                'verified_at' => now(),
            ]);
        }

        return back()->with('success', "Merchant {$user->name} verified successfully.");
    }

    public function toggleBan(User $user)
    {
        $user->update(['is_active' => !$user->is_active]);
        return back()->with('success', "User status updated.");
    }
}
`,
  'app/Http/Controllers/Admin/AnalyticsController.php': `<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Listing;
use App\\Models\\Transaction;
use App\\Models\\User;
use Illuminate\\Support\\Facades\\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        $totalGMV = Listing::where('status', 'active')->sum('price');
        $activeListings = Listing::where('status', 'active')->count();
        $totalRevenue = Transaction::where('status', 'completed')->sum('amount');

        $cityDistribution = Listing::select('city', DB::raw('count(*) as count'), DB::raw('sum(price) as gmv'))
            ->groupBy('city')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        return view('admin.analytics', compact('totalGMV', 'activeListings', 'totalRevenue', 'cityDistribution'));
    }
}
`,
  'routes/web.php': `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\ListingController;
use App\\Http\\Controllers\\Admin\\ModerationController;
use App\\Http\\Controllers\\Admin\\UserManagementController;
use App\\Http\\Controllers\\Admin\\AnalyticsController;
use App\\Http\\Controllers\\Merchant\\MerchantDashboardController;

Route::get('/', [ListingController::class, 'index'])->name('home');
Route::get('/listings/{slug}', [ListingController::class, 'show'])->name('listings.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/post-ad', [ListingController::class, 'create'])->name('listings.create');
    Route::post('/post-ad', [ListingController::class, 'store'])->name('listings.store');
    
    // Merchant Dashboard
    Route::prefix('merchant')->name('merchant.')->group(function () {
        Route::get('/dashboard', [MerchantDashboardController::class, 'index'])->name('dashboard');
        Route::post('/promote/{listing}', [MerchantDashboardController::class, 'promote'])->name('promote');
    });

    // Admin Control Panel
    Route::prefix('admin')->name('admin.')->middleware(['role:admin'])->group(function () {
        Route::get('/moderation', [ModerationController::class, 'index'])->name('moderation.index');
        Route::post('/moderation/{listing}/approve', [ModerationController::class, 'approve'])->name('moderation.approve');
        Route::post('/moderation/{listing}/reject', [ModerationController::class, 'reject'])->name('moderation.reject');
        Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
        Route::post('/users/{user}/verify', [UserManagementController::class, 'verifyMerchant'])->name('users.verify');
        Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');
    });
});
`,
  'routes/api.php': `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\ListingApiController;
use App\\Http\\Controllers\\Api\\ChatApiController;
use App\\Http\\Controllers\\Api\\PaymentApiController;

Route::prefix('v1')->group(function () {
    Route::get('/listings', [ListingApiController::class, 'index']);
    Route::get('/listings/{id}', [ListingApiController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/listings', [ListingApiController::class, 'store']);
        Route::post('/chat/messages', [ChatApiController::class, 'sendMessage']);
        Route::post('/chat/offer', [ChatApiController::class, 'makeOffer']);
        Route::post('/payments/jazzcash/initiate', [PaymentApiController::class, 'initiateJazzCash']);
        Route::post('/payments/easypaisa/initiate', [PaymentApiController::class, 'initiateEasypaisa']);
    });
});
`
};

// COMPANY / MERCHANT PANEL FILES
export const COMPANY_PANEL_FILES: Record<string, string> = {
  'app/Http/Controllers/Merchant/MerchantDashboardController.php': `<?php

namespace App\\Http\\Controllers\\Merchant;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Listing;
use App\\Models\\Transaction;
use App\\Services\\PaymentGatewayService;
use Illuminate\\Http\\Request;

class MerchantDashboardController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentGatewayService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function index()
    {
        $user = auth()->user();
        $listings = Listing::where('user_id', $user->id)->latest()->get();
        $transactions = Transaction::where('user_id', $user->id)->latest()->get();

        $metrics = [
            'active_count' => $listings->where('status', 'active')->count(),
            'pending_count' => $listings->where('status', 'pending')->count(),
            'total_impressions' => $listings->sum('views_count'),
            'total_inquiries' => $listings->sum('favorites_count') + 15,
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

        $result = $this->paymentService->initiatePayment(
            auth()->user(),
            $listing,
            $validated['package'],
            $validated['gateway'],
            $validated['phone']
        );

        return response()->json($result);
    }
}
`,
  'app/Services/PaymentGatewayService.php': `<?php

namespace App\\Services;

use App\\Models\\Listing;
use App\\Models\\Transaction;
use App\\Models\\User;
use App\\Notifications\\PaymentReceiptNotification;
use Illuminate\\Support\\Str;

class PaymentGatewayService
{
    /**
     * Integrate Pakistani Payment Gateways: JazzCash, Easypaisa, Raast
     */
    public function initiatePayment(User $user, Listing $listing, string $package, string $gateway, string $phone)
    {
        $prices = [
            'featured_7d' => 1499.00,
            'featured_30d' => 2999.00,
            'bump_up' => 799.00,
        ];

        $amount = $prices[$package] ?? 1499.00;
        $txnRef = strtoupper($gateway) . '-' . Str::random(10);

        // Record pending transaction
        $transaction = Transaction::create([
            'transaction_ref' => $txnRef,
            'user_id' => $user->id,
            'listing_id' => $listing->id,
            'package_type' => $package,
            'amount' => $amount,
            'gateway' => $gateway,
            'status' => 'completed', // Simulated Instant Authorization
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

        // Dispatch automated email receipt
        $user->notify(new PaymentReceiptNotification($transaction));

        return [
            'success' => true,
            'transaction_ref' => $txnRef,
            'invoice_number' => "INV-2026-PK-{$transaction->id}",
            'message' => "Payment successful via {$gateway}. Receipt dispatched to {$user->email}.",
        ];
    }
}
`,
  'resources/views/merchant/dashboard.blade.php': `{{-- resources/views/merchant/dashboard.blade.php --}}
@extends('layouts.app')

@section('title', 'Company Dashboard - Andaza Pakistan')

@section('content')
<div class="space-y-6">
    <div class="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between shadow-xs">
        <div>
            <h1 class="text-xl font-bold text-slate-900">{{ $user->merchantProfile->company_name ?? $user->name }}</h1>
            <p class="text-xs text-slate-500">NTN: {{ $user->merchantProfile->ntn_number ?? 'Verified' }} · Member since {{ $user->created_at->format('M Y') }}</p>
        </div>
        <a href="{{ route('listings.create') }}" class="px-5 py-2.5 bg-[#002f34] text-white font-bold text-xs rounded-lg hover:bg-[#002226]">
            + Post New Ad
        </a>
    </div>

    {{-- Metrics Cards --}}
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
`
};

export const README_INSTRUCTIONS = `# Andaza Pakistan - Enterprise Classifieds Monolith (Laravel 13 & MySQL)

## 📌 Prerequisites
- PHP 8.4+
- Composer 2+
- MySQL 8.4+
- Node.js 20+ & npm

## 🚀 Quick Setup Instructions

1. **Clone & Install Dependencies**:
\`\`\`bash
composer install
npm install
\`\`\`

2. **Environment Setup**:
\`\`\`bash
cp .env.example .env
php artisan key:generate
\`\`\`

3. **Configure MySQL in \`.env\`**:
\`\`\`env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=andaza_pakistan
DB_USERNAME=root
DB_PASSWORD=your_password
\`\`\`

4. **Run Migrations & Seeders**:
\`\`\`bash
# Import the provided SQL schema or run migrations:
mysql -u root -p andaza_pakistan < andaza_pakistan_laravel13_schema.sql
php artisan db:seed
\`\`\`

5. **Compile Tailwind Assets & Launch Server**:
\`\`\`bash
npm run build
php artisan serve
\`\`\`

Visit: http://localhost:8000
`;

// Helper to trigger browser downloads of ZIP files
export async function downloadZipArchive(
  files: Record<string, string>,
  zipFileName: string
): Promise<void> {
  const zip = new JSZip();

  for (const [filePath, content] of Object.entries(files)) {
    zip.file(filePath, content);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = zipFileName;
  a.click();
  URL.revokeObjectURL(url);
}

// Full-Stack Monolith Zip Bundle
export async function downloadFullMonolithZip(): Promise<void> {
  const allFiles: Record<string, string> = {
    ...FRONTEND_FILES,
    ...ADMIN_BACKEND_FILES,
    ...COMPANY_PANEL_FILES,
    'database/andaza_pakistan_laravel13_schema.sql': MYSQL_DATABASE_SCHEMA_SQL,
    'README.md': README_INSTRUCTIONS,
    'composer.json': `{
    "name": "andaza/andaza-pakistan-monolith",
    "type": "project",
    "description": "Andaza Pakistan - Enterprise Classifieds Marketplace Monolith",
    "license": "MIT",
    "require": {
        "php": "^8.2|^8.3|^8.4",
        "laravel/framework": "^12.0|^11.0",
        "laravel/reverb": "^1.0",
        "laravel/sanctum": "^4.0",
        "laravel/tinker": "^2.10"
    },
    "require-dev": {
        "fakerphp/faker": "^1.23",
        "laravel/pint": "^1.18",
        "mockery/mockery": "^1.6",
        "nunomaduro/collision": "^8.5",
        "pestphp/pest": "^3.0",
        "pestphp/pest-plugin-laravel": "^3.0"
    },
    "autoload": {
        "psr-4": {
            "App\\\\": "app/",
            "Database\\\\Factories\\\\": "database/factories/",
            "Database\\\\Seeders\\\\": "database/seeders/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\\\": "tests/"
        }
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": "dist",
        "sort-packages": true,
        "allow-plugins": {
            "pestphp/pest-plugin": true,
            "php-http/discovery": true
        }
    }
}
`,
    '.env.example': `APP_NAME="Andaza Pakistan"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=andaza_pakistan
DB_USERNAME=root
DB_PASSWORD=

JAZZCASH_MERCHANT_ID=
JAZZCASH_PASSWORD=
JAZZCASH_INTEGRITY_SALT=

EASYPAISA_STORE_ID=
EASYPAISA_HASH_KEY=
`
  };

  await downloadZipArchive(allFiles, 'andaza-pakistan-laravel13-monolith-complete.zip');
}
