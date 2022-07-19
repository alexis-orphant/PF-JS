// clase contructora
class Computacion{
    constructor (id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// creo los objetos y los agrego al array
const productos =[];
productos.push(new Computacion(1, "Mouse Gamer", 12500));
productos.push(new Computacion(2, "Teclado Gamer", 15000));
productos.push(new Computacion(3, "Monitor Gamer", 40000));
productos.push(new Computacion(4, "Auriculares Gamer", 22000));
productos.push(new Computacion(5, "Mouse Pad", 2500));
productos.push(new Computacion(6, "Parlantes", 12500));
productos.push(new Computacion(7, "Silla Gamer", 94300));

// desestructuracion del objeto
const {id, nombre, precio} = Computacion;

// array que va a contener lo productos agregados al carrito
let carritoCompra = [];

// obtenemos el div al qe vamos a agregar los productos

const divProductos = document.getElementById("productos");

// agregamos los productos al html recorriendo los arrays
for(const producto of productos) {
    // creo un div para cada elemeno del array
    const div = document.createElement("div");
    div.className = "card mx-auto my-2 fondo-card";
    div.style.width = "18rem";

    // contenido html del div
    div.innerHTML = `
    <img src="#" class="card-img-top" id=imagen-${producto.id} alt=imagen-${producto.nombre}>
    <div class="card-body" id=card-${producto.id}>
    <h5 class="card-title text-ligth">${producto.nombre}</h5>
    <p class="card-text text-ligth">$${producto.precio}</p>
    <button type="button" class="btn btn-primary" id=boton-${producto.id}>Agregar al carrito</button>`

    // agrego el div al html
    divProductos.append(div);

    // evento del boton, agregar al carrito
    const boton = document.getElementById(`boton-${producto.id}`);
    boton.addEventListener("click", () => {
        // alert de que se agrego al carrito
        alert("El producto fue agregado al carrito");
        
        // obtengo json del localStorage y lo parseo
        const carritoJson = localStorage.getItem("carrito");
        carritoCompra = JSON.parse(carritoJson) || [];
        // busco si el producto que agrego ya esta en el carrito
        const productoExistente = carritoCompra.findIndex( (productoCarrito) => {
            return productoCarrito.nombre === producto.nombre
        });
        
        // si el libro no existe
        if(productoExistente === -1){
            producto.cantidad = 1;
            carritoCompra.push(producto);
        }else {
            carritoCompra[productoExistente].cantidad += 1;
            carritoCompra[productoExistente].precio += producto.precio;
        };

        
        // agrego el producto al array y se guarda en localStorage
        localStorage.setItem("carrito", JSON.stringify(carritoCompra));

        // pongo la funcion aca para que funcione cuando se hace click
        mostrarProductosAgregadosAlCarrito();
    });
};


// funcion para mostrar lo que se agrega al carrito
function mostrarProductosAgregadosAlCarrito(){
    const divtotal = document.getElementById("total");
    divtotal.innerHTML ="";
    const carritoJson = localStorage.getItem("carrito");
    const carrito = JSON.parse(carritoJson);

    for(const prducto of carrito){
        const divComprado = document.createElement("div");
        divComprado.className = "row mx-auto pt-3";

        divComprado.innerHTML = `
                <h5 class="col mx-auto">Nombre: ${prducto.nombre}</h5>
                <h5 class="col mx-auto">Cantidad: ${prducto.cantidad}</h5>
                <h5 class="col mx-auto">Precio total: $${prducto.precio}</h5>`
        divtotal.append(divComprado);
    };
};

mostrarProductosAgregadosAlCarrito();

