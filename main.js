document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "971598b0b54648ef632d7860a6e1d972";
    const searchEndpoint = 'https://api.themoviedb.org/3/search/movie';
    const dataForm = document.getElementById('dataForm');
    const searchForm = document.getElementById('searchForm');
    const dataList = document.getElementById('dataList');
    const searchResults = document.getElementById('searchResults');
    const peliculaButton = document.getElementById('peliculaButton');
    let datos = JSON.parse(localStorage.getItem('datos')) || [];

    function agregarDato(nombre, edad) {
        const dato = { nombre, edad };
        datos.push(dato);
        guardarDatos();
        mostrarDatos();
    }

    function eliminarDato(index) {
        datos.splice(index, 1);
        guardarDatos();
        mostrarDatos();
    }

    function editarDato(index, nombre, edad) {
        datos[index].nombre = nombre;
        datos[index].edad = edad;
        guardarDatos();
        mostrarDatos();
    }

    function guardarDatos() {
        localStorage.setItem('datos', JSON.stringify(datos));
    }

    function mostrarDatos() {
        dataList.innerHTML = '';
        datos.forEach((dato, index) => {
            const li = document.createElement('li');
            li.textContent = `${dato.nombre} - ${dato.edad}`;

            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.addEventListener('click', (e) => {
                e.stopPropagation();
                dataForm.name.value = dato.nombre;
                dataForm.age.value = dato.edad;
                dataForm.removeEventListener('submit', handleSubmitAgregar);
                dataForm.addEventListener('submit', function handleSubmitEditar(e) {
                    e.preventDefault();
                    const newNombre = dataForm.name.value.trim();
                    const newEdad = dataForm.age.value.trim();
                    if (newNombre && newEdad) {
                        editarDato(index, newNombre, newEdad);
                        dataForm.reset();
                        dataForm.removeEventListener('submit', handleSubmitEditar);
                        dataForm.addEventListener('submit', handleSubmitAgregar);
                    } else {
                        alert('Por favor, complete todos los campos.');
                    }
                });
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', (e) => {
                e.stopPropagation();
                eliminarDato(index);
            });

            li.appendChild(botonEditar);
            li.appendChild(botonEliminar);
            dataList.appendChild(li);

            li.addEventListener('click', () => {
                mostrarAlerta(dato);
            });
        });
    }

    function mostrarAlerta(dato) {
        alert(`Nombre: ${dato.nombre}\nEdad: ${dato.edad}`);
    }

    function handleSubmitAgregar(e) {
        e.preventDefault();
        const nombre = dataForm.name.value.trim();
        const edad = dataForm.age.value.trim();
        if (nombre && edad) {
            agregarDato(nombre, edad);
            dataForm.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    }

    function buscarPeliculas(query) {
        const url = `${searchEndpoint}?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                mostrarResultados(data.results);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function mostrarResultados(resultados) {
        const resultadosContainer = document.getElementById('resultados');
        resultadosContainer.innerHTML = '';

        resultados.forEach(pelicula => {
            const peliculaElement = document.createElement('div');
            peliculaElement.classList.add('pelicula');

            const titulo = document.createElement('h3');
            titulo.textContent = pelicula.title;

            const descripcion = document.createElement('p');
            descripcion.textContent = pelicula.overview;

            const enlace = document.createElement('a');
            enlace.href = `https://www.themoviedb.org/movie/${pelicula.id}`;
            enlace.textContent = 'Ver más';
            enlace.target = '_blank';

            peliculaElement.appendChild(titulo);
            peliculaElement.appendChild(descripcion);
            peliculaElement.appendChild(enlace);
            resultadosContainer.appendChild(peliculaElement);
        });
    }

    dataForm.addEventListener('submit', handleSubmitAgregar);

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchForm.querySelector('input[name="query"]').value.trim();
        if (searchTerm) {
            buscarPeliculas(searchTerm);
            searchForm.reset();
        } else {
            alert('Por favor, ingrese un término de búsqueda.');
        }
    });

    /** 
    peliculaButton.addEventListener("click", () => {
        window.location.href = "https://www.themoviedb.org/movie";
    });*/

    mostrarDatos();
});
