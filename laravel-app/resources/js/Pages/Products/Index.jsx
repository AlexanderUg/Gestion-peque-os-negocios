import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function ProductIndex() {
    const { products } = usePage().props;

    // Función para formatear el precio
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header con título y botón */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
                <Link 
                    href="/products/create" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-colors duration-200"
                >
                    + Nuevo Producto
                </Link>
            </div>

            {/* Tabla de productos */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products && products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {product.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatPrice(product.precio)}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                                            (product.stock_inicial || product.stock) <= 5 
                                                ? 'text-red-600 font-bold' 
                                                : 'text-gray-500'
                                        }`}>
                                            {product.stock_inicial || product.stock} unidades
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                            <Link 
                                                href={`/products/${product.id}/edit`} 
                                                className="text-indigo-600 hover:text-indigo-900 hover:underline"
                                            >
                                                Editar
                                            </Link>
                                            <Link 
                                                href={`/products/${product.id}`} 
                                                className="text-green-600 hover:text-green-900 hover:underline"
                                            >
                                                Detalles
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No hay productos registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Feedback visual para stock bajo */}
            <div className="mt-4 text-sm text-red-600">
                * Los productos con stock ≤ 5 unidades se muestran en rojo
            </div>
        </div>
    );
}