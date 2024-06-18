const listaPersonajes = document.getElementById('character-list');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');

let paginas = 1;
cargarPagina(paginas);

prevBtn.addEventListener('click', ((elemento) => {
    paginas <= 1 ? paginas = 1 : paginas--;
    cargarPagina(paginas);
}))
nextBtn.addEventListener('click', ((elemento) => {
    paginas++;
    cargarPagina(paginas);
}))

function cargarPagina(pagina){
    limpiarPagina();
    fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Fallo en la solicitud');
                }
                return response.json();
            })
            .then((data) => {
                let datosMorty = data.results;
                datosMorty.forEach((personajes) =>{
                    const base = `<li><img src=${personajes.image} /> <div><h3>Name:</h3> <h4>${personajes.name}</h4></div><div><h3>Specie:</h3> <h4>${personajes.species}</h4></div></li>`;
                    console.log(base);
                    listaPersonajes.innerHTML += base;
                    
                });          
                
            })
            .catch((error)=>{
                listaPersonajes.innerHTML = 'Error. Solicitud no encontrada';
            });
}

function limpiarPagina(){
    listaPersonajes.innerHTML='';
}