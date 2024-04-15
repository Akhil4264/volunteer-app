<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = [
        'task_id', 'file_location'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
