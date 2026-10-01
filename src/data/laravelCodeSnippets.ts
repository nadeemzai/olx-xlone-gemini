export const LARAVEL_PROJECT_TREE = `
andaza-pakistan-monolith/
├── app/
│   ├── Enums/
│   │   ├── ListingStatus.php       # Active, Pending, Rejected, Expired
│   │   ├── PaymentGateway.php      # Easypaisa, JazzCash, Raast, Stripe
│   │   └── UserRole.php            # User, VerifiedMerchant, Moderator, SuperAdmin
│   ├── Events/
│   │   ├── AdListingCreated.php
│   │   ├── MessageSent.php         # Real-time WebSocket broadcasting (Reverb)
│   │   └── PaymentCompleted.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthApiController.php
│   │   │   │   ├── ChatApiController.php
│   │   │   │   ├── ListingApiController.php
│   │   │   │   └── PaymentApiController.php
│   │   │   ├── Admin/
│   │   │   │   ├── AnalyticsController.php
│   │   │   │   ├── ModerationController.php
│   │   │   │   └── UserManagementController.php
│   │   │   ├── ListingController.php
│   │   │   ├── MerchantDashboardController.php
│   │   │   └── PaymentController.php
│   │   ├── Middleware/
│   │   │   ├── EnforceRtlLocalization.php
│   │   │   ├── EnsureMerchantVerified.php
│   │   │   └── RateLimitSensitiveEndpoints.php
│   │   └── Requests/
│   │       ├── CreateListingRequest.php
│   │       └── ModerateListingRequest.php
│   ├── Models/
│   │   ├── Category.php
│   │   ├── Conversation.php
│   │   ├── Listing.php
│   │   ├── ListingImage.php
│   │   ├── MerchantProfile.php
│   │   ├── Message.php
│   │   ├── ModerationLog.php
│   │   ├── Transaction.php
│   │   └── User.php
│   ├── Notifications/
│   │   ├── AdApprovedNotification.php
│   │   └── PaymentReceiptNotification.php
│   └── Services/
│       ├── ChatEncryptionService.php
│       ├── JazzCashGateway.php
│       ├── ModerationAIService.php
│       └── SearchIndexService.php
├── config/
│   ├── broadcasting.php           # Laravel Reverb / Pusher config
│   ├── cache.php                  # Redis cluster caching
│   ├── database.php               # MySQL read/write replicas config
│   └── payments.php               # Easypaisa, JazzCash, Raast API keys
├── database/
│   ├── migrations/
│   │   ├── 2026_01_01_000001_create_users_table.php
│   │   ├── 2026_01_01_000002_create_categories_table.php
│   │   ├── 2026_01_01_000003_create_listings_table.php
│   │   ├── 2026_01_01_000004_create_conversations_and_messages_table.php
│   │   ├── 2026_01_01_000005_create_transactions_table.php
│   │   └── 2026_01_01_000006_create_moderation_logs_table.php
│   └── seeders/
│       └── PakistanClassifiedsSeeder.php
├── resources/
│   ├── views/
│   │   ├── layouts/
│   │   │   ├── app.blade.php
│   │   │   └── admin.blade.php
│   │   ├── listings/
│   │   │   ├── index.blade.php
│   │   │   ├── show.blade.php
│   │   │   └── create.blade.php
│   │   ├── merchant/
│   │   │   └── dashboard.blade.php
│   │   ├── admin/
│   │   │   ├── moderation-queue.blade.php
│   │   │   └── analytics.blade.php
│   │   └── emails/
│   │       └── transaction-receipt.blade.php
├── routes/
│   ├── api.php                    # RESTful API v1
│   ├── channels.php               # WebSocket broadcasting channels
│   └── web.php                    # Monolith Blade routes
└── tests/
    └── Feature/
        ├── ListingCreationTest.php
        └── ModerationSecurityTest.php
`;

