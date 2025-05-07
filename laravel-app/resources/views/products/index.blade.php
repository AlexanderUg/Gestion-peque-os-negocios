<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>
</head>
<body>

<header>
<h1>Aqui se muestra mi indice</h1>
 </header>

<a href="/products/create">Nuevo post</a>


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