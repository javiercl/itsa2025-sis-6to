document.getElementById("browserInfo").textContent = `
User Agent: ${navigator.userAgent}
Idioma: ${navigator.language}
En línea: ${navigator.onLine ? "Sí" : "No"}`;

document.getElementById("screenInfo").textContent = `
Ancho de pantalla: ${screen.width}px
Alto de pantalla: ${screen.height}px
Profundidad de color: ${screen.colorDepth}-bit`;

document.getElementById("locationInfo").textContent = `
URL actual: ${window.location.href}
Dominio: ${window.location.hostname}
Ruta: ${window.location.pathname}`;

document.getElementById("historyInfo").textContent = `
Historial de navegación disponible: ${window.history.length} páginas`;

document.getElementById("connectivityInfo").textContent = `
Conexión: ${navigator.connection ? navigator.connection.effectiveType : "No disponible"}`;

if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
        document.getElementById("batteryInfo").textContent = ` Nivel de batería: ${Math.round(battery.level * 100)}%Cargando: ${battery.charging ? "Sí" : "No"}`;
    });
} else {
    document.getElementById("batteryInfo").textContent = "No compatible con este navegador.";
}

function obtenerGeolocalizacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                document.getElementById("geoInfo").textContent = `Latitud: ${position.coords.latitude} Longitud: ${position.coords.longitude}`;
            },
            error => {
                document.getElementById("geoInfo").textContent = "Error al obtener la ubicación: " + error.message;
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        document.getElementById("geoInfo").textContent = "Geolocalización no soportada en este navegador.";
    }
}

obtenerGeolocalizacion();