// Obtener referencias a elementos del DOM
const btnCamara = document.getElementById('btnCamara');
const video = document.getElementById('video');
const grabacion = document.getElementById('grabacion');
const btnIniciarGrabacion = document.getElementById('btnGrabar');
const descargar = document.getElementById('descargar');

let mediaRecorder;
let chunks = [];

// Habilitar Cámara inmediatamente al cargar la página
btnGrabar.disabled = true;
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        video.srcObject = stream;
        btnGrabar.disabled = false;

        // Inicializar MediaRecorder
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const videoBlob = new Blob(chunks, { type: 'video/mp4' });
            chunks = [];

            const videoURL = URL.createObjectURL(videoBlob);
            grabacion.src = videoURL;

            // Crear enlace para descarga
            descargar.href = videoURL;
            descargar.download = 'video_grabado.mp4';
            descargar.style.display = 'inline-block';
        };
    })
    .catch(error => {
        alert('No se pudo acceder a la cámara. Verifica permisos.');
        console.error('Error al acceder a la cámara:', error);
    });

// Eventos para iniciar/detener grabación
btnGrabar.addEventListener('click', () => {
    if (btnGrabar.textContent === '🎬 Iniciar Grabación') {
        mediaRecorder.start();
        btnGrabar.textContent = '⏹️ Detener Grabación';
        descargar.style.display = 'none';
    } else {
        mediaRecorder.stop();
        btnGrabar.textContent = '🎬 Iniciar Grabación';
    }
});

// Configurar MediaRecorder después de activar la cámara
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        video.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const videoBlob = new Blob(chunks, { type: 'video/mp4' });
            chunks = [];
            const videoURL = URL.createObjectURL(videoBlob);
            grabacion.src = videoURL;

            descargar.href = videoURL;
            descargar.download = 'video_grabado.mp4';
            descargar.style.display = 'inline-block';
        };

        btnGrabar.disabled = false;
    }).catch(error => {
    alert('Debes permitir el acceso a cámara y micrófono.');
    console.error('Error:', error);
});
