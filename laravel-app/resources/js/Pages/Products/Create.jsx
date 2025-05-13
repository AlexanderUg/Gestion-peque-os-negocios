import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        precio: '',
        stock_inicial: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-8">
            {/* Encabezado */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Crear Producto</h1>
                <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition">
                    <ArrowLeftIcon className="w-5 h-5 mr-1" />
                    Volver
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Datos Básicos */}
                <fieldset>
                    <legend className="text-lg font-semibold text-gray-700 mb-4">Datos Básicos</legend>
                    <div className="space-y-4">
                        {/* Nombre */}
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                Nombre del Producto <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                placeholder="Ej: Monitor LED 27” UltraHD"
                                className={`mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none focus:ring-blue-500 ${
                                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.nombre && <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>}
                        </div>

                        {/* Descripción */}
                        <div>
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                                Descripción
                            </label>
                            <textarea
                                id="descripcion"
                                rows="4"
                                value={data.descripcion}
                                onChange={(e) => setData('descripcion', e.target.value)}
                                placeholder="Ej: Pantalla sin bordes, ideal para gaming o diseño gráfico..."
                                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Precio y Stock */}
                <fieldset>
                    <legend className="text-lg font-semibold text-gray-700 mb-4">Inventario</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Precio */}
                        <div>
                            <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                                Precio (€) <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="precio"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.precio}
                                onChange={(e) => setData('precio', e.target.value)}
                                placeholder="Ej: 199.99"
                                className={`mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none focus:ring-blue-500 ${
                                    errors.precio ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.precio && <p className="text-sm text-red-600 mt-1">{errors.precio}</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <label htmlFor="stock_inicial" className="block text-sm font-medium text-gray-700">
                                Stock Inicial <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="stock_inicial"
                                type="number"
                                min="0"
                                value={data.stock_inicial}
                                onChange={(e) => setData('stock_inicial', e.target.value)}
                                placeholder="Ej: 25"
                                className={`mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none focus:ring-blue-500 ${
                                    errors.stock_inicial ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.stock_inicial && (
                                <p className="text-sm text-red-600 mt-1">{errors.stock_inicial}</p>
                            )}
                        </div>
                    </div>
                </fieldset>

                {/* Botón de envío */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition shadow disabled:opacity-50"
                    >
                        {processing && (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        )}
                        {processing ? 'Guardando...' : 'Guardar Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
}
