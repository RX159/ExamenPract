
let BtnSubmit = document.getElementById('btn-publicar');
let BtnCancelar = document.getElementById('btn-limpiar');
let BtnResenia = document.getElementById('escribe_reseña');

let SecComent = document.getElementById('seccion_comentario');

let SecRev = document.getElementById('seccion_reviews');

let Name = document.getElementById('nombre');
let Email = document.getElementById('email');
let Comment = document.getElementById('comentario');
let error = document.getElementById('error_comment');


/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
BtnResenia.addEventListener('click', function(){

  SecComent.classList.remove("hidden");

})

/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/

$.ajax({
  url : 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type : 'GET',
  dataType : 'xml',
  success : function(data){
    console.log(data)

    let newHtml = ''

    $(data).find('comment').each(function(){
      let stars = getStarsSpans($(this).find("stars").text())
      console.log(stars)
      newHtml += `
        <div class="review">
          <div class="nombre">${$(this).find("name").text()}</div>
          <div>${getStarsSpans($(this).find("stars").text())}</div>
          <div>${$(this).find("text").text()}</div>
        </div>
      `
    })

    $('#seccion_reviews').append(newHtml)
  },
  error : function(errorMsg) {
    console.log(errorMsg)
  }
})


/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
BtnSubmit.addEventListener('click', function(){

  if(Name.value=="" || Email.value=="" || Comment.value=="")
  {
    error.classList.remove("hidden");
  }
  else
  {
    error.classList.add("hidden");

    let Stars = document.getElementsByName('rating')
    let newHtml = ''
    var Rating =  0

    for(i=0; i<Stars.length ; i++)
    {
      if( Stars[i].checked )
      {
        Rating = Stars[i].value;
      }
    }

 


    var NewDiv = document.createElement("div");
    NewDiv.classList.add("review")
    var NewName = document.createElement("div");
    NewName.classList.add("nombre")
    var NewRating = document.createElement("span");
    var NewComment = document.createElement("div");

    NewName.textContent = Name.value
    NewRating.textContent = getStarsSpans(Rating)
    NewComment.textContent = Comment.textContent

    NewDiv.append(NewName)
    NewDiv.append(getStarsSpans(Rating))
    NewDiv.append(NewComment)

      
    SecRev.append(NewDiv)

    Name.value = ""
    Email.value = ""
    Comment.textContent = ""

  }

})

/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
BtnCancelar.addEventListener('click', function(){

  Name.value = ""
  Email.value = ""
  Comment.textContent = ""

})


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
