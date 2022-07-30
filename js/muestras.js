import {traerDatos} from './stock.js'
const DOMProductos = document.getElementById('productos')

 window.addEventListener('DOMContentLoaded', () => {
    renderizarDOM()
 })

 
const renderizarDOM = async () => {
    let productos = await traerDatos()
    let productosPanelVista = ''
    productos.forEach(producto => {

        const {Img, Nombre,Desc,Precio,Id }= producto
         {
            productosPanelVista += 
            `
    
            <div class="col-12 m-3 p-2 col-lg-3 col-md-3 col-sm-3" >
            <div class="cards">
                <div class="card-body">
                <div class="d-flex justify-content-center">
                <img id="fotoProducto" src="${Img}" class="imgItem card-img-top tituloItem">
                </div>
                
                <p class="mt-3" id="tituloProducto" >${Nombre}<p>
                <p id="descProducto" >${Desc}</p>
                <div class="d-flex align-item-end justify-content-center ">
                <button data-id="${Id}" id="mybtn" name="btnComprar" class="addtoCart btn btn-dark">Seleccionar</button></div>
                
                </div>
            </div>
            </div>
    
            
       
        `
        }
    });
    DOMProductos.innerHTML = productosPanelVista
}

DOMProductos.addEventListener('click', (e) => {
    if(e.target.id=== "mybtn"){
        guardarProductos(e.target.dataset.id)
    }
})

const guardarProductos = async(id) => {
  let productos = await traerDatos()
  let productoEncontrado = productos.find((producto) => producto.Id === parseInt(id));
  let productoStorage = JSON.parse(localStorage.getItem(id))
  if(productoStorage === null){
    localStorage.setItem(id, JSON.stringify({...productoEncontrado, Cantidad:1}))
  }else{
     let productoExiste =JSON.parse(localStorage.getItem(id))
     productoExiste.Cantidad = productoExiste.Cantidad + 1
     productoExiste.Precio = productoExiste.Precio + productoEncontrado.Precio
     console.log(productoExiste)
     localStorage.setItem(id,JSON.stringify(productoExiste))
     recorrerStorage()
    }
}
 

Object.keys(localStorage).forEach((key) => console.log(JSON.parse(localStorage.getItem(key))))



const btnCompletarCompra = document.querySelector("#btnCompletarCompra")

btnCompletarCompra.addEventListener('click', () => {
    Swal.fire({
        title: '¡Tu pedido fue procesado con éxito!',
        text: 'Muchas gracias por tu compra :)',
        icon: 'success',
        showConfirmButton: false,
        allowOutsideClick: true,
        footer: `<a class="btn btn-primary" href="index.html">Aceptar</a>`
    })
})



