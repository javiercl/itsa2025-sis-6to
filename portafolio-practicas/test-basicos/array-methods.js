// 1. MÉTODOS PARA AGREGAR/ELIMINAR
let frutas = ['manzana', 'banana'];
console.log('--- Métodos para agregar/eliminar ---');

frutas.push('naranja');           // Añade al final: ['manzana', 'banana', 'naranja']
frutas.unshift('fresa');          // Añade al inicio: ['fresa', 'manzana', 'banana', 'naranja']
frutas.pop();                     // Elimina y retorna el último: 'naranja'
frutas.shift();                   // Elimina y retorna el primero: 'fresa'
frutas.splice(1, 1, 'kiwi');      // Reemplaza elementos: ['manzana', 'kiwi']

// 2. MÉTODOS DE BÚSQUEDA
let numeros = [1, 2, 3, 4, 5];
console.log('--- Métodos de búsqueda ---');

numeros.indexOf(3);               // Retorna 2 (índice de primera coincidencia)
numeros.lastIndexOf(3);           // Retorna 2 (índice de última coincidencia)
numeros.includes(3);              // Retorna true
numeros.find(n => n > 3);         // Retorna 4 (primer elemento que cumple)
numeros.findIndex(n => n > 3);    // Retorna 3 (índice del primer elemento que cumple)

// 3. MÉTODOS DE TRANSFORMACIÓN
console.log('--- Métodos de transformación ---');

numeros.map(n => n * 2);          // Retorna [2,4,6,8,10]
numeros.filter(n => n > 3);       // Retorna [4,5]
numeros.reduce((sum, n) => sum + n, 0); // Retorna 15
numeros.reverse();                // Invierte el array original
numeros.slice(1, 3);             // Retorna [2,3] (no modifica el original)

// 4. MÉTODOS DE ORDENAMIENTO
console.log('--- Métodos de ordenamiento ---');

let desordenados = [3, 1, 4, 1, 5];
desordenados.sort();              // Ordena como strings: [1,1,3,4,5]
desordenados.sort((a, b) => a - b); // Ordena números: [1,1,3,4,5]

// 5. MÉTODOS DE ITERACIÓN
console.log('--- Métodos de iteración ---');

numeros.forEach(n => console.log(n));  // No retorna nada
numeros.every(n => n > 0);       // Retorna true si todos cumplen
numeros.some(n => n > 4);        // Retorna true si alguno cumple

// 6. MÉTODOS DE CONVERSIÓN
console.log('--- Métodos de conversión ---');

numeros.join(', ');              // Convierte a string: "1, 2, 3, 4, 5"
Array.from('123');               // Convierte a array: ['1','2','3']
Array.isArray(numeros);          // Verifica si es array: true

// 7. EJEMPLOS PRÁCTICOS
console.log('--- Ejemplos prácticos ---');

// Ejemplo 1: Filtrar y transformar
let precios = [10, 20, 30, 40, 50];
let descuentos = precios
    .filter(p => p > 20)
    .map(p => p * 0.9);

// Ejemplo 2: Encontrar elementos únicos
let repetidos = [1, 2, 2, 3, 3, 4];
let unicos = [...new Set(repetidos)];

// Ejemplo 3: Agrupar por categoría
let productos = [
    {categoria: 'fruta', nombre: 'manzana'},
    {categoria: 'verdura', nombre: 'zanahoria'},
    {categoria: 'fruta', nombre: 'banana'}
];

let porCategoria = productos.reduce((acc, prod) => {
    acc[prod.categoria] = acc[prod.categoria] || [];
    acc[prod.categoria].push(prod.nombre);
    return acc;
}, {});

// Ejemplo 4: Ordenamiento complejo
let items = [
    {nombre: 'Z', precio: 10},
    {nombre: 'A', precio: 20},
    {nombre: 'C', precio: 15}
];

items.sort((a, b) => {
    if (a.precio === b.precio) {
        return a.nombre.localeCompare(b.nombre);
    }
    return a.precio - b.precio;
}); 