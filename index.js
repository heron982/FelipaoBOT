const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();
const { Database } = require('./Database.js')
const { Channel } = require('./Channel.js');

const ch = new Channel();
const serverID = '884519606218293310';

bot.on('ready', async function () {
  const server = bot.guilds.cache.get(serverID); //servidor
  const guild = await bot.guilds.fetch(serverID);
  const everyoneRoleId = guild.roles.everyone.id;
  const channel = await server.channels.create('recrutamento', {
    permissionOverwrites: [
      {
        id: everyoneRoleId,
        deny: ['READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'MENTION_EVERYONE', 'ADD_REACTIONS']
      }
    ]
  }) //criart canal de recrutamento e pegar o ID do mesmo
    .then(channel => {
      ch.setChannel(channel.id)
    });
});

bot.on("message", async function (message) {
  const recruitMessages = [];
  if (message.author.bot) return;
  const server = bot.guilds.cache.get(serverID); //servidor
  const recruitChannel = server.channels.cache.get(ch.getChannel());
   
  const currentChannel = message.channel.id;

  if(currentChannel == recruitChannel) {
    const db = new Database();
    const usuariosDB = await db.getUsuarios();
    console.log(usuariosDB);
    recruitMessages.push({ user: message.author.username, content: message.content, id: message.author.id });
  }

});

bot.login(config.BOT_TOKEN);