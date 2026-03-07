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

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::apiResource('clients', ClientController::class);
    Route::post('/clients/{client}/transfer', [ClientTransferController::class, 'transfer']);
    Route::get('/pending-payments', [PaymentController::class, 'pendingPayments']);

    // Admin Only
    Route::middleware('can:admin')->group(function () {
        Route::apiResource('employees', EmployeeController::class);
        Route::get('/activity-logs', [ActivityLogController::class, 'index']);
    });
});
