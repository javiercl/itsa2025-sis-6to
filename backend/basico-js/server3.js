const express = require('express');
const { MongoClient } = require('mongodb');
const port = 3000;
const app = express();


// Configuración de MongoDB Atlas
const uri = `mongodb+srv://jvrcisneros:@cluster0.1k9yb.mongodb.net/escolares?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB Atlas
async function connectDB() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB Atlas');
    } catch (err) {
        console.error( err);
    }
}

// Ruta home
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API funcionando correctamente' });
});

// Rutas para carga masiva
app.post('/alumnos', async (req, res) => {
    try {
        const { alumnos } = req.body;
        console.log(alumnos);
        const database = client.db('escolares');
        const alumnosCollection = database.collection('alumnos');
        const result = await alumnosCollection.insertMany(alumnos);
        const alms = alumnos.length;
        res.status(200).json({
            success: true,
            data: `${alms} Alumnos cargados correctamente`,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Rutas para posts
app.get('/alumnos', async (req, res) => {
    try {
        const database = client.db('escolares');
        const alumnos = database.collection('alumnos');
        const result = await alumnos.find({}).toArray();
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Iniciar el servidor y conectar a la base de datos
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error al iniciar el servidor:', err);
    process.exit(1);
});