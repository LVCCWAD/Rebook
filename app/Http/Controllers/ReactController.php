<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ReactController extends Controller
{
    // login post
    public function login(Request $request)
    {
        // Backend "test" credentials
        $correctEmail = 'test@example.com';
        $correctPassword = '12345678';

        // Check email first
        if ($request->email !== $correctEmail) {
            return back()->withErrors([
                'email' => 'Invalid email address.',
            ]);
        }

        // Check password only if email is valid
        if ($request->password !== $correctPassword) {
            return back()->withErrors([
                'password' => 'Incorrect password.',
            ]);
        }

        // Successful login
        return redirect('dashboard');
    }

    // register post
    public function register(Request $request){
        $name = $request['name'];
        $email = $request['email'];
        $password = $request['password'];

        return redirect('dashboard');

        // // working backend error
        // return back()->withErrors([
        //     'errors' => 'test error',
        // ]);
    }

    public function product(Request $request, $id){

        // Access data from the request
        $product = $request->input('product');

        // Example: Save to DB or process logic
        // Product::create([...]);
        log::info('check variable --->',[$product]);


        return Inertia::render('Product/Product', [
            // 'message' => 'Data received successfully',
            // 'title' => $title,
            'product' => $product
        ]);
    }

}
