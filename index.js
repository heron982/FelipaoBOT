const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const { main, getUsuarios, insertUsuarioCollection } = require('./mongodb.js');

const cargos = {
  "Membro Avanti": {},
  "Ademir da Guia": {},
  "Matado de Onça": {},
  "ADVERTENCIA 1": {},
  "ADVERTENCIA 2": {},
  "Palestrino": {},
  "Santista": {}
}

client.on("guildMemberAdd", member => {
  
});

client.on('ready', async function () {
    const server = client.guilds.cache.get('884519606218293310'); //servidor
  
    main(async client => {
      let usuariosDB = await getUsuarios(client);

      server.members.cache.forEach(member => {
        usuariosDB.forEach(usuario => {
          if(member.user.id !== usuario.id) {
            main(client => insertUsuarioCollection(client, {
              name: member.user.username,
              id: member.user.id,
            }))
          }
        })
      });
    })

});

client.on("message", function (message) {
    if(message.author.bot) return;
    
});

client.login(config.BOT_TOKEN);