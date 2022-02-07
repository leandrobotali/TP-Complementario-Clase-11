class Producto{
    constructor(titulo, precio, thumbnail){
        this.titulo = titulo;
        this.precio = precio;
        this.thumbnail = thumbnail;
    }
}

let Productos = [{
        "titulo": "escuadra",
        "precio": "123",
        "thumbnail": "https://via.placeholder.com/100" 
    },{
        "titulo": "regla",
        "precio": "456",
        "thumbnail": "https://via.placeholder.com/100"
    },{
        "titulo": "lapiz",
        "precio": "789",
        "thumbnail": "https://via.placeholder.com/100"
}];

function getAll(){
    return Productos
}

function save(titulo, precio, thumbnail){
    let obj = new Producto(titulo, precio, thumbnail)

    let idMasAlto = 0;

    if (Productos.length > 0) {
        idMasAlto = Productos.reduce((acum, proximo) => acum > proximo.id ? acum : proximo.id, 0);
    }
    obj.id = parseInt(idMasAlto) + 1

    Productos.push(obj);

    return obj
}

function getById(id) {
    const objError = { "error": "producto no encontrado" }
    const find = Productos.find(producto => producto.id == id) || objError;
    return find
}

function updateById(id, titulo, precio, thumbnail) {
    const objError = { "error": "producto no encontrado" }
    const find = Productos.find(producto => producto.id == id) || objError;
    if (find !== objError) {
        find.titulo = titulo;
        find.precio = precio;
        find.thumbnail = thumbnail;
    }

    return find
}

function deleteById(id) {
    const objError = { "error": "producto no encontrado" }
    const find = Productos.find(producto => producto.id == id) || objError;
    if (find !== objError) {
        Productos = Productos.filter(producto => producto.id != id);

        return Productos
    } else {
        return find
    }
}

module.exports ={Producto, Productos, getAll, save, getById, updateById, deleteById};