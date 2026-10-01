<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\Admin\ModerationController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Merchant\MerchantDashboardController;

// Public Marketplace Routes
Route::get('/', [ListingController::class, 'index'])->name('home');
Route::get('/listings', [ListingController::class, 'index'])->name('listings.index');
Route::get('/listings/{slug}', [ListingController::class, 'show'])->name('listings.show');

// Authenticated User Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/post-ad', [ListingController::class, 'create'])->name('listings.create');
    Route::post('/post-ad', [ListingController::class, 'store'])->name('listings.store');
    
    // Company / Merchant Dashboard
    Route::prefix('merchant')->name('merchant.')->group(function () {
        Route::get('/dashboard', [MerchantDashboardController::class, 'index'])->name('dashboard');
        Route::post('/promote/{listing}', [MerchantDashboardController::class, 'promote'])->name('promote');
    });

    // Admin & Moderation Console
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/moderation', [ModerationController::class, 'index'])->name('moderation.index');
        Route::post('/moderation/{listing}/approve', [ModerationController::class, 'approve'])->name('moderation.approve');
        Route::post('/moderation/{listing}/reject', [ModerationController::class, 'reject'])->name('moderation.reject');
        Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
        Route::post('/users/{user}/verify', [UserManagementController::class, 'verifyMerchant'])->name('users.verify');
        Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');
    });
});
