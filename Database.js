const config = require('./config.json');
const { MongoClient } = require('mongodb');

class Database {
    constructor() {
        this.uri = config.URI_DB;
    }

    async insertUsuarioCollection(usuario) {
        const database = await this.connect();
        const usuarios = database.collection("usuarios");

        const usuario_template = {
            name: usuario.name,
            id: usuario.id,
        }
        const result = await usuarios.insertOne(usuario_template);
        console.log(`${result.insertCount} usuarios foram adicionados`);
    }

    async getUsuarios() {
        const database = await this.connect();
        const usuarios = await database.collection("usuarios").find({}).toArray();
        connection.close();

        return usuarios;
    }

    async connect() {
        try {
            const client = new MongoClient(this.uri);
            const conn = await client.connect();
            const database = conn.db("Felipao") //selecionando banco

            return database;
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = { Database }
