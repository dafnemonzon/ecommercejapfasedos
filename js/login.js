//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("bttn").addEventListener("click", function(e){
 var mail= document.getElementById("inputemail").value;
 var contra= document.getElementById("inputpassword").value;
        if ((mail != "")&&(contra != "")){
            window.location.href="indexx.html";
        }

     localStorage.setItem("mail", mail);
    });

   

       
        
  
        
});localStorage.clear();