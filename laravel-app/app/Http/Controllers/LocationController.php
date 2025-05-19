<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class LocationController extends Controller
{
    public function index()
    {
         //$locations = Location::with('children')->whereNull('parent_id')->get();
          /* $locations = Location::whereNull('parent_id')
                ->with(['children' => function($query) {
                    $query->with('children'); // Carga los nietos
                }])
                ->get(); */

       //  return view('locations.index', compact('locations')); 

       $locations = Location::whereNull('parent_id')
    ->with('children.children.children.children.children.children') // Puedes repetir según tu profundidad
    ->get();


        return inertia('Locations/LocationIndex',compact('locations')); 

        /* $locations = Location::whereNull('parent_id')
                ->with(['children' => function($query) {
                    $query->with('children'); // Carga los nietos
                }])
                ->get();

    return inertia('Locations/Index', [
        'locations' => $locations
    ]); */
 
    }


    public function create()
    {
/*         $locations = Location::all(); 
 */       /*  return view('locations.create', compact('locations')); */
       /*  return inertia('Locations/LocationCreate'); */
return inertia('Locations/LocationCreate', [
        'locations' => Location::all()
    ]);

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
