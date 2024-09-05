function show() {
    document.getElementById("books").hidden = false;
}
function search() {
    document.getElementById("search").hidden = false;
}

async function getData() {
    const url = "https://backend-production-3a6e.up.railway.app/api/autor/getLibAut";
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

function jsonTable(data){
    let tabla = document.getElementById('tabla');
    tabla.hidden = false;

    if(Array.isArray(data.info)){
        data.info.forEach(item => {
            // Crear una fila para cada elemento
            const fila = document.createElement('tr');
            // Crear las columnas
            const celdaISBN= document.createElement('td');
            celdaISBN.textContent = item.isbn;
            const celdaTitulo= document.createElement('td');
            celdaTitulo.textContent = item.titulo;
            const celdaAutor= document.createElement('td');
            celdaAutor.textContent = item.ragar.nombre;
            // Añadir las celdas a la fila
            fila.appendChild(celdaISBN);
            fila.appendChild(celdaTitulo);
            fila.appendChild(celdaAutor);
            tabla.appendChild(fila);
            
        });
    }
}