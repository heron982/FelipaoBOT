const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const { Database } = require('./Database.js')

const db = new Database();

client.on("guildMemberAdd", member => {
  
});

client.on('ready', async function () {
  const server = client.guilds.cache.get('884519606218293310'); //servidor

});

client.on("message", function (message) {
  if (message.author.bot) return;

});

client.login(config.BOT_TOKEN);