
Este trabajo es sobre una pagina web que muestra las gasolineras cercanas al radio que pongas y que muestra el precio y direccion de la gasolinera

1. Archivo HTML (index.html)
El archivo index.html es la estructura principal de la página web y contiene todo el contenido estático que el navegador interpreta para mostrar la página.

Contenido y Función:
Cabecera (<header>): Contiene el título de la página "Buscador de Gasolineras".
Sección de Búsqueda (<section class="search-section">): Permite al usuario ingresar un radio en kilómetros para buscar gasolineras cercanas. Incluye un formulario con un campo de número y un botón de búsqueda.
Mapa (<section id="map-container"> y <div id="map-section">): Aquí se carga el mapa interactivo utilizando la librería de Leaflet, donde se mostrarán las gasolineras en función del radio proporcionado por el usuario.
Resultados de Gasolineras (<section id="results-section">): Muestra las tarjetas de gasolineras cercanas basadas en la búsqueda, con detalles como nombre, dirección y un enlace para obtener la ruta.
Pie de Página (<footer>): Información adicional, como los créditos por los datos proporcionados por el Ministerio de Energía.
Enlaces a otros archivos:
Se incluyen enlaces a Leaflet CSS y Leaflet JS para mostrar el mapa interactivo.
Se enlaza el archivo de estilos CSS (styles.css) para la apariencia de la página.
Se enlaza el archivo de JavaScript (Gasolineras.js) que maneja la lógica y la interacción con el mapa y la API.
2. Archivo de Estilos CSS (styles.css)
El archivo styles.css es responsable de definir la apariencia visual de la página web, asegurando que el diseño sea atractivo, moderno y, sobre todo, funcional y responsive.

Contenido y Función:
Estilos Generales:

Se definen las fuentes, márgenes, paddings y colores generales para que el contenido sea legible y agradable.
Se utiliza la fuente Roboto para los textos, y se establece un fondo suave de color gris claro (#f5f7fa).
Cabecera (<header>):

Fondo azul (#0056b3) con texto blanco para resaltar el título de la página.
Se aplican sombras sutiles para darle un toque de profundidad.
Sección de Búsqueda (.search-section):

Fondo blanco, bordes redondeados y sombra para mejorar la estética.
El formulario de búsqueda tiene un diseño flexible para adaptarse a pantallas de diferentes tamaños. Los campos de entrada y los botones tienen transiciones suaves y efectos hover.
Contenedor de Gasolineras (.gasolineras-container):

Utiliza un diseño de flexbox para organizar las tarjetas de gasolineras en una cuadrícula adaptable.
Tarjetas de Gasolineras (.gasolinera-card):

Cada tarjeta tiene un fondo blanco, bordes redondeados, sombra y una transición al pasar el ratón.
Los botones de cada tarjeta (para obtener rutas) tienen un estilo con un color verde, y se modifica el color al pasar el ratón para mejorar la experiencia de usuario.
Mapa (#map-section):

Se definen estilos para que el mapa tenga bordes redondeados, una sombra sutil y un borde azul para hacerlo resaltar en la página.
Responsividad:

Se incluyen reglas media queries para asegurar que la página sea responsive:
En pantallas más pequeñas (por debajo de 768px), las tarjetas de gasolineras se ajustan a un 100% de ancho para mejorar la visualización en dispositivos móviles.
Los elementos del formulario de búsqueda se reorganizan en una columna para facilitar su uso en pantallas pequeñas.
3. Archivo JavaScript (Gasolineras.js)
El archivo Gasolineras.js contiene la lógica del lado del cliente que permite la interacción dinámica con la página, específicamente para la obtención de gasolineras cercanas y la visualización en el mapa.

Contenido y Función:
Obtener los Datos de Gasolineras:

Utiliza fetch o una llamada a una API (que no se especificó completamente en el código, pero se asume que es una API externa para obtener las gasolineras cercanas) para obtener los datos basados en el radio proporcionado por el usuario.
Mostrar Gasolineras en el Mapa:

Al recibir los datos de las gasolineras, se utilizan las coordenadas geográficas (latitud y longitud) para mostrar los marcadores en el mapa utilizando la librería Leaflet.
Se inicializa el mapa con una vista predeterminada, y se agregan los marcadores que representan la ubicación de cada gasolinera.
Actualizar Resultados:

Cuando el usuario envía el formulario con el radio de búsqueda, el script recoge ese valor, realiza la búsqueda de gasolineras y actualiza dinámicamente las tarjetas de resultados debajo del mapa.
Cada tarjeta contiene un botón que redirige a una página o una aplicación de mapas para obtener la ruta hacia la gasolinera.
4. Dependencias Externas
Leaflet.js:
Es una librería de JavaScript para crear mapas interactivos.
Se carga desde un CDN y se utiliza para la visualización del mapa de gasolineras.
Leaflet.css:
Estilos asociados con la librería Leaflet.js que definen el aspecto básico del mapa y sus controles.
