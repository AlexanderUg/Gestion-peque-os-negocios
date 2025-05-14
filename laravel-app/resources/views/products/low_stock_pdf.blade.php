<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>
    <h2>Reporte de Productos con Stock Bajo</h2>
    <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Stock</th>
                <th>Precio (€)</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($lowStockProducts as $product)
                <tr>
                    <td>{{ $product->nombre }}</td>
                    <td>{{ $product->stock_inicial }}</td>
                    <td>{{ number_format($product->precio, 2, ',', '.') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
