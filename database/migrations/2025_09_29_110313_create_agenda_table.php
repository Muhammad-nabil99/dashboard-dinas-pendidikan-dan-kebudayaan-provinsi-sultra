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
        Schema::create('agenda', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('judul');
            $table->string('coverImage');
            $table->enum('category',['foto','video'])->default('foto');
            $table->enum('instansi',['umum','slb','smk','smp'])->default('umum');
            $table->string('penyelenggara');
            $table->string('lokasi');
            $table->string('tabel');
            $table->string('deskripsi');
            $table->foreignId('medias_id')->constrained('medias')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agenda');
    }
};
