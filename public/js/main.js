const socket = io();

document.querySelector("#formAgregarProduco").addEventListener("submit",async (e) =>{
    e.preventDefault();

    await fetch("/api/productos",{
        method: "post",
        headers:{
            'content-Type' : 'application/json'
        },
        body: JSON.stringify({
            titulo: document.querySelector("#inputProducto").value,
            precio: document.querySelector("#precioProducto").value,
            thumbnail: document.querySelector("#thumbnailProducto").value
        })
    })
})

socket.on("actualizarProductos", async data => {
    mostrarProductos(data);
})

async function mostrarProductos (data) {
    const fetchTemplateHBS = await fetch("../views/list_products.hbs");
    const templateHBS = await fetchTemplateHBS.text();
    const template = Handlebars.compile(templateHBS);
    const html = template({products: data});
    document.querySelector("#list_Productos").innerHTML = html
}