<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['professor_id', 'student_id','createdOn','deadline','is_submitted','task_description','status','priority','submission_file_location'];

    // Define the relationship with the Professor model
    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }

    // Define the relationship with the Student model
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}


