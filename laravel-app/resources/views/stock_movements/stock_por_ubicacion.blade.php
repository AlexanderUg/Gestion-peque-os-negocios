<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Stock por Ubicación</title>
</head>
<body>
    <h1>Stock por Producto y Ubicación</h1>

    <table border="1">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Ubicación</th>
                <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($stockPorUbicacion as $registro)
                <tr>
                    <td>{{ \App\Models\Product::find($registro->product_id)?->nombre ?? 'Desconocido' }}</td>
                    <td>{{ \App\Models\Location::find($registro->location_id)?->nombre ?? 'Sin ubicación' }}</td>
                    <td>{{ $registro->stock_total }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
