const { io } = require('../server');
const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');


const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {
        if (!usuario.name || !usuario.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y sala es necesario'
            });
        }
        client.join(usuario.sala);
        usuarios.agregarPersona(client.id, usuario.name, usuario.sala);
        client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPeronasPorSala(usuario.sala));
        callback(usuarios.getPeronasPorSala(usuario.sala));
    });

    client.on('disconnect', () => {
        const personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.name } abandonó el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPeronasPorSala(personaBorrada.sala));
    });

    client.on('crearMensaje', (data) => {
        const persona = usuarios.getPersona(client.id);
        client.broadcast.to(persona.sala).emit('crearMensaje', crearMensaje(persona.name, data.mensaje));
    });

    //mensajes Privados
    client.on('mensajePrivado', data => {
        const persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.name, data.mensaje));
    });


});