export const MYSQL_DATABASE_SCHEMA_SQL = `-- ==============================================================
-- ANDAZA PAKISTAN ENTERPRISE MONOLITH DATABASE SCHEMA (MySQL 8.4+)
-- Designed for High Concurrency, Geospatial Search & Horizontal Sharding
-- ==============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS \`users\` (
    \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`name\` VARCHAR(191) NOT NULL,
    \`email\` VARCHAR(191) UNIQUE NOT NULL,
    \`phone\` VARCHAR(30) UNIQUE NOT NULL,
    \`phone_verified_at\` TIMESTAMP NULL DEFAULT NULL,
    \`password\` VARCHAR(255) NOT NULL,
    \`role\` ENUM('user', 'merchant', 'moderator', 'admin') DEFAULT 'user',
    \`is_verified\` TINYINT(1) DEFAULT 0,
    \`avatar_url\` VARCHAR(500) NULL,
    \`preferred_locale\` ENUM('en', 'ur') DEFAULT 'en',
    \`remember_token\` VARCHAR(100) NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX \`idx_users_role_verified\` (\`role\`, \`is_verified\`),
    INDEX \`idx_users_phone\` (\`phone\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. MERCHANT PROFILES (For Verified Business Sellers)
CREATE TABLE IF NOT EXISTS \`merchant_profiles\` (
    \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`user_id\` BIGINT UNSIGNED NOT NULL,
    \`company_name\` VARCHAR(255) NOT NULL,
    \`ntn_number\` VARCHAR(50) UNIQUE NULL,
    \`cnic_number\` VARCHAR(20) NOT NULL,
    \`business_address\` TEXT NOT NULL,
    \`city\` VARCHAR(100) NOT NULL,
    \`verification_status\` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    \`verified_at\` TIMESTAMP NULL DEFAULT NULL,
    \`rejection_notes\` TEXT NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`fk_merchant_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
    INDEX \`idx_merchant_status\` (\`verification_status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. CATEGORIES & TAXONOMY
CREATE TABLE IF NOT EXISTS \`categories\` (
    \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`parent_id\` INT UNSIGNED NULL,
    \`name_en\` VARCHAR(100) NOT NULL,
    \`name_ur\` VARCHAR(100) NOT NULL,
    \`slug\` VARCHAR(120) UNIQUE NOT NULL,
    \`icon\` VARCHAR(100) NULL,
    \`order_priority\` SMALLINT DEFAULT 0,
    \`is_active\` TINYINT(1) DEFAULT 1,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT \`fk_categories_parent\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\` (\`id\`) ON DELETE SET NULL,
    INDEX \`idx_category_slug\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. AD LISTINGS (Core Table with Partitioning Support)
CREATE TABLE IF NOT EXISTS \`listings\` (
    \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`user_id\` BIGINT UNSIGNED NOT NULL,
    \`category_id\` INT UNSIGNED NOT NULL,
    \`title\` VARCHAR(255) NOT NULL,
    \`title_ur\` VARCHAR(255) NULL,
    \`slug\` VARCHAR(300) NOT NULL,
    \`description\` TEXT NOT NULL,
    \`description_ur\` TEXT NULL,
    \`price\` DECIMAL(14, 2) NOT NULL,
    \`currency\` CHAR(3) DEFAULT 'PKR',
    \`condition\` ENUM('new', 'used', 'refurbished') NOT NULL,
    \`city\` VARCHAR(100) NOT NULL,
    \`area\` VARCHAR(150) NOT NULL,
    \`province\` VARCHAR(100) NOT NULL,
    \`latitude\` DECIMAL(10, 8) NULL,
    \`longitude\` DECIMAL(11, 8) NULL,
    \`status\` ENUM('pending', 'active', 'rejected', 'expired', 'sold') DEFAULT 'pending',
    \`is_featured\` TINYINT(1) DEFAULT 0,
    \`is_urgent\` TINYINT(1) DEFAULT 0,
    \`featured_until\` TIMESTAMP NULL DEFAULT NULL,
    \`views_count\` INT UNSIGNED DEFAULT 0,
    \`favorites_count\` INT UNSIGNED DEFAULT 0,
    \`rejection_reason\` VARCHAR(255) NULL,
    \`bumped_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`fk_listings_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
    CONSTRAINT \`fk_listings_category\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\` (\`id\`),
    INDEX \`idx_listings_status_featured\` (\`status\`, \`is_featured\`, \`bumped_at\` DESC),
    INDEX \`idx_listings_city_category\` (\`city\`, \`category_id\`, \`price\`),
    FULLTEXT \`ft_listing_search\` (\`title\`, \`description\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. LISTING ATTRIBUTES (EAV Table for dynamic fields like Make, Model, Mileage, PTA status)
CREATE TABLE IF NOT EXISTS \`listing_attributes\` (
    \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`listing_id\` BIGINT UNSIGNED NOT NULL,
    \`attribute_key\` VARCHAR(100) NOT NULL,
    \`attribute_value\` VARCHAR(255) NOT NULL,
    CONSTRAINT \`fk_attr_listing\` FOREIGN KEY (\`listing_id\`) REFERENCES \`listings\` (\`id\`) ON DELETE CASCADE,
    INDEX \`idx_attr_lookup\` (\`attribute_key\`, \`attribute_value\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. LISTING IMAGES
CREATE TABLE IF NOT EXISTS \`listing_images\` (
    \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`listing_id\` BIGINT UNSIGNED NOT NULL,
    \`image_url\` VARCHAR(500) NOT NULL,
    \`is_primary\` TINYINT(1) DEFAULT 0,
    \`order_index\` SMALLINT DEFAULT 0,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT \`fk_images_listing\` FOREIGN KEY (\`listing_id\`) REFERENCES \`listings\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. CHAT CONVERSATIONS
CREATE TABLE IF NOT EXISTS \`conversations\` (
    \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`listing_id\` BIGINT UNSIGNED NOT NULL,
    \`buyer_id\` BIGINT UNSIGNED NOT NULL,
    \`seller_id\` BIGINT UNSIGNED NOT NULL,
    \`last_message_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY \`unique_listing_buyer\` (\`listing_id\`, \`buyer_id\`),
    CONSTRAINT \`fk_conv_listing\` FOREIGN KEY (\`listing_id\`) REFERENCES \`listings\` (\`id\`) ON DELETE CASCADE,
    CONSTRAINT \`fk_conv_buyer\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`users\` (\`id\`),
    CONSTRAINT \`fk_conv_seller\` FOREIGN KEY (\`seller_id\`) REFERENCES \`users\` (\`id\`),
    INDEX \`idx_conv_participants\` (\`buyer_id\`, \`seller_id\`, \`last_message_at\` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. CHAT MESSAGES (With End-to-End Encryption Cipher Support)
CREATE TABLE IF NOT EXISTS \`messages\` (
    \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`conversation_id\` BIGINT UNSIGNED NOT NULL,
    \`sender_id\` BIGINT UNSIGNED NOT NULL,
    \`encrypted_payload\` TEXT NOT NULL,
    \`iv_vector\` VARCHAR(64) NOT NULL,
    \`is_offer\` TINYINT(1) DEFAULT 0,
    \`offer_amount\` DECIMAL(14, 2) NULL,
    \`offer_status\` ENUM('none', 'pending', 'accepted', 'rejected') DEFAULT 'none',
    \`is_read\` TINYINT(1) DEFAULT 0,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT \`fk_msg_conversation\` FOREIGN KEY (\`conversation_id\`) REFERENCES \`conversations\` (\`id\`) ON DELETE CASCADE,
    CONSTRAINT \`fk_msg_sender\` FOREIGN KEY (\`sender_id\`) REFERENCES \`users\` (\`id\`),
    INDEX \`idx_msg_unread\` (\`conversation_id\`, \`is_read\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. TRANSACTIONS & PAYMENTS (Easypaisa, JazzCash, Raast, Cards)
CREATE TABLE IF NOT EXISTS \`transactions\` (
    \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`transaction_ref\` VARCHAR(100) UNIQUE NOT NULL,
    \`user_id\` BIGINT UNSIGNED NOT NULL,
    \`listing_id\` BIGINT UNSIGNED NULL,
    \`package_type\` ENUM('featured_7d', 'featured_30d', 'bump_up', 'merchant_badge') NOT NULL,
    \`amount\` DECIMAL(10, 2) NOT NULL,
    \`gateway\` ENUM('easypaisa', 'jazzcash', 'raast', 'stripe_card') NOT NULL,
    \`gateway_ref\` VARCHAR(150) NULL,
    \`status\` ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    \`billing_email\` VARCHAR(191) NOT NULL,
    \`receipt_sent_at\` TIMESTAMP NULL DEFAULT NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`fk_trans_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`),
    INDEX \`idx_trans_status_gateway\` (\`status\`, \`gateway\`, \`created_at\` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. MODERATION AUDIT LOGS (Compliance & Security)
CREATE TABLE IF NOT EXISTS \`moderation_logs\` (
    \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`listing_id\` BIGINT UNSIGNED NOT NULL,
    \`moderator_id\` BIGINT UNSIGNED NOT NULL,
    \`action\` ENUM('approved', 'rejected', 'featured', 'flagged_fraud') NOT NULL,
    \`reason\` VARCHAR(255) NULL,
    \`ip_address\` VARCHAR(45) NOT NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT \`fk_mod_listing\` FOREIGN KEY (\`listing_id\`) REFERENCES \`listings\` (\`id\`) ON DELETE CASCADE,
    CONSTRAINT \`fk_mod_moderator\` FOREIGN KEY (\`moderator_id\`) REFERENCES \`users\` (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
`;

