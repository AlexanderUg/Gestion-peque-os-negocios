<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::with('children')->whereNull('parent_id')->get();
        return view('locations.index', compact('locations'));
    }

    public function create()
    {
        $locations = Location::all(); 
        return view('locations.create', compact('locations'));

    }


    public function store(Request $request)
{
    $validated = $request->validate([
        'nombre' => 'required|string|max:100',
        'parent_id' => 'nullable|exists:locations,id',
    ]);

    Location::create($validated);

    return redirect('/locations/create')->with('success', 'Ubicación creada correctamente.');
}

}
