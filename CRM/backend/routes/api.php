<?php

use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BackupController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\FinanceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public Routes
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth Utils
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Client Management
    Route::apiResource('clients', ClientController::class);
    Route::post('/clients/{id}/restore', [ClientController::class, 'restore']);
    Route::delete('/clients/{id}/force', [ClientController::class, 'forceDelete']);
    Route::post('/clients/{id}/transfer', [ClientController::class, 'transfer']);
    Route::get('/clients/assignees', [ClientController::class, 'getAssignableUsers']);

    // Finance
    Route::get('/clients/{id}/billing', [FinanceController::class, 'indexBilling']);
    Route::post('/billing', [FinanceController::class, 'storeBilling']);
    
    Route::get('/clients/{id}/payments', [FinanceController::class, 'indexPayments']);
    Route::post('/payments', [FinanceController::class, 'storePayment']);
    
    Route::get('/finance/pending', [FinanceController::class, 'getPendingPayments']);

    // Interactions
    Route::get('/clients/{id}/notes', [App\Http\Controllers\Api\NoteController::class, 'index']);
    Route::post('/notes', [App\Http\Controllers\Api\NoteController::class, 'store']);
    Route::get('/clients/{id}/followups', [App\Http\Controllers\Api\FollowUpController::class, 'index']);
    Route::post('/followups', [App\Http\Controllers\Api\FollowUpController::class, 'store']);

    // Activity Logs
    Route::get('/activity', [ActivityController::class, 'index']);

    // Admin Only Routes
    Route::middleware(\App\Http\Middleware\EnsureUserIsAdmin::class)->group(function () {
        
        // Employee Management
        Route::apiResource('employees', EmployeeController::class);
        Route::get('/employees/trash/all', [EmployeeController::class, 'trash']); // List deleted
        Route::post('/employees/{id}/restore', [EmployeeController::class, 'restore']);
        Route::delete('/employees/{id}/force', [EmployeeController::class, 'forceDelete']);

        // Backups
        Route::apiResource('backups', BackupController::class)->except(['update']);
        Route::get('/backups/{id}/download', [BackupController::class, 'download']);
        Route::post('/backups/{id}/restore', [BackupController::class, 'restore']);
    });
    Route::get('/dashboard', [App\Http\Controllers\Api\DashboardController::class, 'summary']);
});
