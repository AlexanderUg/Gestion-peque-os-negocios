<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Aqui se creara los productos</h1>

    <form action="/products" method="POST">
        @csrf
    <input type="text" placeholder="Introduce nombre" name="nombre" />
    <br><br>

    <textarea name="descripcion" id="" placeholder="Introduce una descripcion" ></textarea>
    <br><br>

    <input type="number" placeholder="Introduce un precio" name="precio" />
<br><br>

<input type="number" placeholder="Introduce un stock" name="stock_inicial"/>

<br><br>

<button type="submit">
    Insertar producto
</button>
    
    </form>

</body>
</html>