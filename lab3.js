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

    const page = document.getElementById('page').value; // Página seleccionada
    const method = document.getElementById('method').value; // Método HTTP seleccionado
    const iframe = document.getElementById('inlineFrameExample'); // Seleccionar el iframe

    // Definir opciones para la solicitud
    const options = {
        method: method,
    };
    if(method === 'GET'){
        iframe.src = `http://localhost:3000/${page}`;
    }
    else if(method === 'POST'){
        fetch( `http://localhost:3000/${page}`,options)
        .then(response => response.text())
        .then(data => {
            const blob = new Blob([data], { type: 'text/html' });
            iframe.src = URL.createObjectURL(blob); // Cargar la respuesta del POST en el iframe
        })
        .catch(error => console.error('Error:', error));
    }
    // try{
    //     fetch(`http://localhost:3000/${page}`, options)
    //     .then(res => res.json())
    //     .then(data => )
    // }
    
    // try {
    //     const response = await fetch(`http://localhost:3000/${page}`, options)
    //     .then(data=>{
    //         const blob = new Blob([data], { type: 'text/html' });
    //     });
    //     if (!response.ok) {
    //         throw new Error(`Response status: ${response.status}`);
    //     }
    //     console.log(response);
    //     document.getElementById('inlineFrameExample').src = URL.createObjectURL(blob);
    // } catch (error) {
    //     console.error(error.message);
    // }
    //document.getElementById('inlineFrameExample').src = "localhost:3000/api";
//     console.log(page);
//     console.log(method);
}

async function getData() {
    document.getElementById("tabla").hidden = false;
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