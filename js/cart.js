//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
//funcion para mostrar las imágenes
function showImages(array) {
    let producto = "";
    for (let i = 0; i < array.length; i++) {


      
      let imagen = array[i].src;
     
     
     producto += `
      
             <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
              <a class="cinta uno"> <img class="img-fluid img-thumbnail"  src="` + imagen + `" alt=""> </a>
            </div>
        </div>
       
      `


      document.getElementById("productImages").innerHTML = producto;

    } 
}
    
fetch(CART_INFO_URL)
  .then(response => response.json())
  .then(data => {
  
    let nombreHTML = document.getElementById("nombre");
 
    let productCountHTML = document.getElementById("productCount");

    let productcurrencyHTML = document.getElementById("productcurrency");

    nombreHTML.innerHTML = data.name;
    productcurrencyHTML.innerHTML = data.unitCost + " " + data.currency
    productCountHTML.innerHTML = data.count;
   
    showImages(data);
  })






});