const urlBase = "https://rickandmortyapi.com/api/character/";

const loadData = (urlBase, page = 1) => {
  const url = `${urlBase}?page = ${page}`;
  fetch(url)
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respJson) => {
      const info = respJson.info;
      const personajes = respJson.results;
      console.log(info);
      //Validar botones
      const btnprev = document.querySelector('#prev');
      const btnnext = document.querySelector('#next');

      if(!info.prev){
        btnprev.classList.add('disbled');
      }else{
        btnprev.classList.remove('disabled');
        btnprev.setAttribute('data-id', Number(page) - 1);
      }
      if(!info.next){
        btnnext.classList.add('disabled');
      }
      else{
        btnnext.classList.remove('disabled');
        btnnext.setAttribute('data-id', Number(page) + 1);
      }
       
      showCharacters(personajes);
    });
}

const showCharacters = (personajes) => {
  const listaPersonajes = document.querySelector("#characters");
  //Limpiar contenido
  while(listaPersonajes.firstChild){
    listaPersonajes.removeChild(listaPersonajes.firstChild);
  }
  personajes.forEach(personaje => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.classList.add('m-2');
    div.innerHTML = creaCard(personaje);
    listaPersonajes.appendChild(div);
  })
 } 

  
const creaCard = (personaje) =>{
  const html = `
  <div class="card" style="width: 18rem;">
  <img src="${personaje.image}" class="card-img-top" alt="${personaje.image}">
  <div class="card-body">
    <h5 class="card-title">${personaje.name}</h5>
    <p class="card-text">${personaje.status}</p>
    <a href="#" class="btn btn-primary">Ver mas</a>
  </div>
</div>
  `;
  return html;

}
const navegacion = (e) =>{
  if(e.target.classList.contains('btn')){
    const id = e.target.getAttribute('data-id');
    loadData(urlBase, id);

  }
}
document.querySelector('#botones').addEventListener('click', navegacion);
loadData(urlBase);
