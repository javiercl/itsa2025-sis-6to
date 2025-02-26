document.getElementById("archivoXML").addEventListener("change", function(event) {
    let archivo = event.target.files[0];
    if (!archivo) return;

    let lector = new FileReader();
    lector.onload = function(e) {
        let parser = new DOMParser();
        let xml = parser.parseFromString(e.target.result, "text/xml");
        let elementos = xml.getElementsByTagName("dato");

        let datos = [];
        for (let i = 0; i < elementos.length; i++) {
            let etiqueta = elementos[i].getElementsByTagName("etiqueta")[0].textContent;
            let valor = parseInt(elementos[i].getElementsByTagName("valor")[0].textContent);
            datos.push({ etiqueta, valor });
        }

        // Llamar a la función para graficar
        dibujarGrafico(datos);
    };

    lector.readAsText(archivo);
});

function dibujarGrafico(datos) {
    let canvas = document.getElementById("miCanvas");
    let ctx = canvas.getContext("2d");

    // Limpiar canvas antes de graficar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Definir dimensiones y márgenes
    let margenIzquierdo = 50;
    let margenInferior = 350;
    let anchoCanvas = canvas.width - margenIzquierdo - 30;
    let altoCanvas = margenInferior - 50;
    let maxValor = Math.max(...datos.map(d => d.valor));
    let escala = altoCanvas / maxValor;  // Factor de escala para los valores

    // Dibujar título
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Ventas por Mes", canvas.width / 2, 30);

    // Dibujar líneas horizontales cada 10 unidades
    ctx.strokeStyle = "#ccc"; // Color de las líneas de referencia
    ctx.lineWidth = 1;
    let paso = 10;
    for (let i = 0; i <= maxValor; i += paso) {
        let y = margenInferior - i * escala;
        ctx.beginPath();
        ctx.moveTo(margenIzquierdo, y);
        ctx.lineTo(margenIzquierdo + anchoCanvas, y);
        ctx.stroke();

        // Etiqueta del eje Y
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(i, margenIzquierdo - 10, y + 4);
    }

    // Dibujar ejes
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margenIzquierdo, 50);
    ctx.lineTo(margenIzquierdo, margenInferior);
    ctx.lineTo(margenIzquierdo + anchoCanvas, margenInferior);
    ctx.stroke();

    // Dibujar barras
    let x = margenIzquierdo + 20;
    let anchoBarra = 40;
    let colores = ["red", "blue", "green", "orange", "purple", "cyan"];

    ctx.textAlign = "center";
    ctx.font = "14px Arial";
    datos.forEach((dato, i) => {
        let alturaBarra = dato.valor * escala;
        
        ctx.fillStyle = colores[i % colores.length]; // Colores alternados
        ctx.fillRect(x, margenInferior - alturaBarra, anchoBarra, alturaBarra);

        // Mostrar valores sobre la barra
        ctx.fillStyle = "black";
        ctx.fillText(dato.valor, x + anchoBarra / 2, margenInferior - alturaBarra - 5);

        // Mostrar etiquetas debajo de la barra
        ctx.fillText(dato.etiqueta, x + anchoBarra / 2, margenInferior + 20);

        x += anchoBarra + 20; // Espaciado entre barras
    });
}