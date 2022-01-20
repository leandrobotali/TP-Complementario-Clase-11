const express = require('express');

const app = express();
const path = require('path');

const productosRouter = require('./routes/productos');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/productos', productosRouter);

const server = app.listen(8080,() => {
    console.log(`puerto ${server.address().port}`);
})