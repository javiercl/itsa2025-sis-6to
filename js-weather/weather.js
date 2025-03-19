// Reemplaza 'TU_API_KEY' con tu clave obtenida en https://openweathermap.org/
const apiKey = '7b1afdd0dd704f4f59c4fc2470d274ca';
const botonBuscar = document.getElementById('buscar');

botonBuscar.addEventListener('click', async () => {
    const ciudad = document.getElementById('ciudad').value;

    if (!ciudad) {
        alert('Debes ingresar una ciudad.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    //const url = `https://api.openweathermap.org/data/3.0/onecall?lat=19.09&lon=.40&exclude=hourly,daily&appid=${apiKey}`
    try {
        // Realizar la petición HTTP a la API usando fetch con async y await
        const response = await fetch(url);
        const data = await response.json();

        console.log(data)

        // Revisar si la API devolvió un resultado válido
        if (data.cod === 200) {
            mostrarClima(data);  // llamar función para mostrar resultados
        } else {
            mostrarError('Ciudad no encontrada.');
        }
    } catch (error) {
        mostrarError('Error al conectarse con la API.');
        console.error('Error:', error);
    }
});

// Función para mostrar resultados en pantalla
function mostrarClima(datos) {
    const resultado = document.getElementById('resultado');

    // Desestructuración de los datos del objeto para más claridad
    const { name, main: { temp, humidity }, weather } = datos;
    const descripcion = weather[0].description;

    resultado.innerHTML = `
        <h3>📍 Clima en ${name}</h3>
        <p><strong>Temperatura:</strong> ${temp} °C</p>
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <p><strong>Humedad:</strong> ${humidity}%</p>
    `;
}

// Función para mostrar errores claramente al usuario
function mostrarError(mensaje) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<p style="color: red;">${mensaje}</p>`;
}
