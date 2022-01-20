const express = require('express');
const router = express.Router();

const Producto = require('../Producto');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(201).send(Producto.getAll())
});

router.get('/:id', function(req, res, next) {    
    res.status(201).send(Producto.getById(req.params.id))
});

router.post('/', function(req, res, next) {
    if (req.body.titulo !== undefined && req.body.precio !== undefined && req.body.thumbnail !== undefined) {
        res.status(201).send(Producto.save(req.body.titulo, req.body.precio, req.body.thumbnail));
    }
    else{
        res.status(400).send({error: "datos incorrectos"})
    }
});

router.put('/:id', function(req, res, next) {    
    res.status(201).send(Producto.updateById(req.params.id, req.body.titulo, req.body.precio, req.body.thumbnail))
});

router.delete('/:id', function(req, res, next) {
    res.send(Producto.deleteById(req.params.id))
});

module.exports = router;