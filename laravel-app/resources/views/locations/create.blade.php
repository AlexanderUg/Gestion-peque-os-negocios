<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Ubicación</title>
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
    <h1>Crear Nueva Ubicación</h1>

    <form method="POST" action="/locations">
        @csrf
        <label for="nombre">Introduce nombre de la ubicación:</label>
        <input type="text" name="nombre" id="nombre" required />

        <label for="parent_id">Elige ubicación padre:</label>
        <select name="parent_id" id="parent_id">
            <option value="">Sin ubicación padre</option>
            @foreach($locations as $location)
                <option value="{{ $location->id }}">{{ $location->nombre }}</option>
            @endforeach
        </select>

        <button type="submit">Insertar</button>
    </form>

    <a href="/locations">
    <button>Volver al Listado de Ubicaciones</button>
</a>
</body>
</html>
