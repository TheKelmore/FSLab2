const apiUrl = "http://localhost:3000/libros";

function show() {
    document.getElementById("books").hidden = false;
}
function search() {
    document.getElementById("search").hidden = false;
}
function endPo() {
    document.getElementById("end-point").hidden = false;
}
async function getPages() {
    const page = document.getElementById("page").value; // Página seleccionada
    const method = document.getElementById("method").value; // Método HTTP seleccionado
    const iframe = document.getElementById("inlineFrameExample"); // Seleccionar el iframe

    // Definir opciones para la solicitud
    const options = {
        method: method,
    };
    if (method === "GET") {
        iframe.src = `http://localhost:3000/${page}`;
    } else if (method === "POST") {
        fetch(`http://localhost:3000/${page}`, options)
            .then((response) => response.text())
            .then((data) => {
                const blob = new Blob([data], { type: "text/html" });
                iframe.src = URL.createObjectURL(blob); // Cargar la respuesta del POST en el iframe
            })
            .catch((error) => console.error("Error:", error));
    }
}

async function getData() {
    document.getElementById("tabla").hidden = false;
    const url =
        "https://backend-production-3a6e.up.railway.app/api/autor/getLibAut";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        jsonTable(json);
    } catch (error) {
        console.error(error.message);
    }
}

function jsonTable(data) {
    let tabla = document.getElementById("tabla");
    tabla.hidden = false;

    if (Array.isArray(data.info)) {
        data.info.forEach((item) => {
            // Crear una fila para cada elemento
            const fila = document.createElement("tr");
            // Crear las columnas
            const celdaISBN = document.createElement("td");
            celdaISBN.textContent = item.isbn;
            const celdaTitulo = document.createElement("td");
            celdaTitulo.textContent = item.titulo;
            const celdaAutor = document.createElement("td");
            celdaAutor.textContent = item.ragar.nombre;
            // Añadir las celdas a la fila
            fila.appendChild(celdaISBN);
            fila.appendChild(celdaTitulo);
            fila.appendChild(celdaAutor);
            tabla.appendChild(fila);
        });
    }
}
async function getLibro() {
    const isbn = document.getElementById("isbn").value;
    fetch(`${apiUrl}/${isbn}`)
        .then((response) => response.json())
        .then((data) => showResult(data))
        .catch((err) => showResult({ mensaje: "Libro no encontrado" }));
}

function showResult(data) {
    document.getElementById('idlibro').innerText = JSON.stringify(data, null, 2);
}

function addLibro() {
    var libro = {
        isbn: document.getElementById('isbn').value,
        titulo: document.getElementById('title').value,
        autor: document.getElementById('autor').value
    };
    console.log(JSON.stringify(libro))
    fetch(`${apiUrl}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libro)
    }).then(response => response.json())
        .then(data => showResult(data));

}

function showAll() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => showResult(data));
}
function delLibro() {
    const isbn = document.getElementById('isbn').value;
    fetch(`${apiUrl}/${isbn}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => showResult({ mensaje: 'Libro eliminado' }))
        .catch(err => showResult({ mensaje: 'Error eliminando el libro' }));
}



async function updLibro() {
    var libro = {
        isbn: document.getElementById('isbn').value,
        titulo: document.getElementById('title').value,
        autor: document.getElementById('autor').value
    };
    console.log(JSON.stringify(libro))
    fetch(`${apiUrl}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libro)
    }).then(response => response.json())
        .then(data => showResult(data));

}

function clean() {
    document.getElementById('isbn').value = ' ';
    document.getElementById('title').value = ' ';
    document.getElementById('autor').value = ' ';
    document.getElementById('idlibro').innerHTML = " ";
}
