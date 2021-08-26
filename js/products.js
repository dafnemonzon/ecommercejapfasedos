//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let url = "https:japdevdep.github.io/ecommerce-api/product/all.json";

    fetch(url)
        .then(response => response.json())
        .then(result => {



            for (let i = 0; i < result.length; i++) {
                let product = result[i]
                let name = product.name
                let description = product.description
                let cost = product.cost
                let currency = product.currency
                let imgs = product.imgSrc
              

        


                document.getElementById("productos").innerHTML += `
<div class="list-group-item list-group-item-action">
<div class="row">
    <div class="col-3">
        <img src="` + imgs + `" alt="` + description + `" class="img-thumbnail">
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">`+ name + `</h4>
            <small class="text-muted">` + currency + ' ' + cost + `</small>
        </div>
    
        <div class="text-muted"> <h5>` + description + `</h5></div>
    </div>
    
</div>
</div>

 `

            }

        })

}); 

