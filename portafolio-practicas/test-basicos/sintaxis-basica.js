// PRÁCTICA DE SINTAXIS BÁSICA DE JAVASCRIPT
// Esta práctica te permitirá familiarizarte con la sintaxis de JavaScript para manejar:
// - Arrays (listas)
// - Bucles for (tradicional y for...of)
// - Método map()


console.log("Practica de sintaxis básica de JavaScript");
console.log("-----------------------------------------");
console.log(String.fromCodePoint(0x1F602)); 

// PARTE 1: ARRAYS (LISTAS)
console.log("PARTE 1: ARRAYS (LISTAS)");
console.log("------------------------");

// Declaración de un 
let frutas = ["manzana", "plátano", "naranja", "fresa", "kiwi"];
console.log("Array de frutas:", frutas);

// Acceder a elementos del array (por índice, comienza en 0)
console.log("Primera fruta:", frutas[0]); // manzana
console.log("Tercera fruta:", frutas[2]); // naranja

// Longitud del array
console.log("Número de frutas:", frutas.length);

// Añadir elementos al final del array
frutas.push("piña");
console.log("Array después de push:", frutas);

// Eliminar el último elemento
let ultimaFruta = frutas.pop();
console.log("Fruta eliminada:", ultimaFruta);
console.log("Array después de pop:", frutas);

// Añadir al principio
frutas.unshift("uva");
console.log("Array después de unshift:", frutas);

// Eliminar el primer elemento
let primeraFruta = frutas.shift();
console.log("Fruta eliminada del principio:", primeraFruta);
console.log("Array después de shift:", frutas);

// PARTE 2: BUCLE FOR TRADICIONAL
console.log("\nPARTE 2: BUCLE FOR TRADICIONAL");
console.log("-----------------------------");

console.log("Recorriendo el array con for tradicional:");
for (let i = 0; i < frutas.length; i++) {
    console.log(`Índice ${i}: ${frutas[i]}`);
}

// PARTE 3: BUCLE FOR...OF
console.log("\nPARTE 3: BUCLE FOR...OF");
console.log("---------------------");

console.log("Recorriendo el array con for...of:");
for (let fruta of frutas) {
    console.log(fruta);
}

// PARTE 4: MÉTODO MAP
console.log("\nPARTE 4: MÉTODO MAP");
console.log("------------------");

// map() crea un nuevo array transformando cada elemento
let frutasMayusculas = frutas.map(function(fruta) {
    return fruta.toUpperCase();
});

console.log("Array original:", frutas);
console.log("Array transformado con map:", frutasMayusculas);

// Versión con arrow function (más moderna)
let frutasConEmoji = frutas.map(fruta => "🍎 " + fruta);
console.log("Frutas con emoji usando arrow function:", frutasConEmoji);

// PARTE 5: EJERCICIOS PRÁCTICOS
console.log("\nPARTE 5: EJERCICIOS PRÁCTICOS");
console.log("----------------------------");

// Array de números
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Ejercicio 1: Filtrar números pares usando for tradicional
let pares = [];
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        pares.push(numeros[i]);
    }
}
console.log("Números pares (con for):", pares);

// Ejercicio 2: Calcular el cuadrado de cada número usando map
let cuadrados = numeros.map(numero => numero * numero);
console.log("Cuadrados (con map):", cuadrados);

// Ejercicio 3: Sumar todos los elementos usando for...of
let suma = 0;
for (let numero of numeros) {
    suma += numero;
}
console.log("Suma de todos los números:", suma);

// PARTE 6: DESAFÍO FINAL - COMBINANDO CONCEPTOS
console.log("\nPARTE 6: DESAFÍO FINAL");
console.log("---------------------");

// Array de objetos
let estudiantes = [
    { nombre: "Ana", calificacion: 85 },
    { nombre: "Carlos", calificacion: 70 },
    { nombre: "Elena", calificacion: 95 },
    { nombre: "David", calificacion: 60 },
    { nombre: "Sofía", calificacion: 88 }
];

// Mostrar lista de estudiantes
console.log("Lista de estudiantes:");
for (let estudiante of estudiantes) {
    console.log(`- ${estudiante.nombre}: ${estudiante.calificacion} puntos`);
}

// Calcular promedio
let sumaCalificaciones = 0;
for (let i = 0; i < estudiantes.length; i++) {
    sumaCalificaciones += estudiantes[i].calificacion;
}
let promedio = sumaCalificaciones / estudiantes.length;
console.log(`Promedio de calificaciones: ${promedio.toFixed(2)}`);

// Crear nuevo array con estudiantes aprobados (calificación >= 70) usando map y filter
let mensajesAprobados = estudiantes
    .filter(estudiante => estudiante.calificacion >= 70)
    .map(estudiante => `${estudiante.nombre} ha aprobado con ${estudiante.calificacion} puntos`);

console.log("Mensajes de aprobados:");
mensajesAprobados.forEach(mensaje => console.log(mensaje));

// INSTRUCCIONES PARA EL ESTUDIANTE:
// 1. Copia este código en un archivo .js
// 2. Ejecútalo con Node.js o en la consola del navegador
// 3. Analiza la salida para entender cada operación
// 4. Modifica el código para experimentar con diferentes valores
// 5. Intenta crear tus propios ejemplos utilizando estos conceptos

