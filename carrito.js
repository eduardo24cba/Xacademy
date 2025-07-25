let carrito = {
    precioTotal: 0,
    productos: [],
}

const productosDelSuper = [
    { nombre: "Queso", precio: 10, categoria: 'lacteos' },
    { nombre: "Gaseosa", precio: 5, categoria: 'bebidas' },
    { nombre: "Cerveza", precio: 20, categoria: 'bebidas' },
    { nombre: "Arroz", precio: 7, categoria: 'alimentos' },
    { nombre: "Fideos", precio: 5, categoria: 'alimentos' },
    { nombre: "Lavandina", precio: 9, categoria: 'limpieza' },
    { nombre: "Shampoo", precio: 3, categoria: 'higiene' },
    { nombre: "Jabon", precio: 4, categoria: 'higiene' },
]

function insertarProducto(producto, cantidad, precio){
  producto.cantidad = cantidad
  carrito.productos.push(producto)
  carrito.precioTotal += precio * cantidad
}
function existeProducto(producto) {
    //si el producto no existe en el super
    return typeof producto === "undefined"
}
function agregarProducto(productoELegido, cantidad){
    //obtenemos una copia para no modificar el array original
    let copiaProductosDelSuper = structuredClone(productosDelSuper)
    //que ambas cadenas sean iguales
    //buscamos el producto en los productos del super
    producto = copiaProductosDelSuper.find(({nombre}) => 
                   nombre.toLowerCase() === productoELegido.toLowerCase()
                  )
    
    if(existeProducto(producto))return 0
    //si el carrito tiene productos 
    if(carrito.productos.length > 0){
      //si el producto esta en el carrito actualizamos
      //de lo contrario lo agregamos
      let productoCarrito = carrito.productos.find(
        ({nombre}) => nombre.toLowerCase() === productoELegido.toLowerCase())
      if(productoCarrito){
              productoCarrito.precio += producto.precio * cantidad
              productoCarrito.cantidad += cantidad
            }
      else{
        insertarProducto(producto, cantidad, producto.precio)
      }
    }
    else{
      //es el primer producto en el carrito
      insertarProducto(producto, cantidad, producto.precio)
    }
  
}

function eliminarProducto(nombreProducto){
  //el carrito no tiene productos
  if(!carrito.productos.length > 0){
    return 0
  }
  
  let producto = carrito.productos.find(
    ({nombre}) => nombre.toLowerCase() === nombreProducto.toLowerCase())
  
  //el producto no esta en el carrito
  if(existeProducto(producto))return 0
  
  
  let nuevoCarrito = carrito.productos.filter(({nombre}) => nombre.toLowerCase() !== nombreProducto.toLowerCase())
  //let index = carrito.productos.indexOf(producto)
  carrito.productos = nuevoCarrito
  //actualizamos el precio total del carrito
  carrito.precioTotal = carrito.precioTotal - (producto.precio * producto.cantidad) 
}

function obtenerCategorias(){
  return carrito.productos.map(({categoria}) => categoria)
}

agregarProducto("Fideos", 3)
console.log(carrito.precioTotal)
agregarProducto("Queso", 28)
console.log(carrito.precioTotal)
agregarProducto("Shampoo", 2)

console.log(carrito.productos)
eliminarProducto("Queso")
console.log(carrito.productos)
eliminarProducto("Shampoo")//devuelve 0 porque no existe en el carrito

console.log(carrito.precioTotal)
console.log(carrito.productos)
console.log(carrito.precioTotal)
