import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ShowProduct() {
    const { product } = usePage().props;

    // Formateadores
    const formatPrice = (price) =>
        new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

    const formatDateTime = (date) =>
        new Date(date).toLocaleString('es-ES');

    const stockStatus = (stock) => {
        if (stock === 0) return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Agotado</span>;
        if (stock <= 5) return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Bajo stock ({stock})</span>;
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Disponible ({stock})</span>;
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 space-x-2">
                <Link href="/products" className="text-blue-600 hover:underline flex items-center">
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Volver a productos
                </Link>
                <span>/</span>
                <span className="text-gray-700 font-medium">{product.nombre}</span>
            </div>

            {/* Tarjeta de Producto */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    {/* Imagen */}
                    <div className="bg-gray-100 md:w-1/3 flex items-center justify-center p-6">
                        <svg className="w-28 h-28 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" />
                        </svg>
                    </div>

                    {/* Detalles */}
                    <div className="p-6 md:w-2/3 space-y-4">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold text-gray-800">{product.nombre}</h1>
                            <div className="text-xl font-semibold text-blue-600">
                                {formatPrice(product.precio)}
                            </div>
                        </div>

                        {stockStatus(product.stock_inicial || product.stock)}

                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 uppercase">Descripción</h3>
                            <p className="text-gray-700 whitespace-pre-line">
                                {product.descripcion || 'No hay descripción disponible.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 border-t pt-4">
                            <div>
                                <span className="font-medium">ID del producto:</span>
                                <div>{product.id}</div>
                            </div>
                            <div>
                                <span className="font-medium">Creado el:</span>
                                <div>{formatDate(product.created_at)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 border-t">
                    <Link
                        href={`/products/${product.id}/edit`}
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                        <PencilSquareIcon className="w-5 h-5 mr-2" />
                        Editar
                    </Link>

                    <form method="POST" action={`/products/${product.id}`} onSubmit={(e) => {
                        if (!confirm('¿Estás seguro de eliminar este producto?')) {
                            e.preventDefault();
                        }
                    }}>
                        <input type="hidden" name="_method" value="DELETE" />
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md focus:outline-none"
                        >
                            <TrashIcon className="w-5 h-5 mr-2" />
                            Eliminar
                        </button>
                    </form>
                </div>
            </div>

            {/* Información adicional */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Información adicional</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                        <h3 className="font-medium text-gray-600 mb-1">Última actualización</h3>
                        <p>{formatDateTime(product.updated_at)}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-600 mb-1">Código de referencia</h3>
                        <p>{product.reference_code || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
