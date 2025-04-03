const xmlstr = (localStorage.getItem("xmlfile")) ? localStorage.getItem("xmlfile") : `<?xml version='1.0' encoding='utf-8'?><Estudiantes></Estudiantes>`;
if (xmlstr) {
    generarTabla(xmlstr);
}

document.getElementById('formId').addEventListener('submit', handelLoginSubmit)

document.getElementById('button-cancel-id').addEventListener('click', ()=> {
    document.getElementById("modalId").style.display = "none";
})

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

function handelLoginSubmit(e){
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

    if (!validarSexo(form.sexo.value)) {
        mostrarMensaje('Sexo inválido. Debe ser "H" o "M".');
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

    if (xmlstr) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlstr, "application/xml");
        const estudiante = xmlDoc.createElement("Estudiante");

        // Crear el nodo Estudiante
        ncontrol = xmlDoc.createElement("NumeroControl");
        ncontrol.textContent = form.ncontrol.value;
        nombre = xmlDoc.createElement("Nombre");
        nombre.textContent = form.nombre.value;
        curp = xmlDoc.createElement("CURP");
        curp.textContent = form.curp.value;
        sexo = xmlDoc.createElement("Sexo");
        sexo.textContent = form.sexo.value;
        semestre = xmlDoc.createElement("Semestre");
        semestre.textContent = form.semestre.value;
        carrera = xmlDoc.createElement("Carrera");
        carrera.textContent = form.carrera.value;
        foto = xmlDoc.createElement("Fotografia");
        foto.textContent = "https://example.com/fotos/A2209024.jpg";

        estudiante.appendChild(ncontrol);
        estudiante.appendChild(nombre);
        estudiante.appendChild(curp);
        estudiante.appendChild(sexo);
        estudiante.appendChild(semestre);
        estudiante.appendChild(carrera);
        estudiante.appendChild(foto);

        // Obtener el elemento raíz existente o crear uno nuevo
        let estudiantesElement = xmlDoc.getElementsByTagName("Estudiantes")[0];
        if (!estudiantesElement) {
            estudiantesElement = xmlDoc.createElement("Estudiantes");
            xmlDoc.appendChild(estudiantesElement);
        }

        // Agregar el nuevo estudiante
        estudiantesElement.appendChild(estudiante);

        // Guardar en localStorage manteniendo la estructura existente
        const serializer = new XMLSerializer();
        const xmlString = serializer.serializeToString(xmlDoc);
        localStorage.setItem("xmlfile", xmlString);

        // Mostrar mensaje y recargar
        mostrarMensaje('Estudiante agregado correctamente', 'success');
        setTimeout(() => {
            location.reload();
        }, 1500);
    } else {
        mostrarMensaje('Favor de importar el archivo xml');
    }
}

function modalCreate(){
    document.getElementById("modalId").style.display = "flex";
}

document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0]; 
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        const xmlText = e.target.result;
        
        // Validar que el XML tenga la estructura correcta
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        
        if (xmlDoc.getElementsByTagName("Estudiantes").length > 0) {
            localStorage.setItem("xmlfile", xmlText);
            setTimeout(() => {
                generarTabla(xmlText);
            }, 1500);
            mostrarMensaje('Archivo XML cargado correctamente', 'success');
        } else {
            mostrarMensaje('El archivo XML no tiene el formato correcto');
        }
    }

    reader.readAsText(file);
});

function generarTabla(xmlText){

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // Obtener nodos del XML (ejemplo: todos los <Estudiante>)
    const estudiantes = xmlDoc.getElementsByTagName("Estudiante");

    for (let i = 0; i < estudiantes.length; i++) {
        // Get elements of xml file
        let imagen = estudiantes[i].getElementsByTagName("Fotografia")[0].textContent;
        let ncontrol = estudiantes[i].getElementsByTagName("NumeroControl")[0].textContent;
        let curp = estudiantes[i].getElementsByTagName("CURP")[0].textContent;
        let nombre = estudiantes[i].getElementsByTagName("Nombre")[0].textContent;
        let sexo = estudiantes[i].getElementsByTagName("Sexo")[0].textContent;
        let carrera = estudiantes[i].getElementsByTagName("Carrera")[0].textContent;
        let semestre = estudiantes[i].getElementsByTagName("Semestre")[0].textContent;
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
        let img_add = document.createElement("img");
        img_edit.setAttribute("src","imagenes/boton-editar.png")
        img_drop.setAttribute("src","imagenes/basura.png")
        img_add.setAttribute("src","imagenes/crear-documento.png")
        td_actions.appendChild(img_edit)
        td_actions.appendChild(img_drop)
        
        nuevaFila.appendChild(td_actions)

        // 2. Agregarlo al contenedor
        tbody.appendChild(nuevaFila);
    }
};


// Boton Editar
document.querySelectorAll(".btnEdit").forEach(boton => {
    boton.addEventListener("click", function(event) {
        let fila = event.target.closest("tr"); // Encuentra el <tr> más cercano
        let columnas = fila.querySelectorAll("td"); // Obtiene todas las <td>
        let ncontrol = columnas[1].textContent;
        window.location.href = `form.html?action='edit'&ncontrol=${ncontrol}`;
       
    });
});

// Boton Eliminar
document.querySelectorAll(".btnDel").forEach(boton => {
    boton.addEventListener("click", function(event) {
        let fila = event.target.closest("tr"); // Encuentra el <tr> más cercano
        let columnas = fila.querySelectorAll("td"); // Obtiene todas las <td>
        let ncontrol = columnas[1].textContent;
        window.location.href = `form.html?action='delete'&ncontrol=${ncontrol}`;
    });
});

// Funciones de validación
function validarNumeroControl(ncontrol) {
    const regex = /^\d{8}$/;  // Exactamente 8 dígitos
    return regex.test(ncontrol);
}

function validarNombre(nombre) {
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{3,50}$/;  // Letras, espacios, acentos, 3-50 caracteres
    return regex.test(nombre);
}

function validarCURP(curp) {
    const regex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
    return regex.test(curp);
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
