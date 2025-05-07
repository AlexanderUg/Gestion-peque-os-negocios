<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Producto</title>
</head>
<body>

<a href="/products">volver a productos</a>
    <h1>Productos</h1>

<p>
    <b>Nombre:</b>{{ $product->nombre }}
</p>

<p>
    <b>Descripcion:</b>{{ $product->descripcion }}
</p>

<p>
    <b>Precio:</b>{{ $product->precio }}
</p>

<p>
    <b>Stock:</b>{{ $product->stock_inicial }}
</p>

<a href="/products/{{$product->id}}/edit">Editar el Producto</a>

<br><br>
<form action="/products/{{$product->id}}" method="POST">
@csrf
@method('DELETE')

    <button type="submit">
        Eliminar producto
    </button>
</form>

</body>
</html>