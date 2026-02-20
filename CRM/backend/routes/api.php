<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FinanceController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\BackupController;
use App\Http\Controllers\Api\TrashController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\FollowUpController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Core Modules
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('staff', StaffController::class);
    
    // Follow Ups
    Route::get('/followups/{clientId}', [FollowUpController::class, 'index']);
    Route::post('/followups', [FollowUpController::class, 'store']);
    
    // Finance
    Route::get('/finance/summary/{clientId}', [FinanceController::class, 'getLedgerSummary']);
    Route::get('/finance/billing/{clientId}', [FinanceController::class, 'getBilling']);
    Route::post('/finance/billing', [FinanceController::class, 'addBilling']);
    Route::delete('/finance/billing/{id}', [FinanceController::class, 'deleteBilling']);
    Route::get('/finance/payments/{clientId}', [FinanceController::class, 'getPayments']);
    Route::post('/finance/payments', [FinanceController::class, 'addPayment']);
    Route::delete('/finance/payments/{id}', [FinanceController::class, 'deletePayment']);
    Route::get('/finance/pending', [FinanceController::class, 'getPendingPayments']);
    
    // Activity & Transfers
    Route::get('/activity', [ActivityController::class, 'index']);
    Route::get('/transfers', [ActivityController::class, 'transfers']);
    
    // Backups
    Route::get('/backups', [BackupController::class, 'index']);
    Route::post('/backups', [BackupController::class, 'store']);
    Route::delete('/backups/{id}', [BackupController::class, 'destroy']);
    Route::post('/backups/restore', [BackupController::class, 'restore']);
    
    // Trash
    Route::get('/trash', [TrashController::class, 'index']);
    Route::post('/trash/restore', [TrashController::class, 'restore']);
    Route::post('/trash/purge', [TrashController::class, 'purge']);
});