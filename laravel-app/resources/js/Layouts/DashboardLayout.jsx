// resources/js/Layouts/DashboardLayout.jsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
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

export default function DashboardLayout({ children }) {
  const { url } = usePage();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Panel lateral */}
      <aside className="w-64 bg-blue-100 border-r border-blue-200 p-6 shadow-md">
        <h1 className="text-2xl font-bold text-blue-900 mb-8">📦 Panel</h1>
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
                url.startsWith(item.href)
                  ? 'bg-blue-200 text-blue-900'
                  : 'bg-white hover:bg-blue-200 text-blue-800'
              } transition`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Contenido dinámico */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
