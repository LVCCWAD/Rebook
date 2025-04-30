<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProductPolicy
{
    public function before(User $user)
    {
        if(!$user->isSeller()) {
            return false;
        }
    }

    private function isOwner(User $user, Product $product): bool
    {
        return $user->isSeller() && $user->id === $product->seller_id;
    }
    public function viewAny(User $user): bool
    {
        return true;
    }


    public function view(User $user, Product $product): bool
    {
        return $user->isOwner($user, $product);
    }


    public function create(User $user): bool
    {
        return true;
    }


    public function update(User $user, Product $product): bool
    {
        return $user->isOwner($user, $product);
    }


    public function delete(User $user, Product $product): bool
    {
        return $user->isOwner($user, $product);
    }

    public function restore(User $user, Product $product): bool
    {
        return $user->isOwner($user, $product);
    }

    public function forceDelete(User $user, Product $product): bool
    {
        return $user->isOwner($user, $product);
    }
}
