# instapic-app

# Guía sobre Estilos en CSS

CSS (Cascading Style Sheets) es un lenguaje de estilos utilizado para definir la presentación de documentos HTML. En esta guía, exploraremos las diferentes formas de aplicar estilos en CSS y cómo seleccionar elementos para personalizarlos.

## 1. Formas de Aplicar Estilos en CSS

### a) Uso del Atributo `style` en las Etiquetas HTML
Se pueden aplicar estilos directamente en los elementos HTML utilizando el atributo `style`. Sin embargo, esta práctica no es recomendada para proyectos grandes debido a la dificultad de mantenimiento.

```html
<p style="color: blue; font-size: 16px;">Este es un párrafo con estilos en línea.</p>
```

### b) Uso de la Etiqueta `<style>` en el Documento HTML
Otra forma de aplicar estilos es incluirlos dentro de una etiqueta `<style>` en la sección `<head>` del documento HTML.

```html
<head>
    <style>
        p {
            color: green;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <p>Este es un párrafo con estilos definidos en la sección `<style>`.</p>
</body>
```

### c) Uso de un Archivo CSS Externo
La forma más recomendada para proyectos grandes es definir los estilos en un archivo CSS separado y vincularlo al documento HTML con la etiqueta `<link>`.

**Archivo `styles.css`**:
```css
p {
    color: red;
    font-size: 20px;
}
```

**Archivo `index.html`**:
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <p>Este es un párrafo con estilos definidos en un archivo externo.</p>
</body>
```

---

## 2. Formas de Seleccionar Elementos en CSS

### a) Selección Directa por Etiqueta
Se aplican estilos a todas las etiquetas de un tipo específico.
```css
h1 {
    color: blue;
    text-align: center;
}
```

### b) Selección por ID
Se usa `#` seguido del ID del elemento. Debe ser único por página.
```css
#titulo-principal {
    font-size: 24px;
    color: purple;
}
```
```html
<h1 id="titulo-principal">Este es un título con un ID.</h1>
```

### c) Selección por Clase
Se usa `.` seguido del nombre de la clase. Puede aplicarse a múltiples elementos.
```css
.destacado {
    font-weight: bold;
    background-color: yellow;
}
```
```html
<p class="destacado">Este es un párrafo destacado.</p>
```

### d) Selección por Atributo
Se pueden aplicar estilos a elementos que contengan un atributo específico.
```css
input[type="text"] {
    border: 2px solid gray;
    padding: 5px;
}
```
```html
<input type="text" placeholder="Ingrese su nombre">
```

### e) Selección por Nombre
Aunque no es común, se pueden seleccionar elementos con `name` usando el selector de atributos.
```css
[name="usuario"] {
    background-color: lightblue;
}
```
```html
<input type="text" name="usuario" placeholder="Usuario">
```

---


