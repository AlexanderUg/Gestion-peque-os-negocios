import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Boxes,
  MapPin,
  AlertTriangle,
  Repeat,
} from 'lucide-react';

const menuItems = [
  { name: 'Productos', href: '/products', icon: <Boxes className="w-5 h-5" /> },
  { name: 'Ubicaciones', href: '/locations', icon: <MapPin className="w-5 h-5" /> },
  { name: 'Bajo Stock', href: '/low-stock', icon: <AlertTriangle className="w-5 h-5" /> },
  { name: 'Movimientos de Stock', href: '/StockMovement', icon: <Repeat className="w-5 h-5" /> },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* Panel lateral */}
      <aside className="w-64 bg-blue-100 border-r border-blue-200 p-6 shadow-md">
        <h1 className="text-2xl font-bold text-blue-900 mb-8">📦 Panel Principal</h1>
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white text-blue-800 hover:bg-blue-200 transition"
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Área principal */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-4">Bienvenido 👋</h1>
        <h2>Bienvenido al sistema de gestión de inventario.</h2>
        <p className="text-gray-600">Selecciona una sección de el menú para comenzar.</p>
      </main>
    </div>
  );
}
