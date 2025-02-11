# instapic-app

En la primer práctica se analizarán los conceptos básicos de HTML.

## Estructura Semántica en HTML5
El HTML es el componente encargado de dar estructura a un sitio o página web. Pese a que cada etiqueta puede aplicar cierto “estilo” a la página, su funcionalidad no es el cambio tanto en la apariencia sino desde la parte semántica. Esto se puede entender mejor con el siguiente ejemplo:

![imagen](https://github.com/user-attachments/assets/51333bdc-ace6-4647-91c5-88dd14e63554)
> *Código de ejemplo de una página básica.*

##

![imagen](https://github.com/user-attachments/assets/d3b6b6a3-1810-4901-b457-525077627e4f)
> *Visualización en el navegador de la misma página.*

##

En el resultado obtenido en el navegador, se observan algunas características propias que agregan las etiquetas, por ejemplo, la etiqueta **h1**, en las palabras **Desarrollo Web** e **Introducción al Desarrollo Web** donde el tamaño y estilo de texto (negrilla) son diferentes al resto de la página. También se puede observar que hay un párrafo claramente delimitado, el cuál en el código corresponde al texto bajo la etiqueta **p**, etiqueta que precisamente indica que se trata de un texto dentro de un párrafo aparte. Entonces, si no todas las etiquetas de HTML modifican de manera significativa la apariencia final de la página, ¿para qué las utilizamos? La respuesta de esto es: estructura. Dicha estructura se observa en la primer imagen, en el código html, la página está estructurada en diferentes partes claramente identificadas mediante etiquetas. En este punto las etiquetas ofrecen un valor mayor al de modificar apariencia al usuario final, en vez de esto le permiten, tanto al programador, como al navegador, entender qué secciones existen en la página y qué información se debería presentar en cada sección. Todo esto da un orden, una legibilidad al momento de realizar cambios, de eliminar o agregar contenido a la página. Por ejemplo, cualquier diseñador web entenderá que, si quiere agregar un menú o modificar el título principal de la página, deberá hacerlo dentro de la sección con la etiqueta **header**. La sección **main** será utilizada para posicionar el contenido principal y que cuando este contenido sea extenso, podrá dividirlo en secciones según sea su necesidad y que, finalmente, existirá un **footer** que se posiciona al final de la página donde por lo general se especifica el autor del sitio, contacto, última actualización, etc. La siguiente imagen define la estructura básica de una página web.

![imagen](https://github.com/user-attachments/assets/24c990d4-9ef1-4fe2-9494-3f43ec2b52a9)
> *Estructura básica de una página web*

##

En algunos casos específicos, las etiquetas deben ser usadas en un orden específico, de resto no hay ningún tipo de restricción para su uso y esto dependerá más de las buenas prácticas de cada desarrollador.


## Etiquetas
Las etiquetas son el componente que **marca** como tal el documento o página web. Como se mencionó anteriormente, pueden modificar en cierta forma la apariencia, pero su papel principal es dar estructura a la página. Las etiquetas vienen acompañadas de atributos que, por lo general, son de carácter opcional y que añaden más características o un comportamiento especial a la etiqueta.

![imagen](https://github.com/user-attachments/assets/c6e47661-6db7-4270-8f79-4116bb9a4721)
> *Sintaxis de las etiquetas*

##

Para escribir una etiqueta, es necesario colocar el nombre de esta entre los símbolos mayor que ( < ) y menor que ( > ), las etiquetas siempre se deben escribir en minúscula. Salvo algunas excepciones, las etiquetas “abren” y “cierran”, enmarcando el contenido. La etiqueta de cierre tiene el nombre de la etiqueta precedido por una barra ( / ), tal como se ve en la línea 1 de la figura anterior. En la misma figura, líneas 3 a 5, se observa una etiqueta que, adicionalmente, tiene una propiedad. Las propiedades o atributos son ciertas características usadas para definir comportamiento o apariencia en una etiqueta.

Existe amplia documentación sobre las etiquetas y sus propiedades. En este [enlace](https://developer.mozilla.org/es/docs/Web/HTML), en la sección **References -> HTML elements**, se puede encontrar el listado completo de las etiquetas de HTML5, su descripción, ejemplo de uso y las propiedades que se pueden usar en cada etiqueta.


## Ejercicio

1. Observe cada uno de los archivos del repositorio en la ruta ***app/html***.
2. Identifique las similitudes y diferencias en el código de cada archivo.
3. Haga un listado de cada una de la etiquetas utilizadas y sus atributos

![imagen](https://github.com/user-attachments/assets/1f6780d4-686a-48da-a03f-d854470e80e7)
> *Código final de index.html*


![imagen](https://github.com/user-attachments/assets/2cab1d26-2a37-45e6-bc7c-9aeb649b398f)
> *Visualización en el navegador*
