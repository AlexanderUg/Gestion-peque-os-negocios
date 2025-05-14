import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Home() {
  const menuItems = [
    { name: 'Productos', href: '/products' },
    { name: 'Locations', href: '/locations' },
    { name: 'Bajo Stock', href: '/low-stock' },
    { name: 'Movimiento de Stock', href: '/StockMovement' },
    
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📋 Menú Principal</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            style={{
              padding: '1rem',
              backgroundColor: '#bcd1eb',
              borderRadius: '20px',
              borderColor:'#0f404f' ,
              textDecoration: 'none',
              color: '#04254d',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ddd'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#bcd1eb'}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
