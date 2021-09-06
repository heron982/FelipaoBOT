const { MongoClient } = require('mongodb');

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function insertUsuarioCollection(client, usuario) {
    const database = client.db("Felipao");
    const usuarios = database.collection("usuarios");

    const usuario_template = {
        name: usuario.name,
        id: usuario.id,
    }
    const result = await usuarios.insertOne(usuario_template);
    console.log(`${result.insertCount} usuarios foram adicionados`);
}  

async function getUsuarios(client) {
    const database = client.db("Felipao");
    const usuarios = await database.collection("usuarios").find({}).toArray();

    return usuarios;
}

async function main(callback) {
    const uri = "mongodb+srv://admin:rpU9FsfI1cIcz3Qv@cluster0.xvvlz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await callback(client)
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

module.exports = { main, listDatabases, getUsuarios, insertUsuarioCollection }
