<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>Productos</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
    <style>
        body{
            background-color: #f2f4f5;
            
        }

    </style>
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
