Gestión de Datos y Búsqueda de Películas

Este proyecto es una aplicación web sencilla que permite gestionar datos de usuarios (nombre y edad) y buscar información sobre películas utilizando la API de The Movie Database (TMDb).

Funcionalidades
Agregar Datos: Permite agregar nombre y edad de un usuario.
Editar Datos: Permite editar los datos de un usuario existente.
Eliminar Datos: Permite eliminar un usuario de la lista.
Buscar Películas: Permite buscar información sobre películas y redirigir a la página de detalles de la película en TMDb.
Estructura del Proyecto
HTML
El archivo HTML define la estructura de la aplicación y los formularios para la gestión de datos y búsqueda de películas.

JavaScript
El archivo JavaScript contiene la lógica de la aplicación:

Gestión de Datos de Usuarios: Permite agregar, editar y eliminar datos de usuarios. Los datos se almacenan localmente usando localStorage.
Búsqueda de Películas: Al enviar el formulario de búsqueda, se realiza una llamada a la API de TMDb para obtener resultados basados en el término de búsqueda. Los resultados se muestran en la interfaz de usuario.
Uso
Agregar Datos de Usuarios:

Complete el formulario de nombre y edad y haga clic en "Agregar Dato".
Los datos se agregarán a la lista de usuarios.
Editar Datos de Usuarios:

Haga clic en el botón "Editar" junto a un usuario en la lista.
Modifique los campos de nombre y edad en el formulario y envíe el formulario editado.
Eliminar Datos de Usuarios:

Haga clic en el botón "Eliminar" junto a un usuario en la lista.
El usuario será eliminado de la lista.
Buscar Películas:

Complete el formulario de búsqueda con el nombre de una película.
Haga clic en "Buscar".
Los resultados de la búsqueda se mostrarán debajo del formulario de búsqueda.