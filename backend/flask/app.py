from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# Configuración de MongoDB
client = MongoClient('mongodb+srv://jvrcisneros:KLyjDxJ37nvGcBQI@cluster0.1k9yb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['escolares']
alumnos = db['alumnos']

# Ruta para obtener todos los alumnos
@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello World'

# Ruta para obtener todos los alumnos
@app.route('/alumnos', methods=['GET'])
def get_alumnos():
    try:
        resultado = list(alumnos.find())
        # Convertir ObjectId a string para serialización JSON
        for alumno in resultado:
            alumno['_id'] = str(alumno['_id'])
        return jsonify({
            'success': True,
            'data': resultado
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Ruta para crear un alumno
@app.route('/alumno', methods=['POST'])
def crear_alumno():
    try:
        datos = request.json
        resultado = alumnos.insert_one(datos)
        return jsonify({
            'success': True,
            'data': {
                'message': 'Alumno creado correctamente',
                'id': str(resultado.inserted_id)
            }
        }), 201
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Ruta para actualizar un alumno
@app.route('/alumno/<id>', methods=['PUT'])
def actualizar_alumno(id):
    try:
        datos = request.json
        resultado = alumnos.update_one(
            {'_id': ObjectId(id)},
            {'$set': datos}
        )
        if resultado.matched_count == 0:
            return jsonify({
                'success': False,
                'error': 'Alumno no encontrado'
            }), 404
        return jsonify({
            'success': True,
            'data': 'Alumno actualizado correctamente'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Ruta para eliminar un alumno
@app.route('/alumno/<id>', methods=['DELETE'])
def eliminar_alumno(id):
    try:
        resultado = alumnos.delete_one({'_id': ObjectId(id)})
        if resultado.deleted_count == 0:
            return jsonify({
                'success': False,
                'error': 'Alumno no encontrado'
            }), 404
        return jsonify({
            'success': True,
            'data': 'Alumno eliminado correctamente'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Ruta para obtener un alumno específico
@app.route('/alumno/<id>', methods=['GET'])
def get_alumno(id):
    try:
        alumno = alumnos.find_one({'_id': ObjectId(id)})
        if not alumno:
            return jsonify({
                'success': False,
                'error': 'Alumno no encontrado'
            }), 404
        alumno['_id'] = str(alumno['_id'])
        return jsonify({
            'success': True,
            'data': alumno
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=3050) 