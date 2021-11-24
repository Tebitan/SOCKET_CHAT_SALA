class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, name, sala) {
        const persona = { id, name, sala };
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        const persona = this.personas.filter(persona => persona.id === id)[0];
        if (!persona) {
            return null;
        }
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPeronasPorSala(sala = '') {
        return this.personas.filter(persona => persona.sala === sala);
    }

    borrarPersona(id) {
        const personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}