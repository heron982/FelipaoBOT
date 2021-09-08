const { MongoClient } = require('mongodb');

class Database {
    constructor() {
        this.uri = "mongodb+srv://admin:rpU9FsfI1cIcz3Qv@cluster0.xvvlz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        this.client = new MongoClient(this.uri);
    }

    async insertUsuarioCollection(usuario) {
        this.connect().then(conn => {
            const database = conn.db("Felipao");
            const usuarios = database.collection("usuarios");
    
            const usuario_template = {
                name: usuario.name,
                id: usuario.id,
            }
            const result = await usuarios.insertOne(usuario_template);
            console.log(`${result.insertCount} usuarios foram adicionados`);
        });
       
    }

    async getUsuarios() {
        this.connect().then(conn => {
            const database = conn.db("Felipao");
            const usuarios = await database.collection("usuarios").find({}).toArray();
            return usuarios;
        });
    }

    async connect() {
        new Promise((resolve, reject) => {
            try {
                await this.client.connect();
                resolve(this.client)
            } catch (e) {
                reject(e);
            } finally {
                await this.client.close();
            }
        });
    }
}


module.exports = { Database }
