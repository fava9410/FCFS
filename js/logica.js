$(document).ready(function(){
  var tiemposRafaga = ["Tiempo Rafaga"], procesos = ["Proceso"], llegada = ["Tiempo de llegada"], tiempoFinalizacion = ["Tiempo de Finalizacion"], tiempoRetorno = ["Tiempo de Retorno"], tiempoEspera = ["Tiempo de Espera"], tiempoComienzo = ["Tiempo de Comienzo"];
  var nombresProcesos = ["A","B","C","D","E","F","G","H","I","J","K","L"];
  var nomcolores = ["Crimson","blue","green","brown","yellow","purple","magenta","gray","Coral","DarkGreen"];
  var colores = ["red","white"];
  var alea = 0, intervalo = 10, tamaño = 20, contador = 0, contadorProcesos = 0;
  var matriz = [procesos,llegada,tiemposRafaga,tiempoComienzo,tiempoFinalizacion,tiempoRetorno,tiempoEspera];  
  
  $("#agregar").click(function(){
    contadorProcesos++;
    procesos.push(nombresProcesos[contadorProcesos-1]);
    colores[contadorProcesos] = nomcolores[contadorProcesos-1];
    colores.push("white");
    iniciales();
    rellenarTabla();
    borrarTabla();
    dibujarTabla();
  });
  setInterval(pintar_procesos,1000);
  function iniciales(){
    llegada[contadorProcesos] = contador;
    tiemposRafaga[contadorProcesos] = Math.round(Math.random()*6+1);
  }

  function rellenarTabla(){
    if(llegada[contadorProcesos]>=tiempoFinalizacion[contadorProcesos-1] || contadorProcesos==1){
      tiempoFinalizacion[contadorProcesos] = llegada[contadorProcesos]+tiemposRafaga[contadorProcesos];
    } else{
      tiempoFinalizacion[contadorProcesos] = tiempoFinalizacion[contadorProcesos-1]+tiemposRafaga[contadorProcesos];  
    }    
    tiempoRetorno[contadorProcesos] = tiempoFinalizacion[contadorProcesos]-llegada[contadorProcesos];
    tiempoEspera[contadorProcesos] = tiempoRetorno[contadorProcesos]-tiemposRafaga[contadorProcesos];
    tiempoComienzo[contadorProcesos] = llegada[contadorProcesos]+tiempoEspera[contadorProcesos];
  }

  function dibujarTabla(){
    var body = document.getElementById("tabla");
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
   
    for (var j = 0; j < procesos.length; j++) {
      var hilera = document.createElement("tr");   
      for (var i = 0; i < matriz.length; i++){
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(matriz[i][j]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }   
      tblBody.appendChild(hilera);
    }   
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("border", "2");
  }

  function borrarTabla(){
    var tabla = $("#tabla").empty();
  }

  function pintar_procesos(){   
    console.log(contador);
    var elemento = document.getElementById("lienzo");
    var lienzo = elemento.getContext('2d');    
    for(var i=1; i<procesos.length; i++){ 
      if(contador >= tiempoComienzo[i] && contador<tiempoFinalizacion[i]){ 
        lienzo.fillStyle = colores[i];      
      }
      else{
        if(llegada[i]>contador || contador>=tiempoFinalizacion[i]){       
          lienzo.fillStyle = colores[colores.length-1];
        }
        else{
          lienzo.fillStyle = colores[0];
        }
      }
      lienzo.fillRect(contador*(tamaño+intervalo)+10, i*(tamaño+intervalo),tamaño,tamaño);       
    }
    contador++;
  }
});