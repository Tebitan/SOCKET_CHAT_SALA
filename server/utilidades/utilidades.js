const crearMensaje = (name, mensaje) => {

    return {
        name,
        mensaje,
        fecha: new Date().getTime()
    }

}

module.exports = {
    crearMensaje
}