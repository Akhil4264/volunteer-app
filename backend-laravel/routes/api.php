<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\Api\AuthController;
use \App\Http\Controllers\studentController;
use \App\Http\Controllers\profController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });





Route::middleware(['cors'])->group(function () {
    

    Route::get('/', function () {
        return response()->json(['msg' => 'hi']);
    });
    Route::post('/logout',[AuthController::class,'logout']);
    // Route::post('/login/student',[AuthController::class,'loginStudent'])->middleware('auth:sanctum');
    Route::post('/login/student',[AuthController::class,'loginStudent']);
    Route::post('/login/professor',[AuthController::class,'loginProfessor']);
    
    Route::post('/signup/student',[AuthController::class,'registerStudent']);
    Route::post('/signup/professor',[AuthController::class,'registerProfessor']);



    Route::post('/student/tasks',[studentController :: class,'getallTasks']);
    Route::post('/student/{taskId}/changeStatus',[studentController :: class,'changeTaskstatus']);
    Route::post('/student/{taskId}',[studentController :: class,'getDetails']);


    Route::post('/student/:taskId/submit',[studentController :: class,'Submit']);

    

    Route::post('/professor/tasks',[profController :: class,'getallTasks']);
    Route::post('/professor/createTask',[profController :: class,'createNewTask']);
    Route::post('/professor/students',[profController :: class,'getallStudents']);

    Route::post('/professor/{taskId}',[profController :: class,'getDetails']);

    
});




