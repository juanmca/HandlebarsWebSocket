

console.log(' Script del REALTIMEPRODUCTS')



const socket = io() //FRONTEND
socket.on("nuevoProducto", producto=>{
    let ulProductos = document.querySelector('ul');
    let liNuevoProducto = document.createElement('li');
    liNuevoProducto.innerHTML = producto;
    ulProductos.append(liNuevoProducto)
    
   
})
socket.on("deleteProducto", borrar=>{
    const lista1 = document.getElementById("lista1")

    let li = Array.from(document.getElementsByTagName('li'))
   
    let ultimo = li[li.length-1];
    
    lista1.removeChild(ultimo)


 
   
    
   
})