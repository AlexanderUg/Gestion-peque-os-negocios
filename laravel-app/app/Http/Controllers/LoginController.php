<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
           return Inertia::render('Auth/Login');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

           if (
        $credentials['username'] === env('AUTH_USERNAME') &&
        $credentials['password'] === env('AUTH_PASSWORD')
    ) {
        // Establecer una variable de sesión para indicar que el usuario está autenticado
        Session::put('authenticated', true);
        //return redirect()->intended('/')->whith(['inertia'=> true]);
        //return redirect()->route('Home');
return Inertia::location('/');

    }

        return back()->withErrors([
            'username' => 'Credenciales incorrectas.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
