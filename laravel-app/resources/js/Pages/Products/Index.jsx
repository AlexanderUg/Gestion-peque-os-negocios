import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PencilSquareIcon, EyeIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import DashboardLayout from '@/Layouts/DashboardLayout';

// Formatear precio
const Price = ({ value }) => (
  <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)}</span>
);

export default function Index() {
  const { products } = usePage().props;
  const [search, setSearch] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const filteredProducts = products
    .filter(product =>
      product.nombre.toLowerCase().includes(search.toLowerCase())
    )
    .filter(product =>
      showLowStockOnly ? (product.stock_inicial ?? product.stock) <= 5 : true
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-800 mb-1">Gestión de Productos</h1>
          <p className="text-gray-500 text-sm">Visualiza, busca y administra tu inventario.</p>
        </div>
        <Link
          href="/products/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nuevo Producto
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="inline-flex items-center space-x-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showLowStockOnly}
            onChange={e => setShowLowStockOnly(e.target.checked)}
            className="form-checkbox text-blue-600"
          />
          <span>Mostrar solo productos con poco stock</span>
        </label>
      </div>

      {/* Tabla */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                  const stock = product.stock_inicial ?? product.stock;
                  const isLow = stock <= 5;

                  return (
                    <tr
                      key={product.id}
                      className={clsx(
                        'transition-all duration-200 hover:bg-gray-50',
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      )}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {product.nombre}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <Price value={product.precio} />
                      </td>
                      <td
                        className={clsx(
                          'px-6 py-4 text-sm font-semibold',
                          isLow ? 'text-red-600' : 'text-gray-700'
                        )}
                      >
                        {stock} unidades
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-4 items-center">
                        <Link
                          href={`/products/${product.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                          Editar
                        </Link>
                        <Link
                          href={`/products/${product.id}`}
                          className="text-green-600 hover:text-green-800 inline-flex items-center gap-1"
                        >
                          <EyeIcon className="w-4 h-4" />
                          Detalles
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-6 text-center text-sm text-gray-500">
                    No hay productos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nota */}
      <p className="text-sm text-red-500 italic">
        * Los productos con stock igual o menor a 5 se muestran en rojo.
      </p>
    </div>
  );
}

// Usar layout general del dashboard
Index.layout = page => <DashboardLayout children={page} />;
