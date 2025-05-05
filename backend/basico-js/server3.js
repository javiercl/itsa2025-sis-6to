const express = require('express');
const { MongoClient } = require('mongodb');
const port = 3000;
const app = express();

// Mensajes de error centralizados
const ERROR_MESSAGES = {
    DATABASE_CONNECTION: 'Error al conectar con la base de datos',
    DATABASE_OPERATION: 'Error en la operación de base de datos',
    SERVER_ERROR: 'Error interno del servidor',
    NOT_FOUND: 'Recurso no encontrado',
    BAD_REQUEST: 'Solicitud inválida'
};

// Configuración de MongoDB Atlas
const uri = `mongodb+srv://user:pass@cluster0.1k9yb.mongodb.net/db_name?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

// Middleware para parsear JSON
app.use(express.json());

// Middleware para manejo centralizado de errores
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    // Determinar el tipo de error y el mensaje correspondiente
    let errorMessage = ERROR_MESSAGES.SERVER_ERROR;
    let statusCode = 500;

    if (err.name === 'MongoError') {
        errorMessage = ERROR_MESSAGES.DATABASE_OPERATION;
    } else if (err.statusCode) {
        statusCode = err.statusCode;
        errorMessage = err.message;
    }

    res.status(statusCode).json({
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

// Conectar a MongoDB Atlas
async function connectDB() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB Atlas');
    } catch (err) {
        console.error(ERROR_MESSAGES.DATABASE_CONNECTION, err);
        throw new Error(ERROR_MESSAGES.DATABASE_CONNECTION);
    }
}

// Ruta home
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API funcionando correctamente' });
});

// Rutas para posts
app.get('/api/posts', async (req, res, next) => {
    try {
        const database = client.db('blog_db');
        const posts = database.collection('posts');
        const result = await posts.find({}).toArray();
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        next(err);
    }
});

// Middleware para rutas no encontradas
app.use((req, res, next) => {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    next(error);
});

// Usar el middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor y conectar a la base de datos
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error al iniciar el servidor:', err);
    process.exit(1);
});