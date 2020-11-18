function AgregarProducto(){
    document.getElementById("productos").insertRow(-1).innerHTML = document.getElementById("producto").innerHTML;
}

window.onload = load;

function load(){

}

function ChangeSelectProducto(id,element){

    let parent = element.parentElement.parentElement;
    let nombre = parent.querySelector("#nombre");
    let precio = parent.querySelector("#precio");
    let costo = parent.querySelector("#costo");
    let cantidad = parent.querySelector("#cantidad");

    for (let index = 0; index < productosJS.length; index++) {
        const element = productosJS[index];
        if(element.id == id){
            nombre.value = element.nombre;
            precio.value = element.precio;
            costo.value = precio.value * cantidad.value;
        }
    }
    SumarTotal();
}

function ChangeSelectCantidad(id,element){

    let parent = element.parentElement.parentElement;
    let costo = parent.querySelector("#costo");
    let cantidad = parent.querySelector("#cantidad");
    let precio = parent.querySelector("#precio");

    costo.value = precio.value * cantidad.value;

    SumarTotal();
}

function SumarTotal(){
    let costos = document.querySelectorAll("#costo");
    let suma = Number(0);

    for (let index = 0; index < costos.length; index++) {
        const element = costos[index];
        suma += Number(element.value) ;
    }

    document.querySelector("#total").value = suma;
}