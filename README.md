# instapic-app

# Guía sobre Estilos en CSS

# Explicación de los estilos CSS

## 1. `body` (Estilos generales)
```css
body {
    font-family: 'Ubuntu', 'Courier New', Courier, monospace;
    color: #023047;
    background-color: #f1f1f1;
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
```
- Define la fuente del texto con una prioridad (primero *Ubuntu*, si no está disponible, *Courier New*, y así sucesivamente).
- Color del texto: `#023047` (un tono azul oscuro).
- Fondo de la página: `#f1f1f1` (gris claro).
- Elimina los márgenes y el padding por defecto.
- Usa `display: flex` para organizar los elementos en columna.
- `min-height: 100vh;` asegura que el `body` tenga al menos la altura completa de la pantalla.

---

## 2. `header` (Encabezado)
```css
header {
    background-color: #219ebc;
    color: white;
    padding: 20px;
    text-align: center;
}
```
- Fondo azul (`#219ebc`).
- Texto en color blanco.
- Espaciado interno de `20px`.
- Alineación centrada del contenido.

---

## 3. `main` (Sección principal)
```css
main {
    flex: 1;
    padding: 10px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
```
- `flex: 1;` permite que ocupe el espacio disponible entre el `header` y el `footer`.
- `padding: 10px 20px;` agrega margen interno.
- `width: 100%;` asegura que ocupe todo el ancho disponible.
- Usa `display: flex` para organizar los elementos en columna y centrarlos.

---

## 4. `#login-box` (Caja del formulario de login)
```css
#login-box {
    background-color: #FFF;
    padding: 20px 40px;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}
```
- Fondo blanco.
- Espaciado interno `20px 40px`.
- Ancho máximo de `400px`.
- Bordes redondeados (`border-radius: 10px`).
- Sombra ligera (`box-shadow`).
- Se centra horizontalmente (`margin: 0 auto`).
- Organiza su contenido en columna (`display: flex; flex-direction: column;`).

### **Título del login**
```css
#login-box h2 {
    text-align: center;
    margin-bottom: 10px;
}
```
- Centra el texto del título `<h2>`.
- Agrega un pequeño espacio inferior.

---

## 5. Estilos de `#profile` (Perfil de usuario)
```css
#profile {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
}
```
- Usa `display: flex` para organizar los elementos en fila.
- Centra los elementos verticalmente con `align-items: center`.
- Distribuye los elementos uniformemente con `justify-content: space-around`.
- `width: 80%` asegura que no ocupe todo el ancho disponible.

### **Imagen del perfil**
```css
#profile img {
    width: 100px;
    display: block;
    border-radius: 50px;
}
```
- Tamaño de `100px`.
- Se muestra como un bloque.
- Bordes redondeados (`border-radius: 50px`) para una imagen circular.

### **Texto dentro del perfil**
```css
#profile div {
    text-align: center;
}
```
- Centra el texto.

```css
#profile div span {
    display: block;
}
```
- Convierte cada `span` en un bloque independiente.

```css
#profile div span:first-child {
    font-size: 1.8em;
    font-weight: 900;
}
```
- Hace que el primer `span` tenga un tamaño mayor (`1.8em`).
- Aplica un peso de fuente `900` para que sea más grueso.

---

## 6. Estilos de `#gallery` (Galería de imágenes)
```css
#gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
}
```
- Usa `display: flex` para organizar las imágenes.
- `flex-wrap: wrap` permite que las imágenes se ajusten a nuevas líneas si es necesario.
- Centra el contenido con `justify-content: center`.
- Agrega un espaciado interno de `20px`.

### **Imágenes dentro de la galería**
```css
#gallery img {
    width: 300px;
    margin: 20px;
    padding: 5px;
    border: 1px solid #fff;
}
```
- Cada imagen tiene un ancho de `300px`.
- `margin: 20px` agrega espacio entre las imágenes.
- `padding: 5px` agrega un pequeño espacio interno.
- `border: 1px solid #fff;` da un borde blanco a las imágenes.

### **Efecto `hover` en las imágenes**
```css
#gallery img:hover {
    border-color: #fb8500;
    opacity: 0.7;
}
```
- Cambia el borde a color naranja (`#fb8500`) cuando se pasa el mouse.
- Reduce la opacidad al `70%` para dar un efecto visual.


