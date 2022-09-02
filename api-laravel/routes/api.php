<?php

use App\Http\Controllers\CommandLineController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('users', UserController::class);
Route::post('login', [UserController::class, 'login']);

Route::resource('products', ProductController::class);
Route::post('uploadProducts', [ProductController::class, 'uploadProduct']);

Route::resource('command_line', CommandLineController::class);
Route::get('basket/{basketid}', [CommandLineController::class, 'getProductByBasket']);
Route::get('number_command_line/{basketid}', [CommandLineController::class, 'getNumberCommandLine']);

Route::get('/', function () {
    return view('paymentView');
});
