const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const { main } = require('./mongodb.js');

const cargos = {
  "Membro Avanti": {},
  "Ademir da Guia": {},
  "Matado de Onça": {},
  "ADVERTENCIA 1": {},
  "ADVERTENCIA 2": {},
  "Palestrino": {},
  "Santista": {}
}



client.on('ready', function (message) {
    const server = client.guilds.cache.get('884519606218293310'); //servidor
    main().catch(console.error);
});

client.on("message", function (message) {
    if(message.author.bot) return;
    
});

client.login(config.BOT_TOKEN);