import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function ShowProduct() {
    const { product } = usePage().props;
    
    // Formateadores
    const formatPrice = (price) => 
        new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
    
    const stockStatus = (stock) => {
        stock = stock || 0;
        if (stock === 0) return <span className="text-red-600 font-bold">Agotado</span>;
        if (stock <= 5) return <span className="text-orange-500 font-bold">Bajo stock ({stock})</span>;
        return <span className="text-green-600 font-bold">Disponible ({stock})</span>;
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header con breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li>
                        <Link href="/products" className="text-gray-600 hover:text-blue-500 transition-colors">
                            Productos
                        </Link>
                    </li>
                    <li aria-current="page">
                        <span className="text-gray-400 mx-2">/</span>
                        <span className="text-gray-800 font-medium">{product.nombre}</span>
                    </li>
                </ol>
            </nav>

            {/* Tarjeta principal */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Sección superior (imagen + datos básicos) */}
                <div className="md:flex">
                    {/* Placeholder para imagen (puedes reemplazarlo) */}
                    <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
                        <svg className="w-32 h-32 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" />
                        </svg>
                    </div>

                    {/* Detalles del producto */}
                    <div className="p-6 md:w-2/3">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.nombre}</h1>
                        
                        <div className="flex items-center mb-4">
                            <span className="text-2xl font-semibold text-blue-600 mr-4">
                                {formatPrice(product.precio)}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {stockStatus(product.stock_inicial || product.stock)}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Descripción</h3>
                            <p className="text-gray-600 whitespace-pre-line">
                                {product.descripcion || "No hay descripción disponible."}
                            </p>
                        </div>

                        {/* Metadata adicional */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 border-t pt-4">
                            <div>
                                <span className="font-medium block">ID del Producto</span>
                                <span>{product.id}</span>
                            </div>
                            <div>
                                <span className="font-medium block">Fecha de creación</span>
                                <span>{new Date(product.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <Link
                        href={`/products/${product.id}/edit`}
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                    </Link>
                    
                    <Link
                        href="/products"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Volver al listado
                    </Link>

                    {/* Botón de eliminar con confirmación */}
                    <form method="POST" action={`/products/${product.id}`} className="sm:ml-auto">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button
                            type="submit"
                            onClick={(e) => {
                                if (!confirm('¿Estás seguro de eliminar este producto?')) {
                                    e.preventDefault();
                                }
                            }}
                            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                        </button>
                    </form>
                </div>
            </div>

            {/* Sección adicional (historial, etc.) */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Adicional</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium text-gray-700 mb-2">Última actualización</h3>
                        <p className="text-gray-600">
                            {new Date(product.updated_at).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 mb-2">Código de referencia</h3>
                        <p className="text-gray-600">
                            {product.reference_code || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}