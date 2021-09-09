const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();
const { Database } = require('./Database.js')


const serverID = '884519606218293310';
const ch = {
  id: String
}

bot.on('guildMemberAdd', async member => {
  const db = new Database();
  const inserir = await db.insertUsuarioCollection({
    id: member.id,
    name: member.user,
    nick: ''
  });
});

bot.on('ready', async function () {
  
  const server = bot.guilds.cache.get(serverID); //servidor
  const guild = await bot.guilds.fetch(serverID);

  // server.members.cache.forEach(async member => {
  //   const inserir = await db.insertUsuarioCollection({
  //     id: member.user.id,
  //     name: member.user.username,
  //     nick: ''
  //   });
  // });

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
    ch.id = channel.id;
  });
});

bot.on("message", async function (message) {
  
  if (message.author.bot) return;

  const server = bot.guilds.cache.get(serverID); //servidor

  const recruitChannel = server.channels.cache.get(ch.id);
  const currentChannel = message.channel.id;

  if(currentChannel == recruitChannel) {
    const db = new Database();
    const usuariosDB = await db.getUsuarios();
    //verifico se o usuario já tem o nick da steam, se já tiver bloquear a mensagem. se não, cadastrar o nick e dar a role.
    const user = await db.findUser(message.author.id);
    if(user[0].id === message.author.id) {
      if(user[0].nick_steam !== '') {
        message.channel.send('Voce jà cadastrou seu nick pora!');
      } else {
        message.channel.send('Nick cadastrado com sucesso');
      }
    }
    console.log(user[0].id)
  }

});

bot.login(config.BOT_TOKEN);