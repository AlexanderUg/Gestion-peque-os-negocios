<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <h1>Registrar Movimiento de Stock</h1>

<form method="POST" action="/StockMovement">
    @csrf
    <label for="product_id">Producto:</label>
    <select name="product_id" id="product_id">
        @foreach ($products as $product)
            <option value="{{ $product->id }}">{{ $product->nombre }}</option>
        @endforeach
    </select>

    <br><br>

    <label for="quantity">Cantidad:</label>
    <input type="number" name="quantity" id="quantity" required>

    <br><br>
    
Ubicación:
<select name="location_id">
    <option value="">Sin ubicación</option>
    @foreach($locations as $location)
        <option value="{{ $location->id }}">{{ $location->nombre }}</option>
    @endforeach
</select>

    <br><br>

    <label for="type">Tipo:</label>
    <select name="type" id="type">
        <option value="entrada">Entrada</option>
        <option value="salida">Salida</option>
    </select>

    <br><br>

    <label for="reason">Motivo:</label>
    <input type="text" name="reason" id="reason" required>

    <br><br>

    <button type="submit">Registrar Movimiento</button>
</form>

<br><br>
    <a href="/StockMovement"><button>Volder a movimiento</button></a>
</body>
</html>