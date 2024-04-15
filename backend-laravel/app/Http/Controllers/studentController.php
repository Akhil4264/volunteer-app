<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Task;
use App\Models\Professor;
use App\Models\Tokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class studentController extends Controller
{
    public function getallTasks(Request $request){
        
        if (!$request->has('token')) {
            return response(["msg" => "no token received"], 400); // Bad Request
        }
        
        $accessToken = Tokens::where('token', $request->input('token'))->first();
        
        if($accessToken->role !== "Student"){
            return response(["msg" => "wrong Token"], 401);
        }
        
        if ($accessToken) {
            $student = Student::where('id', $accessToken->user_id)->first();
        
            if ($student) {


                $tasks = Task::where('student_id', $student->id)->get();
                $tasksArray = $tasks->toArray();

                $student->makeHidden(['password', 'created_at']);

                return response(["user" => $student , "tasks" => $tasksArray], 200); // OK

                // return response(["msg" => $student->id]);




            } else {
                return response(["msg" => "Token expired"], 400); // Bad Request
            }
            return response(["student" => $student]);
        } else {
            return response(["msg" => "wrong Token"], 401); // Unauthorized
        }

        // return response(["msg" => "hi"]);


        
    }

    public function changeTaskstatus(Request $request,$taskId){
        if (!$request->has('token')) {
            return response(["msg" => "no token received"], 400); // Bad Request
        }
        
        $accessToken = Tokens::where('token', $request->input('token'))->first();
        
        if($accessToken->role !== "Student"){
            return response(["msg" => "wrong Token"], 401);
        }
        
        if ($accessToken) {
            $student = Student::where('id', $accessToken->user_id)->first();
        
            if ($student) {

                $task = Task::where('student_id', $student->id)
                    ->where('id', $taskId)
                    ->first();
                
                    $newStatus = $request->changedStatus;

                
                if ($task) {
                    $task->status = $newStatus;
                    $task->save();

                    return response()->json(['message' => 'Status updated successfully'], 200);
                }
                else{
                    return response()->json(['message' => 'No such task'], 200);
                }

            } else {
                return response(["msg" => "Token expired"], 400); // Bad Request
            }
        } else {
            return response(["msg" => "wrong Token"], 401); // Unauthorized
        }
    }

    public function Submit(Request $request){
        if (!$request->has('token')) {
            return response(["msg" => "no token received"], 400); // Bad Request
        }
        
        $accessToken = Tokens::where('token', $request->input('token'))->first();
        
        if($accessToken->role !== "Student"){
            return response(["msg" => "wrong Token"], 401);
        }
        
        if ($accessToken) {
            $student = Student::where('id', $accessToken->user_id)->first();
        
            if ($student) {

                $task = Task::where('student_id', $student->id)
                    ->where('id', $taskId)
                    ->first();
                if ($task) {
                    $task->is_submitted = true;
                    $task->submission_file_location	 = $request->submission;
                    $task->save();

                    return response()->json(['message' => 'Status updated successfully'], 200);
                }
                else{
                    return response()->json(['message' => 'No such task'], 200);
                }

            } else {
                return response(["msg" => "Token expired"], 400); // Bad Request
            }
        } else {
            return response(["msg" => "wrong Token"], 401); // Unauthorized
        }
    }

    public function getDetails(Request $request,$taskId){
        if (!$request->has('token')) {
            return response(["msg" => "no token received"], 400); // Bad Request
        }
        
        $accessToken = Tokens::where('token', $request->input('token'))->first();
        
        if($accessToken->role !== "Student"){
            return response(["msg" => "wrong Token"], 401);
        }
        
        if ($accessToken) {
            $student = Student::where('id', $accessToken->user_id)->first();
        
            if ($student) {

                $task = Task::where('id', $student->id)->first();
                if ($task) {

                    $professor = Professor :: where('id',$task->professor_id);
                    if($professor){

                        $professor->makeHidden(['password', 'created_at']);                        
                        return response(["user" => $student ,'task' =>$task, 'professor' => $professor], 200);

                    }
                    else{
                        return response()->json(['message' => 'No such task'], 200);
                    }
                }
                else{
                    return response()->json(['message' => 'No such task'], 200);
                }

            } else {
                return response(["msg" => "Token expired"], 400); // Bad Request
            }
        } else {
            return response(["msg" => "wrong Token"], 401); // Unauthorized
        }
    }



    // public function AddComment(Request $request){
    //     if (!$request->has('token')) {
    //         return response(["msg" => "no token received"], 400); // Bad Request
    //     }
        
    //     $accessToken = Tokens::where('token', $request->input('token'))->first();
        
    //     if($accessToken->role !== "Student"){
    //         return response(["msg" => "wrong Token"], 401);
    //     }
        
    //     if ($accessToken) {
    //         $student = Student::where('id', $accessToken->user_id)->first();
        
    //         if ($student) {

                

    //         } else {
    //             return response(["msg" => "Token expired"], 400); // Bad Request
    //         }
    //     } else {
    //         return response(["msg" => "wrong Token"], 401); // Unauthorized
    //     }
    // }
}
