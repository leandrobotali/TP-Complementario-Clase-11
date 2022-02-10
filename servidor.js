const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const Producto = require('./Producto.js');
const Contenedor = require('./Contenedor.js');
let contenedor1 = new Contenedor.Contenedor('mensajes.txt')

const MENSAJES = []

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const path = require('path');

const productosRouter = require('./routes/productos');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/productos', productosRouter);

io.on("connection", (socket) => {
    console.log("Se ha conectado un cliente");
    io.sockets.emit("actualizarProductos", Producto.getAll())
    socket.on("new_message", data => {
        MENSAJES.push(data);
        io.sockets.emit("messages_received", MENSAJES);
        contenedor1.save(MENSAJES)     
    })
    io.sockets.emit("messages_received", MENSAJES);
})


// app.use(function(req,res,next){
//     req.io = io;
//     next();
// })

app.io = io;

httpServer.listen(8080)

// const server = app.listen(8080,() => {
//     console.log(`puerto ${server.address().port}`);
// })