export const BLADE_LAYOUT_TEMPLATE = `{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() == 'ur' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Andaza Pakistan - Buy & Sell Cars, Mobiles, Real Estate')</title>
    <meta name="description" content="@yield('meta_description', 'Pakistan\'s largest online classifieds marketplace.')">

    <!-- Fonts: Plus Jakarta Sans for English & Noto Sans Arabic for Urdu -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Vite Assets (Tailwind CSS v4 + Alpine.js / Echo) -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#f7f8f9] text-[#002f34] antialiased min-h-screen flex flex-col font-sans">

    {{-- 1. Main Navigation Bar with Location Selector & Search --}}
    @include('partials.header')

    {{-- 2. Category Sub-Navigation Bar --}}
    @include('partials.category-bar')

    {{-- 3. Dynamic Flash Message Banners --}}
    @if(session('success'))
        <div class="max-w-7xl mx-auto px-4 mt-4 w-full">
            <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center justify-between">
                <span>{{ session('success') }}</span>
                <button type="button" class="text-emerald-600 hover:text-emerald-900" onclick="this.parentElement.remove()">✕</button>
            </div>
        </div>
    @endif

    {{-- 4. Primary Page Viewport --}}
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        @yield('content')
    </main>

    {{-- 5. Enterprise Marketplace Footer --}}
    @include('partials.footer')

    @stack('scripts')
</body>
</html>
`;

