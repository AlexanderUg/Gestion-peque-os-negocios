import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout'; // Asegúrate de que esta ruta sea correcta

export default function StockMovementIndex({ movements }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg"
        >
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-indigo-700">📦 Movimientos de Stock</h1>
                <Link
                    href="/StockMovement/create"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow transition-all duration-300"
                >
                    + Registrar Movimiento
                </Link>
            </div>

            <div className="overflow-x-auto border rounded-lg shadow-inner">
                <table className="min-w-full text-sm text-left table-auto">
                    <thead className="bg-indigo-100 text-indigo-800 font-semibold">
                        <tr>
                            <th className="px-4 py-3">Producto</th>
                            <th className="px-4 py-3">Cantidad</th>
                            <th className="px-4 py-3">Tipo</th>
                            <th className="px-4 py-3">Motivo</th>
                            <th className="px-4 py-3">Fecha</th>
                            <th className="px-4 py-3">Ubicación</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {movements.map((movement) => (
                            <motion.tr
                                key={movement.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="hover:bg-indigo-50 transition"
                            >
                                <td className="px-4 py-3">{movement.product?.nombre ?? 'N/A'}</td>
                                <td className="px-4 py-3">{movement.quantity}</td>
                                <td className="px-4 py-3 capitalize text-indigo-600 font-medium">
                                    {movement.type}
                                </td>
                                <td className="px-4 py-3">{movement.reason}</td>
                                <td className="px-4 py-3">{movement.date}</td>
                                <td className="px-4 py-3">
                                    {movement.location?.nombre ?? 'Sin ubicación'}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

// ✅ Aplicar el layout del dashboard
StockMovementIndex.layout = page => <DashboardLayout children={page} />;
