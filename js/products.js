document.addEventListener("DOMContentLoaded", function (e) {

  const ORDER_ASC_BY_NAME = "AZ";
  const ORDER_DESC_BY_NAME = "ZA";
  const ORDER_BY_PROD_COUNT = "Cant.";


  function sortmyproducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
      result = array.sort(function (a, b) {
        if (a.cost < b.cost) { return -1; }
        if (a.cost > b.cost) { return 1; }
        return 0;
      });
    } else if (criteria === ORDER_DESC_BY_NAME) {
      result = array.sort(function (a, b) {
        if (a.cost > b.cost) { return -1; }
        if (a.cost < b.cost) { return 1; }
        return 0;
      });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
      result = array.sort(function (a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);

        if (aCount > bCount) { return -1; }
        if (aCount < bCount) { return 1; }
        return 0;
      });
    }

    return result;
  }


  let array = [];
  let productos = "";
  function productList(lista) {

    for (let i = 0; i < lista.length; i++) {

      let name = lista[i].name
      let description = lista[i].description
      let cost = lista[i].cost
      let currency = lista[i].currency
      let imgs = lista[i].imgSrc
      let soldCount = lista[i].soldCount





      productos += ` 
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
            <div class="text-muted"> <h9>` + soldCount + `</h9></div>
            </div>
          </div>
          </div>
            `

    }
    return productos;
  };
  let autos = [];

  fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(data => {
      array = data

      productList(data)


      document.getElementById("producto").innerHTML = productos;


      for (let i = 0; i < data.length; i++) {
     
       autos.push(data[i])
        
      } 
    })

  document.getElementById("rangeFilterCount").onclick = function (e) {
    let minCost = document.getElementById("rangeFilterCountMin").value;
    let maxCost = document.getElementById("rangeFilterCountMax").value;

   

    filtro = autos.filter(function (fil) {

      return fil.cost >= minCost && fil.cost <= maxCost;
    })
    
    productos = "";

    productos = productList(filtro);

    document.getElementById("producto").innerHTML = productos;

  }


  document.getElementById("clearRangeFilter").onclick = function (e) {
    window.location.href = "products.html";
  }
  document.getElementById("sortAsc").onclick = function (e) {
   let listaordenada =  sortmyproducts(ORDER_ASC_BY_NAME, autos);
    productos = "";
    productos = productList(listaordenada);
    document.getElementById("producto").innerHTML = productos;

  }
  document.getElementById("sortDesc").onclick = function (e) {
    let listaordenada = sortmyproducts(ORDER_DESC_BY_NAME, autos);
    productos = "";
    productos = productList(listaordenada);
    document.getElementById("producto").innerHTML = productos;
  }
  document.getElementById("sortCount").onclick = function (e) {
    let listaordenada = sortmyproducts(ORDER_BY_PROD_COUNT, autos);
    productos = "";
    productos = productList(listaordenada);
    document.getElementById("producto").innerHTML = productos;
  }



}); document.getElementById("userFace").innerHTML = localStorage.getItem("mail");