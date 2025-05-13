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
                className={`mt-2 ${borderColor} transition-all duration-300`}
                style={{ paddingLeft }}
            >
                <div className="flex items-center justify-between bg-white p-4 rounded-lg hover:bg-gray-100 transition-colors border-b-2 shadow-sm hover:shadow-md">
                    <span className="font-semibold text-lg">{location.nombre}</span>

                    {/* Ver más icono si tiene hijos */}
                    {location.children && location.children.length > 0 && (
                        <span className="text-gray-500 text-sm">➕</span>
                    )}
                </div>

                {location.children && location.children.length > 0 && (
                    <div className="ml-4">
                        {location.children.map(child => renderLocation(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Árbol de Ubicaciones</h1>
                <Link 
                    href="/locations/create" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-medium">Nueva Ubicación</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                {locations.length > 0 ? (
                    locations.map(location => renderLocation(location))
                ) : (
                    <div className="text-center text-gray-500 py-12">
                        <p className="text-xl">No hay ubicaciones registradas.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
