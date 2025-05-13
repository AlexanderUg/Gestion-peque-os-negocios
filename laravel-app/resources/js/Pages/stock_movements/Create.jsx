import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function StockMovementCreate({ products, locations }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        quantity: '',
        location_id: '',
        type: 'entrada',
        reason: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/StockMovement');
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Registrar Movimiento de Stock</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Producto */}
                <div>
                    <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Producto:</label>
                    <select
                        id="product_id"
                        value={data.product_id}
                        onChange={(e) => setData('product_id', e.target.value)}
                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">-- Selecciona un producto --</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.product_id && <p className="text-sm text-red-500">{errors.product_id}</p>}
                </div>

                {/* Cantidad */}
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={data.quantity}
                        onChange={(e) => setData('quantity', e.target.value)}
                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 10"
                        required
                    />
                    {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
                </div>

                {/* Ubicación */}
                <div>
                    <label htmlFor="location_id" className="block text-sm font-medium text-gray-700">Ubicación:</label>
                    <select
                        id="location_id"
                        value={data.location_id}
                        onChange={(e) => setData('location_id', e.target.value)}
                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">-- Sin ubicación --</option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.location_id && <p className="text-sm text-red-500">{errors.location_id}</p>}
                </div>

                {/* Tipo */}
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Movimiento:</label>
                    <select
                        id="type"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="entrada">Entrada</option>
                        <option value="salida">Salida</option>
                    </select>
                    {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                </div>

                {/* Motivo */}
                <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Motivo:</label>
                    <input
                        type="text"
                        id="reason"
                        value={data.reason}
                        onChange={(e) => setData('reason', e.target.value)}
                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: ajuste de inventario"
                        required
                    />
                    {errors.reason && <p className="text-sm text-red-500">{errors.reason}</p>}
                </div>

                {/* Acciones */}
                <div className="flex justify-between items-center pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow disabled:opacity-50"
                    >
                        {processing ? 'Guardando...' : 'Registrar'}
                    </button>
                    <Link
                        href="/StockMovement"
                        className="text-gray-600 hover:underline"
                    >
                        ← Volver al listado
                    </Link>
                </div>
            </form>
        </div>
    );
}
