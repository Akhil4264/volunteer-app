<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Professor;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Tokens;
use Carbon\Carbon;


class profController extends Controller
{
    

    public function getallTasks(Request $request){
        
        if (!$request->has('token')) {
            return response(["msg" => "no token received"], 400); // Bad Request
        }
        
        $accessToken = Tokens::where('token', $request->input('token'))->first();
        
        if($accessToken->role !== "Professor"){
            return response(["msg" => "wrong Token"], 401);
        }
        
        if ($accessToken) {
            $professor = Professor::where('id', $accessToken->user_id)->first();
        
            if ($professor) {


                $tasks = Task::where('professor_id', $professor->id)->get();
                $tasksArray = $tasks->toArray();

                $professor->makeHidden(['password', 'created_at']);

                return response(["user" => $professor , "tasks" => $tasksArray], 200); // OK






            } else {
                return response(["msg" => "Token expired"], 400); // Bad Request
            }
        } else {
            return response(["msg" => "wrong Token"], 401); // Unauthorized
        }

        // return response(["msg" => "hi"]);


        
    }

    public function createNewTask(Request $request){
        if (!$request->has('token')) {
            return response(["msg" => "no token received"], 400); // Bad Request
        }
        
        $accessToken = Tokens::where('token', $request->input('token'))->first();


        if($accessToken->role !== "Professor"){
            return response(["msg" => "wrong Token"], 401);
        }
        
        if ($accessToken) {
            $professor = Professor::where('id', $accessToken->user_id)->first();
        
            if ($professor) {

                $validatedData = Validator::make($request->all(),[
                    'title' => 'required|max:255',
                    'description' => 'required|max:65535',
                    'deadline' => 'required|max:255',
                    'priority' => 'required|max:255 ',
                    'assignedStudent' => 'required|max:255',
                ]);

                if ($validatedData->fails()) {
                    return response()->json(['errors' => $validatedData->errors()], 422);
                }

                $studentId = intval($request->assignedStudent);
                $student = Student::where('id',$studentId)->first();
                if(!$student){
                    return response()->json(['error' => 'No such StudentId exist'],403);
                }

                    $task = new Task();
                    $task->professor_id = $professor->id;
                    $task->student_id = $studentId;
                    // // $task->createdOn = $request->createdOn;
                    $task->deadline = Carbon::parse($request->deadline);
                    $task->is_submitted = 0;
                    $task->taskName = $request->title;
                    $task->priority = $request->priority;
                    $task->task_description = $request->description;
                    $task->status = "not_started";
                    try {
                        $task->save();
                        // Task saved successfully
                    } catch (\Exception $e) {
                        // Handle the exception
                        return response()->json(['error' => $e->getMessage()]); // Internal Server Error
                    }

                return response(["msg"=>$task],200);

            } else {
                return response(["msg" => "Token expired"], 400); // Bad Request
            }
        } else {
            return response(["msg" => "wrong Token"], 401); // Unauthorized
        } 
        
    }

    public function getallStudents(Request $request){
        
        if (!$request->has('token')) {
            return response(["msg" => "no token received"], 400); // Bad Request
        }
        
        $accessToken = Tokens::where('token', $request->input('token'))->first();
        
        if($accessToken->role !== "Professor"){
            return response(["msg" => "wrong Token"], 401);
        }
        
        if ($accessToken) {
            $professor = Professor::where('id', $accessToken->user_id)->first();
        
            if ($professor) {

                $students = Student::select('id', 'name', 'email', 'graduation_date')
                ->get();

                $professor->makeHidden(['password', 'created_at']);

                return response(["user" => $professor , 'students' => $students], 200); // OK

            } else {
                return response(["msg" => "Token expired"], 400); // Bad Request
            }
        } else {
            return response(["msg" => "wrong Token"], 401); // Unauthorized
        }

        // return response(["msg" => "hi"]);


        
    }

    public function getDetails(Request $request,$taskId){
        
        if (!$request->has('token')) {
            return response(["msg" => "no token received"], 400); // Bad Request
        }
        
        $accessToken = Tokens::where('token', $request->input('token'))->first();
        
        if($accessToken->role !== "Professor"){
            return response(["msg" => "wrong Token"], 401);
        }
        
        if ($accessToken) {
            $professor = Professor::where('id', $accessToken->user_id)->first();
        
            if ($professor) {

                $task = Task::where('id', $taskId)->first();
                if ($task) {

                    $student = Student :: where('id',$task->student_id);
                    if($student){

                        $student->makeHidden(['password', 'created_at']);                        
                        return response(["user" => $professor ,'task' =>$task, 'student' => $student], 200);

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

        // return response(["msg" => "hi"]);


        
    }



}
