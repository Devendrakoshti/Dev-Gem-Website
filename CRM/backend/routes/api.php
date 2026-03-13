<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ClientTransferController;
use App\Http\Controllers\Api\BillingController;
use App\Http\Controllers\Api\FollowUpController;
use App\Http\Controllers\Api\NoteController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/dashboard/activity', [DashboardController::class, 'activity']);

    Route::apiResource('clients', ClientController::class);
    Route::post('/clients/{id}/restore', [ClientController::class, 'restore']);
    Route::delete('/clients/{id}/purge', [ClientController::class, 'purge']);
    Route::post('/clients/{client}/transfer', [ClientTransferController::class, 'transfer']);
    
    Route::get('/payments/pending', [PaymentController::class, 'pendingPayments']);
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::delete('/payments/{id}', [PaymentController::class, 'destroy']);

    Route::post('/billing', [BillingController::class, 'store']);
    Route::delete('/billing/{billingItem}', [BillingController::class, 'destroy']);

    Route::post('/follow-ups', [FollowUpController::class, 'store']);
    Route::post('/notes', [NoteController::class, 'store']);

    // Admin Only
    Route::middleware('can:admin')->group(function () {
        Route::apiResource('employees', EmployeeController::class);
        Route::post('/employees/{id}/restore', [EmployeeController::class, 'restore']);
        Route::delete('/employees/{id}/purge', [EmployeeController::class, 'purge']);
        Route::get('/activity-logs', [ActivityLogController::class, 'index']);
    });
});
