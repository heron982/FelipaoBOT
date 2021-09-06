const { MongoClient } = require('mongodb');

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


async function main() {
    const uri = "mongodb+srv://admin:rpU9FsfI1cIcz3Qv@cluster0.xvvlz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

module.exports = { main }
