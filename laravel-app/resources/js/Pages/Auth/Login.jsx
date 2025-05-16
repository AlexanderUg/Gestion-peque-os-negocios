import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("🤔Por favor, completa todos los campos");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (email === "alex@ejemplo.com" && password === "password") {
       alert("😉 ¡Inicio de sesión exitoso!");
        router.visit("/");
      } else {
        alert(" 🫨Credenciales incorrectas. Use alex@ejemplo.com / password");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-center text-2xl font-bold mb-4">Sistema de Inventario 📦</h2>
        <p className="text-center mb-6 text-gray-600">Inicia sesión para acceder a tu cuenta</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="block mb-1 font-medium">Email 📧 </label>
          <input
            id="email"
            type="email"
            placeholder="alex@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded"
          />

          <label htmlFor="password" className="block mb-1 font-medium">Contraseña 🔐</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-3 py-2 border rounded"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-700"
          >
            {isLoading ? "Iniciando sesión...🤯" : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700 text-sm">
          Demo: alex@ejemplo.com / password
        </p>
      </div>
    </div>
  );
};


export default Login;
