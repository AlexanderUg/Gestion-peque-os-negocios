<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1>Movimientos de Stock</h1>

<table border="1">
    <thead>
        <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Tipo</th>
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Ubicación</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($movements as $movement)
            <tr>
                <td>{{ $movement->product->nombre }}</td>
                <td>{{ $movement->quantity }}</td>
                <td>{{ ucfirst($movement->type) }}</td>
                <td>{{ $movement->reason }}</td>
                <td>{{ $movement->date }}</td>                
                <td>{{ $movement->location ? $movement->location->nombre : 'Sin ubicación' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>

<br><br>

<a href="/StockMovement/create"><button>Registrar Nuevo Movimiento</button></a>

</body>
</html>