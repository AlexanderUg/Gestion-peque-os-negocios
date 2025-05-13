import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function LocationCreate() {
    const { locations } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        parent_id: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/locations');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Crear Nueva Ubicación</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo Nombre */}
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la ubicación *
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        value={data.nombre}
                        onChange={(e) => setData('nombre', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md transition-all focus:ring-2 ${
                            errors.nombre ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        required
                    />
                    {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                </div>

                {/* Selector de Ubicación Padre */}
                <div>
                    <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700 mb-2">
                        Ubicación padre (opcional)
                    </label>
                    <select
                        id="parent_id"
                        value={data.parent_id}
                        onChange={(e) => setData('parent_id', e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        <option value="">Sin ubicación padre</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botones */}
                <div className="flex space-x-4 pt-6">
                    <Link
                        href="/locations"
                        className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition-colors"
                    >
                        Volver
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg disabled:opacity-50 transition-all"
                    >
                        {processing ? (
                            <span className="animate-pulse">Guardando...</span>
                        ) : (
                            'Guardar'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
