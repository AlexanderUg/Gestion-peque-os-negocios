<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>
<style>
     body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        ul {
            list-style-type: none;
            padding-left: 20px;
        }
        li {
            margin: 5px 0;
        }
        li > ul {
            margin-top: 5px;
        }
      button {
            background-color:rgb(106, 125, 238);
            color: white;
            border: none;
            cursor: pointer;
            margin: 10px 0;
            padding: 8px;
            width: 100%;
            max-width: 100px;
        }
        button:hover {
            background-color:rgb(69, 78, 160);
        }
</style>
    
</head>
<body>

<header>
<h1>Aqui se muestra mi indice de productos
</h1>
 </header>

<a href="/products/create"><button>
Nuevo producto
</button></a>


 <ul>
    @foreach ($product as $product)
        <li>
            <a href="/products/{{$product->id}}">
                {{ $product->nombre }}
            </a>
        </li>
    @endforeach
</ul>



    <footer>

    </footer>
    </form>
</body>
</html>