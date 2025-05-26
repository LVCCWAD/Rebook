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
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->string('city_name');
            $table->integer('zip_code');
            $table->string('address');
            $table->string('country');

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

             $table->dropForeign(['order_id']);               // drop FK constraint first
            $table->unsignedBigInteger('order_id')->nullable()->change();  // make nullable
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');  // re-add FK

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('shippings', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->unsignedBigInteger('order_id')->nullable(false)->change();
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }
};
