// Obtener datos de la API
fetch('http://localhost:3000/alumnos')
.then(response => response.json())
.then(data => {
    console.log('Respuesta:', data);
    generarTabla(data.data);
})
.catch(error => console.error('Error al enviar datos:', error));


// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado');
    
    // Registrar el evento submit del formulario
    const form = document.getElementById('formId');
    if (form) {
        console.log('Formulario encontrado');
        form.addEventListener('submit', function(e) {
            console.log('Formulario enviado');
            e.preventDefault();
            handleSubmit(e);
        });
    } else {
        console.log('Formulario no encontrado');
    }

    // Registrar el evento click del botón cancelar
    const btnCancel = document.getElementById('button-cancel-id');
    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            document.getElementById("modalId").style.display = "none";
        });
    }

/*     const input = document.getElementById('fileInput');
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const xmlContent = event.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
            
            // Obtener todos los estudiantes del XML
            const estudiantes = xmlDoc.getElementsByTagName("Estudiante");
            const alumnos = [];
            
            // Convertir cada estudiante a un objeto
            for (let i = 0; i < estudiantes.length; i++) {
                const estudiante = estudiantes[i];
                alumnos.push({
                    numeroControl: estudiante.getElementsByTagName("NumeroControl")[0].textContent,
                    nombre: estudiante.getElementsByTagName("Nombre")[0].textContent,
                    curp: estudiante.getElementsByTagName("CURP")[0].textContent,
                    sexo: estudiante.getElementsByTagName("Sexo")[0].textContent,
                    semestre: estudiante.getElementsByTagName("Semestre")[0].textContent,
                    carrera: estudiante.getElementsByTagName("Carrera")[0].textContent,
                    fotografia: estudiante.getElementsByTagName("Fotografia")[0].textContent
                });
            }
            
            // Enviar datos al servidor
            fetch('http://localhost:3000/alumnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ alumnos })
            })
            .then(response => response.json())
            .then(data => {
                mostrarMensaje(data.data, 'success');
                // Recargar la tabla después de la carga
                setTimeout(() => {
                    location.reload();
                }, 1500);
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarMensaje('Error al cargar los datos', 'error');
            });
        };
        
        reader.readAsText(file);
    };     */


});

// Función para mostrar mensajes personalizados
function mostrarMensaje(mensaje, tipo = 'error') {
    const contenedor = document.getElementById('mensaje-container');
    const texto = document.getElementById('mensaje-texto');
    const mensajeContent = contenedor.querySelector('.mensaje-content');
    
    // Eliminar clases anteriores
    mensajeContent.classList.remove('mensaje-error', 'mensaje-success');
    
    // Agregar clase según el tipo
    mensajeContent.classList.add(`mensaje-${tipo}`);
    
    texto.textContent = mensaje;
    contenedor.style.display = 'flex';
    
    // Cerrar mensaje al hacer clic en el botón
    document.getElementById('mensaje-btn').onclick = () => {
        contenedor.style.display = 'none';
    };
}

function handleSubmit(e) {
    console.log('Manejando submit');
    e.preventDefault();
    
    const form = document.getElementById("formId");
    
    // Validaciones
    if (!validarNumeroControl(form.ncontrol.value)) {
        mostrarMensaje('Número de control inválido. Debe tener 8 dígitos.');
        return;
    }

    if (!validarNombre(form.nombre.value)) {
        mostrarMensaje('Nombre inválido. Solo letras, espacios y mínimo 3 caracteres.');
        return;
    }

    if (!validarCURP(form.curp.value)) {
        mostrarMensaje('CURP inválido. Debe tener 18 caracteres y formato correcto.');
        return;
    }

    // Obtener el valor del sexo seleccionado
    const sexoSeleccionado = document.querySelector('input[name="sexo"]:checked')?.value;
    if (!sexoSeleccionado) {
        mostrarMensaje('Por favor seleccione un sexo.');
        return;
    }

    if (!validarSemestre(form.semestre.value)) {
        mostrarMensaje('Semestre inválido. Debe ser un número entre 1 y 12.');
        return;
    }

    if (!validarCarrera(form.carrera.value)) {
        mostrarMensaje('Carrera inválida. Debe tener al menos 5 caracteres.');
        return;
    }

    // Crear objeto con los datos del formulario
    const alumnoData = {
        numeroControl: form.ncontrol.value,
        nombre: form.nombre.value,
        curp: form.curp.value,
        sexo: sexoSeleccionado,
        carrera: form.carrera.value,
        semestre: parseInt(form.semestre.value),
        fotografia: sexoSeleccionado === 'M' ? 'imagenes/foto-hombre.png' : 'imagenes/foto_mujer.png'
    };

    console.log('Enviando datos:', alumnoData);

    // Enviar datos al backend
    fetch('http://localhost:3000/alumno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alumnoData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.success) {
            mostrarMensaje('Alumno guardado correctamente', 'success');
            // Cerrar el modal
            document.getElementById("modalId").style.display = "none";
            // Recargar la página para mostrar los cambios
            setTimeout(() => {
                location.reload();
            }, 1500);
        } else {
            mostrarMensaje(data.error || 'Error al guardar el alumno', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al guardar el alumno', 'error');
    });
}

