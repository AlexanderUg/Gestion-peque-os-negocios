import React from 'react';
import { Link, useForm } from '@inertiajs/react';

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
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Nuevo Producto</h1>
                <Link 
                    href="/products" 
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    ← Volver
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo Nombre */}
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Producto *
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        value={data.nombre}
                        onChange={(e) => setData('nombre', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.nombre ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ej: Smartphone X10 PRO"
                    />
                    {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                </div>

                {/* Campo Descripción */}
                <div>
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        value={data.descripcion}
                        onChange={(e) => setData('descripcion', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Características principales..."
                    />
                </div>

                {/* Grupo Precio + Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Precio */}
                    <div>
                        <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
                            Precio (€) *
                        </label>
                        <input
                            id="precio"
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.precio}
                            onChange={(e) => setData('precio', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.precio ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Ej: 299.99"
                        />
                        {errors.precio && <p className="mt-1 text-sm text-red-600">{errors.precio}</p>}
                    </div>

                    {/* Stock */}
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                            Stock Inicial *
                        </label>
                        <input
                            id="stock"
                            type="number"
                            min="0"
                            value={data.stock_inicial}
                            onChange={(e) => setData('stock_inicial', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.stock_inicial ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Ej: 50"
                        />
                        {errors.stock_inicial && <p className="mt-1 text-sm text-red-600">{errors.stock_inicial}</p>}
                    </div>
                </div>

                {/* Botón de enviar */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-md disabled:opacity-50"
                    >
                        {processing ? 'Guardando...' : 'Guardar Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
}