<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        form {
            margin-top: 20px;
        }
        label {
            font-weight: bold;
            margin-bottom: 8px;
            display: block;
        }
        input, select, button {
            margin: 10px 0;
            padding: 8px;
            width: 100%;
            max-width: 300px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
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