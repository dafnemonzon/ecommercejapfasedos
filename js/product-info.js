//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

 
//funcion para mostrar las imágenes
  function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
      let images = array[i];

      htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
              <a class="cinta uno">  <img class="img-fluid img-thumbnail" src="` + images + `" alt=""> </a>
            </div>
        </div>
        `

      document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
  }
//Petición web a una URL ( identificador del producto - toda la información)
  fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(data => {


      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML = document.getElementById("productDescription");
      let productCountHTML = document.getElementById("productCount");

      let productcurrencyHTML = document.getElementById("productcurrency");

      productNameHTML.innerHTML = data.name;
      productDescriptionHTML.innerHTML = data.description;
      productcurrencyHTML.innerHTML = data.currency + " " + data.cost
      productCountHTML.innerHTML = data.soldCount;


//se llama a la función de las imagenes para mostarlas
      showImagesGallery(data.images);

    })

//Petición web a una URL (comentarios y puntuación precargados )
  let comments = "";
  fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {


        let desc = data[i].description;;
        let user = data[i].user;
        let datetime = data[i].dateTime;

        var estrella = "";
        var score = data[i].score;
        //un for especifico para mostar la puntuacion de cada comentario realizado por un usuario
        for (let e = 0; e < score; e++) {
          estrella += ` <span class="fa fa-star checked"></span>`
        }
        comments += `
        <div class="container mt-3">
     
              <hr class="my-3">
               <dd>
               <div class="chip">👤` + user + ` </div>  
                </dd>  
               <dd>
                 <p > ` + desc + `   <br>  </span>
                 ` + estrella + `</p>
               </dd>
       <dt>Fecha </dt>
               <dd>
                 <p >  `+ datetime + `</p>
               </dd>
              
               
       </div>
       
        `


        document.getElementById("productcomments").innerHTML = comments;

      }
    })
    //ingresar una puntuación al producto 
  // para todos los radiobutton rating agregar un on change
  const changeRating = document.querySelectorAll('input[name=rating]');
  changeRating.forEach((radio) => {
    radio.addEventListener('change', getRating);
  });

  // buscar el radiobutton checked y armar el texto con el valor ( 0 - 5 ) para mostrarlo 
  function getRating() {
    let estrellas = document.querySelector('input[name=rating]:checked').value;
    document.getElementById("texto").innerHTML = (
      0 < estrellas ?
        estrellas + " estrella" + (1 < estrellas ? "s" : "") :
        "sin calificar"
    );

   
  }
  //funcion para mostrar los productos relacionados
  function showRelatedProducts(array) {
    let related = "";

    for (let i = 0; i < array.length; i++) {
      
     let imagen1= array[1].imgSrc
let imagen2 = array[3].imgSrc
     related = `
       
           
        
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>

  </ol> <h3 class="ui-pdp-questions__questions-list__title">Productos Relacionados </h3> <br>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="` + imagen1 + `" class="d-block w-70"  width="500" height=300" alt="...">
    </div>
    <div class="carousel-item">
      <img src="` + imagen2 + `" class="d-block  w-70" width="500" height="300" alt="...">
    </div>
   
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> `
      document.getElementById("relatedproducts").innerHTML =  related;
    }
  }
  fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(data => { 
array = data
    //se llama a la función de las imagenes para mostarlas
    showRelatedProducts(data);

    })
});document.getElementById("userFace").innerHTML = localStorage.getItem("mail");
