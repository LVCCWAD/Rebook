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
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('shipping_id')->nullable()->after('status');

        // Add foreign key if you want referential integrity:
            $table->foreign('shipping_id')->references('id')->on('shippings')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['shipping_id']); // Drop foreign key constraint
            $table->dropColumn('shipping_id'); // Drop the column
        });
    }
};
