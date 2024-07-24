<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','subject','department','lokasi_ruangan','jenis_masalah','deskripsi_masalah','status','id_divisi','teknisi_id'];
}
