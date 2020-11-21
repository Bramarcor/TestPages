const url = 'https://rickandmortyapi.com/api/character'
let nextUrl = ''

fetch(url)
    .then(response => response.json())
    .then(data => {
        mostrarPersonaje(data)
        mostrarOtraPagina()
        
         })
    .catch(err => console.log(err))


const contenedor = document.getElementById('personajes');
const fragment = document.createDocumentFragment();
const template = document.querySelector("#tarjeta").content;


function mostrarPersonaje(data) {
    nextUrl = data.info.next

    for (let index = 0; index < data.results.length; index++) {
        const element = data.results[index];
        console.log(element.name)
        let nombrePj = element.name
        let urlImg = element.image
        template.querySelector(".card-title").textContent = nombrePj;
        template.querySelector("img").src = urlImg;
        const clone = document.importNode(template, true);
        fragment.appendChild(clone);
    }
    //cuando se cargo el fragment se insertan los datos todos juntos
    //contenedor.appendChild(fragment);
    //document.getElementById('datos').innerHTML = '<h1>'+ nombre +'</h1>'    
}

function mostrarOtraPagina() {
    if (nextUrl !== null) {
        fetch(nextUrl)
    .then(response => response.json())
    .then(data => {
        mostrarPersonaje(data)
        mostrarOtraPagina()
        })
    .catch(err => console.log(err))
    }else{
        //luego de cargar todos los datos de todas las paginas, se insertan todos juntos en el contenedor
        contenedor.appendChild(fragment);
    }
    
   
}