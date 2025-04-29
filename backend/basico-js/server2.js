// Backend simple con Node.js sin Express
// Importar el módulo nativo http
const http = require('http');

// Crear el servidor
const server = http.createServer((req, res) => {
  // Configurar el encabezado de la respuesta
  res.setHeader('Content-Type', 'application/json');

  // Rutas simples
  if (req.method === 'GET' && req.url === '/') {
    console.log(req);
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Bienvenido al backend básico en Node.js' }));
  } 
  else if (req.method === 'GET' && req.url === '/usuarios') {
    res.statusCode = 200;
    res.end(JSON.stringify([{ id: 1, nombre: 'Javier' }, { id: 2, nombre: 'Lucía' }]));
  } 
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

// El servidor escucha en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
