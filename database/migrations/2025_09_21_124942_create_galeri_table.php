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
<<<<<<< HEAD:database/migrations/2025_09_21_124942_create_galeris_table.php
{
    Schema::create('albums', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->string('title');
        $table->text('description')->nullable();
        $table->enum('category', ['foto', 'video']);
        $table->enum('instansi', ['SMA', 'SMK', 'SLB']);
        $table->string('cover_image');
        $table->integer('media_count')->default(0);
        $table->date('date')->nullable(); // <-- biar bisa kosong
        $table->string('location')->nullable();
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('albums'); // <-- perbaikan
}
=======
    {
        Schema::create('galeri', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }
>>>>>>> d709e03b648daaae9dcc0ac2592f5002a592d37d:database/migrations/2025_09_21_124942_create_galeri_table.php

};
