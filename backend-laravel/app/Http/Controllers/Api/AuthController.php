<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Professor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Tokens;





class AuthController extends Controller
{



    public function registerStudent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:students',
            'password' => 'required|string|min:8',
            'graduation_date' => 'required|date_format:Y-m-d'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Student::where('email', $request->email)->first();
        if($user){
            return response()->json(['error' => "Email already registered"], 401);
        }

        $student = new Student();
        $student->name = $request->name;
        $student->email = $request->email;
        $student->password = Hash::make($request->password);
        $student->graduation_date = $request->graduation_date;
        $student->save();

        $access_token = $student->createToken(time())->plainTextToken;
        $token = new Tokens();
        $token->token = $access_token;
        $token->user_id = $student->id;
        $token->role = "Student";
        $token->save();
        return response()->json(["token" => $access_token,"role" => "Student"], 200);
    }


    
    public function loginStudent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Retrieve the student record from the database
        $student = Student::where('email', $request->email)->first();
    
        // Check if a student with the provided email exists and if the password is correct
        if ($student && Hash::check($request->password, $student->password)) {
            // Authentication successful
            $access_token = $student->createToken(time())->plainTextToken;
            $token = new Tokens();
            $token->token = $access_token;
            $token->user_id = $student->id;
            $token->role = "Student";
            $token->save();
            return response()->json(["token" => $access_token,"role" => "Student"], 200);
        }
    
        // Authentication failed
        return response(["msg" => "invalid credentials"],401);
    }


    public function loginProfessor(Request $request)
    {
        // Validate login request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Retrieve the professor record from the database
        $professor = Professor::where('email', $request->email)->first();

        // Check if a professor with the provided email exists and if the password is correct
        if ($professor && Hash::check($request->password, $professor->password)) {
            // Authentication successful
            // $professor->makeHidden(['password', 'created_at','updated_at']);
            $access_token = $professor->createToken(time())->plainTextToken;
            $token = new Tokens();
            $token->token = $access_token;
            $token->user_id = $professor->id;
            $token->role = "Professor";
            $token->save();
            return response()->json(["token" => $access_token,"role" => "Professor"], 200);
        }

        // Authentication failed
        return response(["msg" => "invalid credentials"],401);
    }



    public function registerProfessor(Request $request)
    {
        // Validate registration request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:professors',
            'password' => 'required|string|min:8',
            'department' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create and save the new professor record
        $professor = new Professor();
        $professor->name = $request->name;
        $professor->email = $request->email;
        $professor->password = Hash::make($request->password);
        $professor->department = $request->department;
        $professor->save();

        $access_token = $professor->createToken(time())->plainTextToken;
        $token = new Tokens();
        $token->token = $access_token;
        $token->user_id = $professor->id;
        $token->role = "Professor";
        $token->save();
        return response()->json(["token" => $access_token,"role" => "Professor"], 200);
    }

   

    public function logout(Request $request){

        // auth()->student()->currentAccessToken()->delete();
        if (!$request->has('token')) {
            return response(["msg" => "no token received"], 400); // Bad Request
        }
        $token = Tokens::where('token', $request->input('token'))->first();


        if ($token) {
            // If the token record is found, delete it
            $token->delete();
            return response(["msg" => "Token removed successfully"], 200);
        } else {
            // If the token record is not found, return an error response
            return response(["msg" => "Token not found"], 404);
        }

    }

}
