var parejasPoblaciones = [];
var parejasSolucion = [];
var pq = new PriorityQueue();
// 1. Insertar elemento
/*
pq.enqueue('abc',1);
pq.enqueue('kjh',998);
pq.enqueue('hig',100);
pq.enqueue('def',10);
pq.enqueue('kjh',1000);
console.log(pq);*/

// 2. Eliminar elementos
//console.log(pq.dequeue());

// Cola de prioridad del paquete
function PriorityQueue(){

    // Para guardar los datos, encapsule una clase, la clase interna
    function QueueElement(element1,element2, priority){
        this.element1 = element1;
        this.element2 = element2;
        this.priority = priority;
    }

    // Atributos del paquete
    this.items = [];

    // 1. Implementar el método de inserción
    PriorityQueue.prototype.enqueue = function(element1, element2, priority){
    // 1. Crear objeto QueueElement
    let queueElement = new QueueElement(element1, element2, priority);

    // 2. Determinar si la cola actual está vacía
    if(this.items.length == 0){
        this.items.push(queueElement);
    } else{
        let flag = false;
        for(let i =0 ; i< this.items.length; i++){
            if(queueElement.priority < this.items[i].priority){
                this.items.splice(i,0,queueElement);
                flag = true;
                break;
            }
        }
        if(!flag){
            this.items.push(queueElement);
        }
    }
    }
    // 2. Eliminar elementos de front-end de la cola
    PriorityQueue.prototype.dequeue = function(){
        return this.items.shift()
    }
    // 3. Ver los elementos de la interfaz
    PriorityQueue.prototype.front = function(){
        return this.items[0];
    }
    // 4. Comprueba si la cola está vacía
    PriorityQueue.prototype.isEmpty = function(){
        return this.items.length == 0;
    }
    // 5. Ver el número de elementos en la cola
    PriorityQueue.prototype.size = function(){
        return this.items.length;
    }
    //6.toString método
    PriorityQueue.prototype.toString = function(){
        let resultString = '';
        for(let i = 0; i < this.items.length; i++){
            resultString += this.items[i] + ',';
        }
        return resultString;
    }
}

function generarParejas(datos){
    //let datos = obtenerDatos();
    pq.items = [];
    
    for(let i = 0; i<datos.length; i++){
        for(let j = 0; j<datos.length; j++){
            if(i!=j && j>i){
                distancia = distance(datos[i].Latitud, datos[i].Longitud, datos[j].Latitud, datos[j].Longitud);

                let nuevaPareja = parejasPoblaciones.push({
                    "pobla1": i,
                    "pobla2": j,
                    "Distancia":distancia
                    });

                pq.enqueue(i,j,distancia);
            } 
        }
    }
    console.log(pq);
    console.log(parejasPoblaciones);
    solucion();
    
}

function solucion(){
    parejasSolucion = [];
    let datos = obtenerDatos();
    let a=0, b =0, ind = 0;
    var mySet  =[];
    for(let i = 0; i< datos.length; i++){
        e = new Set();
        e.add(i);
        mySet.push(e);
    }
    while(mySet.length != 1){
        let parejaAct = pq.dequeue();
        
        for(let s of mySet){
            //console.log(s);
            if(s.has(parejaAct.element1)){
                a = ind;
            }

            if(s.has(parejaAct.element2)){
                b = ind;
            }
            ind++;
        }
        ind = 0;
        if ( a == b){

        }else{
            parejasSolucion.push(parejaAct);
            for(let item of mySet[b]){
                mySet[a].add(item);
            }
            
            mySet.splice(b,1);
            console.log(mySet.length)
        }
        a=0;
        b=0;
    }
    console.log(mySet);
    console.log(parejasSolucion);
    pintarTuberia(datos, parejasSolucion);
}