<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Aqui se editara los productos</h1>

    <form action="/products/{{$product->id}}" method="POST">
        @csrf
        @method('PUT')
    <input type="text" placeholder="Introduce nombre" name="nombre" value="{{$product->nombre}}"  />
    <br><br>

    <textarea id="" placeholder="Introduce una descripcion" name="descripcion">{{$product->descripcion}}</textarea>
    <br><br>

    <input type="number" placeholder="Introduce un precio" name="precio" value="{{$product->precio}}"/>
<br><br>

<input type="number" placeholder="Introduce un stock" name="stock_inicial" value="{{$product->stock_inicial}}"/>

<br><br>

<button type="submit">
    Actualizar producto
</button>
    
    </form>
</body>
</html>