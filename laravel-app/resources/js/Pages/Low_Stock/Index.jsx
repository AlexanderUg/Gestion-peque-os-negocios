import React from 'react';
import { usePage } from '@inertiajs/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import DashboardLayout from '@/Layouts/DashboardLayout'; // Asegúrate de que la ruta sea correcta

export default function LowStockReport() {
    const { lowStockProducts } = usePage().props;

    const formatPrice = (price) =>
        new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price || 0);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="mb-8 flex items-center space-x-3">
                <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />
                <h1 className="text-2xl font-bold text-gray-800">Reporte de Productos con Stock Bajo</h1>
            </div>

            <div className="flex gap-4 mb-6">
                <a
                    href="/products/low-stock/pdf"
                    className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition-colors text-sm"
                >
                    📄 Descargar PDF
                </a>

                <a
                    href="/products/low-stock/excel"
                    className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition-colors text-sm"
                >
                    📊 Descargar Excel Próximamente....
                </a>
            </div>

            {lowStockProducts.length === 0 ? (
                <div className="bg-green-50 text-green-800 px-4 py-3 rounded-md shadow">
                    No hay productos con stock bajo.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200">
                        <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3">Nombre del Producto</th>
                                <th className="px-6 py-3">Stock Actual</th>
                                <th className="px-6 py-3">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStockProducts.map((product, index) => (
                                product && (
                                    <tr
                                        key={index}
                                        className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-gray-800 font-medium">{product.nombre}</td>
                                        <td className="px-6 py-4 text-yellow-700 font-semibold">{product.stock_inicial}</td>
                                        <td className="px-6 py-4 text-gray-700">{formatPrice(product.precio)}</td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// ✅ Aplicar el layout del dashboard
LowStockReport.layout = page => <DashboardLayout children={page} />;
