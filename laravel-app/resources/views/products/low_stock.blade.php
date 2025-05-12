<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos con Stock Bajo</title>
</head>
<body>
    <h1>Reporte de Productos con Stock Bajo</h1>

    @if ($lowStockProducts->isEmpty())
        <p>No hay productos con stock bajo.</p>
    @else
        <table border="1">
            <thead>
                <tr>
                    <th>Nombre del Producto</th>
                    <th>Stock Actual</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($lowStockProducts as $product)
                    @if ($product) <!-- Verificamos que el producto no sea null -->
                        <tr>
                            <td>{{ $product->nombre }}</td>
                            <td>{{ $product->stock }}</td>
                            <td>{{ $product->precio }}</td>
                        </tr>
                    @endif
                @endforeach
            </tbody>
        </table>
    @endif
</body>
</html>
