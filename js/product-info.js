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
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

      document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
  }
//fetch para mostrar los datos de JSON de product-info
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

//fetch para mostrar las preguntas realizadas anteriormente del JSON prodct_info_comments_url
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
});
