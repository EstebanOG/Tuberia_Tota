document.querySelector('#btn').addEventListener('click',agregarPoblacion);
var datos;
leerDatos();

function obtenerDatos(){
    return datos;
}

function leerDatos(){
    
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET','./data/data.JSON', true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            datos = JSON.parse(this.responseText);
            console.log(datos);
            calcularValores();
            pintarTabla();
            
            
        }
    } 
}

function calcularValores(){
    for(let item of datos){
        if(item.id != 0){
            item.Distancia = distance(datos[0].Latitud, datos[0].Longitud, item.Latitud,item.Longitud);
            item.Penalizacion = penalizacion(datos[0].Altura,item.Altura,item.Distancia);
            item.Costo = costo(item.Distancia, item.Penalizacion);
        }
    }
}
function pintarTabla(){
    let datos_tabla = document.querySelector('#datos_tabla');
            datos_tabla.innerHTML = '';
            borrarMarkets();
            generarParejas(datos);
            for(let item of datos){
                ubicarPunto(item);
                datos_tabla.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.Poblacion}</td>
                        <td>${item.Altura}</td>
                        <td>${item.Latitud.toFixed(4)}</td>
                        <td>${item.Longitud.toFixed(4)}</td>
                        <td>${item.Distancia.toFixed(4)}</td>
                        <td>${item.Penalizacion.toFixed(4)}</td>
                        <td>${item.Costo.toFixed(4)}</td>
                    </tr>
                `
            }

}

function agregarPoblacion(){
    
    let nuevaData = datos.push({
        "id":datos[datos.length -1].id+1,
        "Poblacion":prompt("Ingrese el nombre de la población:", ""),
        "Altura":parseInt(prompt("Ingrese la altura de la población:", "")),
        "Latitud":parseFloat(prompt("Ingrese la latitud de la población:", "")),
        "Longitud":parseFloat(prompt("Ingrese la longitud de la población:", "")),
        "Distancia":0,
        "Penalizacion":0,
        "Costo":0
    });
    console.log(datos);
    calcularValores();
    pintarTabla();
}