function modalCreate(){
    document.getElementById("modalId").style.display = "flex";
}

function handleEdit(e, id) {
    e.preventDefault();
    
    // Obtener la fila (tr) más cercana al elemento clickeado
    const fila = e.target.closest('tr');
    
    // Obtener todas las celdas (td) de la fila
    const celdas = fila.querySelectorAll('td');
    
    // Obtener los valores de cada celda
    // Nota: El índice 0 es el número de fila, el 1 es la imagen, así que empezamos desde el 2
    const ncontrol = celdas[2].textContent;  // Número de control
    const nombre = celdas[3].textContent;    // Nombre
    const curp = celdas[4].textContent;      // CURP
    const sexo = celdas[5].textContent;      // Sexo
    const carrera = celdas[6].textContent;   // Carrera
    const semestre = celdas[7].textContent;  // Semestre
    
    // Llenar el formulario con los valores obtenidos
    document.getElementById("ncontrol").value = ncontrol;
    document.getElementById("nombre").value = nombre;
    document.getElementById("curp").value = curp;
    
    // Manejar el radio button de sexo
    if (sexo === 'F') {
        document.getElementById("fem").checked = true;
        document.getElementById("mas").checked = false;
    } else if (sexo === 'M') {
        document.getElementById("mas").checked = true;
        document.getElementById("fem").checked = false;
    }
    
    // Manejar el select de carrera
    const selectCarrera = document.getElementById("carrera");
    for (let i = 0; i < selectCarrera.options.length; i++) {
        if (selectCarrera.options[i].text === carrera) {
            selectCarrera.selectedIndex = i;
            break;
        }
    }
    
    document.getElementById("semestre").value = semestre;
    
    // Mostrar el modal
    document.getElementById("modalId").style.display = "flex";
}

