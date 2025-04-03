

document.getElementById('formId').addEventListener('submit', handelLoginSubmit)


const xmlstr = (localStorage.getItem("xmlfile")) ? localStorage.getItem("xmlfile") : "";
if (xmlstr) {
    generarTabla(xmlstr);
}

function handelLoginSubmit(e){
    e.preventDefault(); 
    if (xmlstr) {
        const form = document.getElementById("formId");
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlstr, "application/xml");
        estudiantes = xmlDoc.getElementsByTagName("Estudiantes")
        estudiante = xmlDoc.createElement("Estudiante")

        // Crear en nodo Estudiate
        ncontrol =  xmlDoc.createElement("NumeroControl")
        ncontrol.textContent = form.ncontrol.value
        nombre =  xmlDoc.createElement("Nombre")
        nombre.textContent = form.nombre.value
        curp =  xmlDoc.createElement("CURP")
        curp.textContent = form.curp.value
        sexo =  xmlDoc.createElement("Sexo")
        sexo.textContent = form.sexo.value
        semestre =  xmlDoc.createElement("Semestre")
        semestre.textContent = form.semestre.value
        carrera =  xmlDoc.createElement("Carrera")
        carrera.textContent = form.carrera.value
        estudiante.appendChild(ncontrol)
        estudiante.appendChild(nombre)
        estudiante.appendChild(curp)
        estudiante.appendChild(sexo)
        estudiante.appendChild(semestre)
        estudiante.appendChild(carrera)

        estudiantes.appendChild(estudiante)

        const serializer = new XMLSerializer();
        const xmlString = serializer.serializeToString(xmlDoc);
        localStorage.setItem("xmlfile",JSON.stringify(xmlDoc))

        location.reload()
    } else {
        alert('Favor de importar el archivo xml')
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
        localStorage.setItem("xmlfile",xmlText)
        // Convertir el texto en un objeto XML  
        generarTabla(xmlText)
    }

    reader.readAsText(file); // Leer el archivo como texto
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
