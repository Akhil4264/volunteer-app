<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('professor_id');
            $table->unsignedBigInteger('student_id');
            $table->date('deadline');
            $table->boolean('is_submitted')->default(false);
            $table->string('taskName');
            $table->string('task_description');
            $table->string('priority');
            $table->string('status');
            $table->string('submission_file_location')->nullable();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('professor_id')->references('id')->on('professors')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}

