import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function EditProduct({ product }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        stock_inicial: product.stock_inicial || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Editar Producto</h1>
                <Link
                    href="/products"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                    ← Volver al listado
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Nombre</label>
                    <input
                        type="text"
                        value={data.nombre}
                        onChange={(e) => setData('nombre', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>}
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Descripción</label>
                    <textarea
                        value={data.descripcion}
                        onChange={(e) => setData('descripcion', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        rows="4"
                    />
                    {errors.descripcion && <p className="text-red-600 text-sm mt-1">{errors.descripcion}</p>}
                </div>

                {/* Precio */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Precio (€)</label>
                    <input
                        type="number"
                        value={data.precio}
                        onChange={(e) => setData('precio', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        min="0"
                        step="0.01"
                    />
                    {errors.precio && <p className="text-red-600 text-sm mt-1">{errors.precio}</p>}
                </div>

                {/* Stock inicial */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Stock Inicial</label>
                    <input
                        type="number"
                        value={data.stock_inicial}
                        onChange={(e) => setData('stock_inicial', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        min="0"
                    />
                    {errors.stock_inicial && <p className="text-red-600 text-sm mt-1">{errors.stock_inicial}</p>}
                </div>

                {/* Acciones */}
                <div className="flex justify-between items-center pt-4 space-x-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                    </button>

                    <Link
                        href={`/products/${product.id}`}
                        className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}