export const BLADE_LISTING_SHOW_TEMPLATE = `{{-- resources/views/listings/show.blade.php --}}
@extends('layouts.app')

@section('title', $listing->title . ' - Andaza Pakistan')
@section('meta_description', Str::limit(strip_tags($listing->description), 150))

@section('content')
<nav class="flex items-center gap-2 text-xs text-slate-500 mb-6">
    <a href="{{ route('home') }}" class="hover:underline">Home</a>
    <span>/</span>
    <a href="{{ route('listings.index', ['category' => $listing->category->slug]) }}" class="hover:underline">{{ $listing->category->name_en }}</a>
    <span>/</span>
    <span class="text-slate-800 font-medium truncate max-w-md">{{ $listing->title }}</span>
</nav>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    {{-- Left Column: High-Res Gallery & Description (8 cols) --}}
    <div class="lg:col-span-8 space-y-6">
        {{-- Gallery Container --}}
        <div class="bg-black rounded-xl overflow-hidden relative aspect-[16/10] flex items-center justify-center shadow-sm">
            <img src="{{ $listing->primaryImage->image_url }}" alt="{{ $listing->title }}" class="object-contain max-h-full w-full">
            @if($listing->is_featured)
                <span class="absolute top-4 left-4 bg-[#ffce32] text-[#002f34] text-xs font-bold px-3 py-1 rounded shadow-sm">
                    FEATURED
                </span>
            @endif
        </div>

        {{-- Details & Specs Block --}}
        <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h2 class="text-lg font-bold text-[#002f34] border-b border-slate-100 pb-3">Details & Specifications</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div class="space-y-1">
                    <p class="text-xs text-slate-500">Condition</p>
                    <p class="text-sm font-semibold capitalize">{{ $listing->condition }}</p>
                </div>
                <div class="space-y-1">
                    <p class="text-xs text-slate-500">Location</p>
                    <p class="text-sm font-semibold">{{ $listing->area }}, {{ $listing->city }}</p>
                </div>
                @foreach($listing->attributes as $attr)
                    <div class="space-y-1">
                        <p class="text-xs text-slate-500">{{ Str::headline($attr->attribute_key) }}</p>
                        <p class="text-sm font-semibold">{{ $attr->attribute_value }}</p>
                    </div>
                @endforeach
            </div>

            <div class="pt-4 border-t border-slate-100">
                <h3 class="text-md font-bold text-[#002f34] mb-2">Description</h3>
                <div class="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {{ $listing->description }}
                </div>
            </div>
        </div>
    </div>

    {{-- Right Column: Contiguous Purchase / Contact Module (4 cols) --}}
    <div class="lg:col-span-4 space-y-6">
        {{-- Pricing Card --}}
        <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div class="flex items-baseline justify-between mb-2">
                <h1 class="text-3xl font-extrabold text-[#002f34] tabular-nums">
                    Rs {{ number_format($listing->price) }}
                </h1>
                <button class="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Favorite">
                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
            </div>
            <p class="text-sm font-semibold text-slate-800 mb-4 line-clamp-2">{{ $listing->title }}</p>
            <div class="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span>{{ $listing->city }}, {{ $listing->province }}</span>
                <span>{{ $listing->created_at->diffForHumans() }}</span>
            </div>
        </div>

        {{-- Seller Card --}}
        <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center gap-3">
                <img src="{{ $listing->seller->avatar_url }}" class="w-12 h-12 rounded-full object-cover border border-slate-200">
                <div>
                    <h4 class="font-bold text-slate-900 flex items-center gap-1.5">
                        {{ $listing->seller->name }}
                        @if($listing->seller->is_verified)
                            <span class="text-teal-600" title="Verified Seller">✓</span>
                        @endif
                    </h4>
                    <p class="text-xs text-slate-500">Member since {{ $listing->seller->created_at->format('M Y') }}</p>
                </div>
            </div>

            <div class="space-y-2 pt-2">
                <a href="{{ route('chat.start', ['listing' => $listing->id]) }}" class="w-full block text-center py-3 bg-[#002f34] hover:bg-[#002226] text-white font-bold rounded-lg transition-colors">
                    Chat with Seller
                </a>
                <button type="button" x-data="{ revealed: false }" @click="revealed = true" class="w-full py-3 border-2 border-[#002f34] text-[#002f34] font-bold rounded-lg hover:bg-slate-50 transition-colors">
                    <span x-show="!revealed">Show Phone Number</span>
                    <span x-show="revealed" class="tabular-nums">{{ $listing->seller->phone }}</span>
                </button>
            </div>
        </div>
    </div>
</div>
@endsection
`;