function handleDelete(e){
    e.preventDefault();
    let id = e.target.getAttribute("id");
    console.log(id);
    fetch(`http://localhost:3000/alumno/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        mostrarMensaje('Estudiante eliminado correctamente', 'success');
        setTimeout(() => {
            location.reload();
        }, 1500);
    })
    .catch(error => console.error('Error:', error));
}

function generarTabla(jsonData){
    // Iterar sobre cada estudiante en el array JSON
    jsonData.forEach((estudiante, i) => {
        // Get elements from JSON
        let id = estudiante._id;
        let imagen = estudiante.fotografia;
        let ncontrol = estudiante.numeroControl;
        let curp = estudiante.curp;
        let nombre = estudiante.nombre;
        let sexo = estudiante.sexo;
        let carrera = estudiante.carrera;
        let semestre = estudiante.semestre;
        
        // get element tbody
        const tbody = document.getElementById("tbody")
        // 1. Crear el nuevo elemento tr y sus td
        let nuevaFila = document.createElement("tr");

        let td_num = document.createElement("td");
        td_num.textContent = `${i+1}`;
        nuevaFila.appendChild(td_num)

        let td_imagen = document.createElement("td");
        let img_foto = document.createElement("img");
        if (sexo=='M') 
            img_foto.setAttribute("src","imagenes/foto-hombre.png");
        else 
            img_foto.setAttribute("src","imagenes/foto_mujer.png");
        img_foto.setAttribute("id","foto")
        td_imagen.appendChild(img_foto);
        nuevaFila.appendChild(td_imagen);

        let td_ncontrol = document.createElement("td");
        td_ncontrol.textContent = `${ncontrol}`;
        nuevaFila.appendChild(td_ncontrol)

        let td_nombre = document.createElement("td");
        td_nombre.textContent = `${nombre}`;
        nuevaFila.appendChild(td_nombre)

        let td_curp = document.createElement("td");
        td_curp.textContent = `${curp}`;
        nuevaFila.appendChild(td_curp)

        let td_sexo = document.createElement("td");
        td_sexo.textContent = `${sexo}`;
        nuevaFila.appendChild(td_sexo)

        let td_carrera = document.createElement("td");
        td_carrera.textContent = `${carrera}`;
        nuevaFila.appendChild(td_carrera)

        let td_semestre = document.createElement("td");
        td_semestre.textContent = `${semestre}`;
        nuevaFila.appendChild(td_semestre)

        let td_actions = document.createElement("td");
        let img_edit = document.createElement("img");
        let img_drop = document.createElement("img");
        img_edit.setAttribute("src","imagenes/boton-editar.png")
        img_edit.addEventListener("click",(e)=>handleEdit(e,id));
        img_drop.setAttribute("src","imagenes/basura.png")
        img_drop.addEventListener('click',(e)=>handleDelete(e,id));
        td_actions.appendChild(img_edit)
        td_actions.appendChild(img_drop)
        nuevaFila.appendChild(td_actions)

        // 2. Agregarlo al contenedor
        tbody.appendChild(nuevaFila);
    });
};

// Funciones de validación
function validarNumeroControl(ncontrol) {
    const regex = /^[A-Za-z0-9]{8}$/;  // Exactamente 8 caracteres alfanuméricos
    return regex.test(ncontrol);
}

function validarNombre(nombre) {
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s\.]{3,50}$/;  // Letras, espacios, puntos, acentos, 3-50 caracteres
    return regex.test(nombre);
}

function validarCURP(curp) {
/*     const regex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
    return regex.test(curp);
 */    
    return true
}

function validarSexo(sexo) {
    return ['M', 'F'].includes(sexo.toUpperCase());
}

function validarSemestre(semestre) {
    const sem = parseInt(semestre);
    return !isNaN(sem) && sem >= 1 && sem <= 12;
}

function validarCarrera(carrera) {
    return carrera.length >= 5 && carrera.length <= 50;
}

// Validación en tiempo real (opcional)
document.getElementById('formId').addEventListener('input', function(e) {
    const input = e.target;
    let isValid = true;
    let mensaje = '';

    switch(input.name) {
        case 'ncontrol':
            isValid = validarNumeroControl(input.value);
            mensaje = 'Debe tener 8 dígitos';
            break;
        case 'nombre':
            isValid = validarNombre(input.value);
            mensaje = 'Solo letras y espacios, mínimo 3 caracteres';
            break;
        case 'curp':
            isValid = validarCURP(input.value);
            mensaje = 'CURP inválido';
            break;
        case 'sexo':
            isValid = validarSexo(input.value);
            mensaje = 'Debe ser H o M';
            break;
        case 'semestre':
            isValid = validarSemestre(input.value);
            mensaje = 'Debe ser entre 1 y 12';
            break;
        case 'carrera':
            isValid = validarCarrera(input.value);
            mensaje = 'Mínimo 5 caracteres';
            break;
    }

    // Mostrar feedback visual
    input.style.borderColor = isValid ? '#ccc' : 'red';
    
    // Si tienes un elemento para mostrar mensajes de error
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.className === 'error-message') {
        errorElement.textContent = isValid ? '' : mensaje;
    }
});

// También puedes agregar efectos de animación
document.getElementById('mensaje-container').addEventListener('click', (e) => {
    if (e.target.id === 'mensaje-container') {
        e.target.style.display = 'none';
    }
});
