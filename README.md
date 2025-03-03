# instapic-app

# Introducción a JavaScript

## 📌 Tipos de Datos en JavaScript

```javascript
// Primitivos
let cadena = "Hola, mundo";  // String
let numero = 42;  // Number
let booleano = true;  // Boolean
let indefinido;  // Undefined
let nulo = null;  // Null
let simbolo = Symbol("mi-simbolo");  // Symbol

// Complejos
let objeto = { nombre: "Juan", edad: 30 };  // Object
let arreglo = [1, 2, 3, 4, 5];  // Array
let funcion = function() { console.log("Soy una función"); };  // Function
let fecha = new Date();  // Date
```

## 📌 Estructuras de Control

### 🔹 Condicionales

```javascript
let edad = 18;

if (edad >= 18) {
    console.log("Eres mayor de edad");
} else {
    console.log("Eres menor de edad");
}

// Operador ternario
let mensaje = (edad >= 18) ? "Adulto" : "Menor";
console.log(mensaje);

// Switch
let dia = "lunes";

switch (dia) {
    case "lunes":
        console.log("Inicio de semana");
        break;
    case "viernes":
        console.log("¡Viernes, por fin!");
        break;
    default:
        console.log("Día común");
}
```

### 🔹 Ciclos

```javascript
// For
for (let i = 0; i < 5; i++) {
    console.log("Iteración:", i);
}

// While
let contador = 0;
while (contador < 3) {
    console.log("While:", contador);
    contador++;
}

// Do-While
let num = 0;
do {
    console.log("Do-While:", num);
    num++;
} while (num < 3);

// ForEach (en arrays)
let numeros = [10, 20, 30];
numeros.forEach(num => console.log("Número:", num));

// For...of (para recorrer arrays)
for (let valor of numeros) {
    console.log("For of:", valor);
}

// For...in (para recorrer objetos)
let persona = { nombre: "Ana", edad: 25 };
for (let clave in persona) {
    console.log(clave, ":", persona[clave]);
}
```

## 📌 Llamado a Funciones

```javascript
function saludar(nombre) {
    return "Hola, " + nombre;
}

console.log(saludar("Carlos"));  // Llamado normal

// Llamado con parámetros opcionales
function sumar(a, b = 5) {
    return a + b;
}
console.log(sumar(10));  // 10 + 5 = 15

// Pasando una función como parámetro (callback)
function operar(a, b, callback) {
    return callback(a, b);
}
console.log(operar(5, 3, (x, y) => x * y));  // Multiplicación
```

## 📌 Formas de Escribir una Función

### 🔹 Declaración de Función
```javascript
function suma(a, b) {
    return a + b;
}
console.log(suma(3, 4));
```

### 🔹 Expresión de Función (Función Anónima)
```javascript
const resta = function(a, b) {
    return a - b;
};
console.log(resta(7, 2));
```

### 🔹 Función Flecha (Arrow Function)
```javascript
const multiplicar = (a, b) => a * b;
console.log(multiplicar(4, 5));
```

### 🔹 Función Autoinvocada (IIFE - Immediately Invoked Function Expression)
```javascript
(function() {
    console.log("Soy una función autoinvocada");
})();
```

### 🔹 Función como Método de un Objeto
```javascript
const persona2 = {
    nombre: "Pedro",
    saludar() {
        console.log("Hola, soy " + this.nombre);
    }
};
persona2.saludar();