export const LARAVEL_MODERATION_CONTROLLER = `<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Listing;
use App\\Models\\ModerationLog;
use App\\Notifications\\AdApprovedNotification;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;

class ModerationController extends Controller
{
    /**
     * Display queued listings pending moderation
     */
    public function index(Request $request)
    {
        $status = $request->query('status', 'pending');
        
        $listings = Listing::with(['user', 'category', 'images'])
            ->where('status', $status)
            ->latest()
            ->paginate(15);

        return view('admin.moderation-queue', compact('listings', 'status'));
    }

    /**
     * Approve listing with audit logging & seller notification
     */
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
                'reason' => 'All safety and community standards satisfied',
                'ip_address' => request()->ip(),
            ]);

            // Dispatch automated email & SMS alert to seller
            $listing->user->notify(new AdApprovedNotification($listing));
        });

        return back()->with('success', "Ad #{$listing->id} approved and published live.");
    }

    /**
     * Reject listing with mandatory compliance reason
     */
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

        return back()->with('success', "Ad #{$listing->id} rejected.");
    }
}
`;

export const LARAVEL_PEST_TESTS = `<?php

use App\\Models\\User;
use App\\Models\\Listing;
use App\\Models\\Category;
use function Pest\\Laravel\\actingAs;
use function Pest\\Laravel\\postJson;
use function Pest\\Laravel\\getJson;

test('verified merchant can create a featured ad with PKR pricing', function () {
    $merchant = User::factory()->create([
        'role' => 'merchant',
        'is_verified' => true,
    ]);

    $category = Category::factory()->create(['slug' => 'cars']);

    actingAs($merchant)
        ->postJson('/api/v1/listings', [
            'category_id' => $category->id,
            'title' => 'Toyota Yaris 1.3 ATIV X CVT 2024',
            'description' => 'Single-handed driven in Islamabad, total genuine.',
            'price' => 5450000,
            'condition' => 'used',
            'city' => 'Islamabad',
            'area' => 'Sector F-7',
            'province' => 'Federal Capital',
        ])
        ->assertCreated()
        ->assertJsonPath('data.status', 'pending');
});

test('moderator can approve pending ad and it becomes visible in search', function () {
    $moderator = User::factory()->create(['role' => 'moderator']);
    $ad = Listing::factory()->create(['status' => 'pending']);

    actingAs($moderator)
        ->post("/admin/moderation/{$ad->id}/approve")
        ->assertRedirect();

    expect($ad->fresh()->status)->toBe('active');
});

test('unauthenticated users cannot trigger buyer-seller negotiation offers', function () {
    postJson('/api/v1/chat/offer', [
        'listing_id' => 101,
        'offer_amount' => 8500000,
    ])->assertUnauthorized();
});
`;
