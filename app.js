const urlBase= 'https://rickandmortyapi.com/api/character/';

const loadData=(urlBase, page=1)=>{
    const url=`${urlBase}?page=${page}`;
 fetch(url)
.then(respuesta =>{
    return respuesta.json();
}).then(respJson =>{
    console.log(respJson);
    const info=respJson.info;
    const personajes=respJson.results;
    console.log(info);
    //validacion
    const btnPrev =document.querySelector('#prev');
    const btnNext =document.querySelector('#next');
    if(!info.prev){
        btnPrev.classList.add('disabled');

    }else {
        btnPrev.classList.remove('disabled');
        btnPrev.setAttribute('data-id', Number(page) -1);
    }
    if(!info.next){
        btnNext.classList.add('disabled');

    }else {
        btnNext.classList.remove('disabled');
        btnNext.setAttribute('data-id', Number(page) +1);
    }
    showCharacters(personajes);
})
}
const showCharacters=(personajes)=> {
    const ListaPersonajes = document.querySelector('#characters');
    //limpiar-
    while(ListaPersonajes.firstChild){
        ListaPersonajes.removeChild(ListaPersonajes.firstChild);
    }
    personajes.forEach(personaje => {
        const div =document.createElement('div');
        div.classList.add('col');
        div.classList.add('m-2');;
        div.innerHTML = creaCard(personaje);
       ListaPersonajes.appendChild(div);
        
    });
}
const creaCard=(personaje)=>{
    const html=`
    <div class="card bg-dark text-ligth border" style="width: 18rem;">
  <img src="${personaje.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${personaje.name}</h5>
    <p class="card-text">${personaje.status}</p>
    <a href="#" class="btn btn-primary"
      data-bs-toggle="modal" 
    data-bs-target="#exampleModal"
    data id="${personaje.id}">Ver mas</a>
    
  </div>
</div>
`;
return html;
}
const navegacion=(e)=>{

    
    if(e.target.classList.contains('btn')){
        const id=e.target.getAttribute('data-id');
        loadData(urlBase, id);
    }
}
const modalBody = (personaje) =>{
    const div = document.createElement('div');
    const html = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog bg-dark">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;
  return html;
}


const showCharacterById = (id) =>{
    const urlId = `${urlBase}${id}`;
    fetch(urlId)
    .then(result => result.json())
    .then(character => {
        console.log(character);
        return modalBody(character);
    });
}

const loadInfo = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        const modalContent=document.querySelector('.modal-body');
        modalContent.removeChild(modalContent.firstChild);
        modalContent.appendChild(spinner());
        setTimeout(()=>{
            modalContent.removeChild(modalContent.firstChild);
            const id = e.target.getAttribute('data-id');
            //const content=document.createElement('div');
            //const id=e.target.getAttribute('data-id');
            //ontent.innerHTML=`<h2>Id ${id}</h2>`;
            const content = showCharacterById(id);
        modalContent.appendChild(content);
        }, 3000);
    }
}

const spinner=()=>{
    const div=document.createElement('div');
    const html=
    `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`;
  div.innerHTML= html;
  return html;
}
document.querySelector('#botones').addEventListener('click', navegacion);
document.querySelector('#characters').addEventListener('click', loadInfo);
loadData(urlBase);
