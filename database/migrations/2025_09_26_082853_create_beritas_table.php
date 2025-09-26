<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('beritas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('galeris_id')->constrained('galeris')->onDelete('cascade');
            $table->string('judul');
            $table->string('deskripsi');
            $table->string('file');
            $table->string('cover_image');
            $table->string('lokasi');
            $table->string('tabel')->default('berita');
            $table->enum('category',['foto','video']);
            $table->enum('instansi',['umum','sma','smk','slb']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beritas');
    }
};
