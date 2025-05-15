import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login'); // Asegúrate de que esta ruta exista en tus rutas de Laravel
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
                    Sistema de Inventario
                </h2>
                <p className="text-center text-xl font-semibold text-gray-800 mb-6">
                    Inventario App
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Usuario
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            placeholder="Ingrese su usuario"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Ingrese su contraseña"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gray-900 text-white py-2.5 rounded-md shadow hover:bg-gray-800 transition"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Use <span className="font-medium">admin/password</span> para iniciar sesión en esta demostración
                </p>
            </div>
        </div>
    );
}
