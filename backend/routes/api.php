<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TasksController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Methods to auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protected
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    
    // Methods to tasks
    Route::get('/tasks', [TasksController::class, 'index']);
    Route::get('/tasks/{task}', [TasksController::class, 'show']);
    Route::post('/tasks', [TasksController::class, 'store']);
    Route::put('/tasks/{task}', [TasksController::class, 'update']);
    Route::delete('/tasks/{task}', [TasksController::class, 'destroy']);
});