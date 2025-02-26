// 🔹 Asegurar que el modal esté oculto al inicio
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("modalError").style.display = "none";
})

function mostrarError(mensaje) {
    document.getElementById("modalMessage").textContent = mensaje;
    document.getElementById("modalError").style.display = "flex"; // Mostrar modal
}

function cerrarError() {
    document.getElementById("modalError").style.display = "none"; // Ocultar modal
}