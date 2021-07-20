function distance(lat1, lon1, lat2, lon2){
    earthRadius = 6371; // km

    lat1 = (Math.PI/180)*lat1;
    lon1 = (Math.PI/180)*lon1;
    lat2 = (Math.PI/180)*lat2;
    lon2 = (Math.PI/180)*lon2;

    dlon = (lon2 - lon1);
    dlat = (lat2 - lat1);

    sinlat = Math.sin(dlat / 2);
    sinlon = Math.sin(dlon / 2);

    a = (sinlat * sinlat) + Math.cos(lat1) * Math.cos(lat2) * (sinlon * sinlon);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    distanceInMeters = earthRadius * c;
        
    return distanceInMeters;
}

function penalizacion(alturaLaguna ,altura, distancia){
    p = (distancia*5/100)*(altura-alturaLaguna)
    return p > 0 ? p:0;
}

function costo(distancia, penalizacion){
    return distancia + penalizacion;
}

