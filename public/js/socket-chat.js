var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala es necesario');
}

var usuario = {
    name: params.get('name'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    socket.emit('entrarChat', usuario, function(resp) {
        renderizarUsuarios(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

//cuando un usuario entra o sale del chat 
socket.on('listaPersonas', function(personas) {
    renderizarUsuarios(personas);
});

//mensajes Provados 
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});