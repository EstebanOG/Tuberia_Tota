var mymap = L.map('mapid').setView([5.5378, -72.9307], 11);
var polyline = L.layerGroup().addTo(mymap);
var markerGroup = L.layerGroup().addTo(mymap);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(mymap);

function ubicarPunto(item){
    L.marker([item.Latitud, item.Longitud]).addTo(markerGroup);
}

function borrarMarkets(){
    markerGroup.clearLayers();
    polyline.clearLayers();
}

function pintarTuberia(datos, parejas){
    /*var latlngs = [
/*        [45.51, -122.68],
        [37.77, -122.43],
        [34.04, -118.2]
    ];
    */
	console.log(parejas);
    for(let item of parejas){
        //console.log(item);
        let latlngs = [];
        latlngs.push([datos[item.element1].Latitud,datos[item.element1].Longitud]);
        latlngs.push([datos[item.element2].Latitud,datos[item.element2].Longitud]);

        L.polyline(latlngs, {color: 'red'}).addTo(polyline);
    }
    

}
