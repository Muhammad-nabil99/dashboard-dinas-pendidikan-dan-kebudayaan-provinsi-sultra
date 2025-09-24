<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProdukHukum extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'produk_hukum';
    protected $fillable = [
        'judul',
        'deskripsi',
        'file',
    ];
}
