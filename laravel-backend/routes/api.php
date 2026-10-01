<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ListingApiController;
use App\Http\Controllers\Api\ChatApiController;
use App\Http\Controllers\Api\PaymentApiController;

Route::prefix('v1')->group(function () {
    // Public Listing Search & Browsing
    Route::get('/listings', [ListingApiController::class, 'index']);
    Route::get('/listings/{id}', [ListingApiController::class, 'show']);

    // Authenticated API Endpoints
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/listings', [ListingApiController::class, 'store']);
        Route::post('/chat/messages', [ChatApiController::class, 'sendMessage']);
        Route::post('/chat/offer', [ChatApiController::class, 'makeOffer']);
        
        // Pakistani Payment Gateways
        Route::post('/payments/jazzcash/initiate', [PaymentApiController::class, 'initiateJazzCash']);
        Route::post('/payments/easypaisa/initiate', [PaymentApiController::class, 'initiateEasypaisa']);
    });
});
