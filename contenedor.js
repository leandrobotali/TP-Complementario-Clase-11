const fs = require('fs');

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    save(mensajes) {
        let pormesa = new Promise((resolve, reject) => {
            let arrayMensajes = JSON.stringify(mensajes);
            fs.promises.writeFile(`./public/${this.nombreArchivo}`, arrayMensajes)
                .then(
                    resolve("mensajes guardados")
                )
                .catch(err => {
                    reject(console.log(err));

                })
        })
        return pormesa;
    }

    getAll(){
        let pormesa = new Promise((resolve, reject) => {
            fs.promises.readFile(`./public/${this.nombreArchivo}`, 'utf-8')
                .then(contenido => {
                    let arrayProductos = JSON.parse(contenido, 'utf-8');
                    resolve(arrayProductos);
                })
                .catch(err => {
                    reject('error de lectura');

                })
        })
        return pormesa;
    }
}

module.exports = {Contenedor}