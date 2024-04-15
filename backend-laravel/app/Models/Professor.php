<?php

// Professor.php
namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

// class Professor extends Authenticatable
// {
//     use HasApiTokens, HasFactory, Notifiable;
// }


class Professor extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = ['name', 'email', 'password','department','isVerified'];
}
