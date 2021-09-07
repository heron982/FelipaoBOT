const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const MongoDB = require('./mongodb.js');

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

  MongoDB.query(async client => {
    let remoteUsers = await MongoDB.getUsuarios(client);
    
    server.members.fetch().then(result => {
      let localUsers = [];
      
      result.forEach(member => localUsers.push({ name: member.user.username, id: member.user.id, count: 0 }))
      
      for(let remote = 0; remote < remoteUsers.length; remote++) {
        for(let local = 0; local < localUsers.length; local++) {
          if(remoteUsers[remote].id === localUsers[local].id) {
            localUsers[local].count++;
          }
        }
      }

      for(let i = 0; i < localUsers.length; i++) {
        if(localUsers[i].count < 1) {
          MongoDB.query(client => MongoDB.insertUsuarioCollection(client, localUsers[i]));
        }
      }
    });
    
  })

  
  

  

});

client.on("message", function (message) {
  if (message.author.bot) return;

});

client.login(config.BOT_TOKEN);