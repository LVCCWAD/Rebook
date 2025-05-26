<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Notifications\OrderPlacedNotification;

class SendOrderConfirmationNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
     public function handle(OrderPlaced $event)
    {
        $order = $event->order;
        $user = $order->user;

        // Notify the user with an in-app notification
        $user->notify(new OrderPlacedNotification($order));
    }
}
