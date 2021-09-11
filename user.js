const { Database } = require('./Database.js');

module.exports = {
    async addUser(param) {
        const db = new Database();
        let template = {
            id: param.id,
            name: param.name,
            nick: param.nick
        };
        const inserir = await db.insertUsuarioCollection(template)
    },


}