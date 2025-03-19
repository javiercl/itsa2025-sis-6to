const canvas = document.getElementById('juego');
const ctx = canvas.getContext('2d');
const puntosDisplay = document.getElementById('puntos');

// Variables globales
let puntos = 0;
const circulo = { x: 0, y: 0, radio: 20 };
const tiempoIntervalo = 1000; // 2 segundos
let timer;

// Genera una posición aleatoria para el círculo
function posicionAleatoria() {
    circulo.x = Math.random() * (canvas.width - 40) + 20;
    circulo.y = Math.random() * (canvas.height - 40) + 20;
}

// Dibuja el círculo
function dibujarCirculo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(circulo.x, circulo.y, circulo.radio, 0, Math.PI * 2);
    ctx.fillStyle = '#3498db';
    ctx.fill();
    ctx.closePath();
}

// Inicia el juego y establece un intervalo
function iniciarJuego() {
    clearInterval(timer);
    posicionAleatoria();
    dibujarCirculo();

    timer = setInterval(() => {
        puntos--;
        puntosDisplay.textContent = `Puntaje: ${puntos}`;
        posicionAleatoria();
        dibujarCirculo();
    }, tiempoIntervalo);
}

// Manejo del click en el canvas
canvas.addEventListener('click', (evento) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = evento.clientX - rect.left;
    const clickY = evento.clientY - rect.top;

    const distancia = Math.sqrt((circulo.x - clickX) ** 2 + (circulo.y - clickY) ** 2);

    if (distancia <= circulo.radio) {
        puntos++;
        puntosDisplay.textContent = `Puntaje: ${puntos}`;
        iniciarJuego(); // reinicia temporizador al acertar
    }
});

// Inicia el juego por primera vez
iniciarJuego();
