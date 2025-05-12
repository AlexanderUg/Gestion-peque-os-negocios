import React from 'react';
import { Link } from '@inertiajs/react';

export default function LocationIndex({ locations }) {
    // Función recursiva para renderizar ubicaciones
    const renderLocation = (location, level = 0) => {
        const paddingLeft = `${level * 24}px`;
        const borderColors = [
            'border-blue-200',
            'border-green-200',
            'border-yellow-200',
            'border-red-200',
            'border-purple-200'
        ];
        const borderColor = level > 0 ? `border-l-2 ${borderColors[level % borderColors.length]}` : '';

        return (
            <div 
                key={location.id}
                className={`mt-1 ${borderColor}`}
                style={{ paddingLeft }}
            >
                <div className="flex items-center justify-between bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors border">
                    <span className="font-medium">
                        {location.nombre}
                    </span>
                    
                </div>

                {location.children && location.children.length > 0 && (
                    <div className="ml-2">
                        {location.children.map(child => renderLocation(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Árbol de Ubicaciones</h1>
                <Link 
                    href="/locations/create" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nueva Ubicación
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
                {locations.length > 0 ? (
                    locations.map(location => renderLocation(location))
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        No hay ubicaciones registradas
                    </div>
                )}
            </div>
        </div>
    );
}