<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Localizar</title>
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

<h2>Ubicaciones</h2>

<a href=/locations/create>
    <button>Crear Nueva Ubicación</button>
</a>

<ul>
    @foreach ($locations as $location)
        <li>    {{ $location->nombre }}

        @if ($location->children->count())
            <ul>
                @foreach ($location->children as $child)
                    <li>{{ $child->nombre }}</li>
                @endforeach
            </ul>
        @endif
        </li>
    @endforeach
</ul>


</body>

</html>