const express = require('express');
const port = 3000;
const app = express();

// Ejemplo de datos de posts no persistentes
let posts = [
    { id: 1, title: 'Primer post', content: 'Contenido del primer post' },
    { id: 2, title: 'Segundo post', content: 'Contenido del segundo post' }
];

// Ruta home
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API funcionando correctamente' });
});

// Rutas para posts
app.get('/api/posts', (req, res) => {
    res.status(200).json(posts);
});

// Manejo de errores básico
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal!', error: err.message });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});