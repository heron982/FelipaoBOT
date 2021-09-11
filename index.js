const Discord = require('discord.js');

const bot = new Discord.Client();
const { Database } = require('./Database.js')
const Embed = require('./info.js');
const env = require('./env.js');

const User = require('./user.js');


const serverID = env.var.environment === 'production ' ? '868571911356055593': '884519606218293310';

const canais = {
    recrutamento: {
        id: String
    },
    registro: {
        id: String
    }
}

bot.on('guildMemberAdd', async member => {
    User.addUser({
        id: member.user.id,
        name: member.user.username,
        nick: ''
    });
});

bot.on('ready', async function () {
    //setup

    const server = bot.guilds.cache.get(serverID); //servidor
    const guild = await bot.guilds.fetch(serverID);

    const db = new Database();
    const remoteUsers = await db.getUsuarios();

    server.members.fetch()
        .then(result => {
            let localUsers = [];
            result.forEach(member => localUsers.push({ name: member.user.username, id: member.user.id, count: 0 }));
            for (let remote = 0; remote < remoteUsers.length; remote++) {
                for (let local = 0; local < localUsers.length; local++) {
                    if (remoteUsers[remote].id === localUsers[local].id) {
                        localUsers[local].count++;
                    }
                }
            }
            for (let i = 0; i < localUsers.length; i++) {
                if (localUsers[i].count < 1) {
                    User.addUser(localUsers[i]); //adicionar usuario
                }
            }
        });

    const everyoneRoleId = guild.roles.everyone.id;
    const channelRecrutamento = await server.channels.create('bot-recrutamento', {
        permissionOverwrites: [
            {
                id: everyoneRoleId,
                deny: ['READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'MENTION_EVERYONE', 'ADD_REACTIONS']
            }
        ],
        rateLimitPerUser: 1,
        topic: 'Adicione aqui o seu nome de usuario da steam'
    }) //criart canal de recrutamento e pegar o ID do mesmo
        .then(channel => canais.recrutamento.id = channel.id);
    const channelInfo = await server.channels.create('bot-registros', { topic: 'usuários cadastrados' })
        .then(channel => canais.registro.id = channel.id);
});

bot.on("message", async function (message) {

    if (message.author.bot) return;

    const server = bot.guilds.cache.get(serverID); //servidor
    const guild = await bot.guilds.fetch(serverID); // guild

    const recruitChannel = server.channels.cache.get(canais.recrutamento.id);
    const registryChannel = server.channels.cache.get(canais.registro.id);
    const currentChannel = message.channel.id;

    if (currentChannel == recruitChannel) {
        const db = new Database();
        const usuariosDB = await db.getUsuarios();
        //verifico se o usuario já tem o nick da steam, se já tiver bloquear a mensagem. se não, cadastrar o nick e dar a role.
        const user = await db.findUser(message.author.id);

        if (user[0].id === message.author.id) {

            if (user[0].nick_steam !== '') {

                bot.users.cache.get(message.author.id).send('Voce jà cadastrou seu nick porra!')
                message.delete(); //remover mensagem
            } else {

                db.updateUser(message.author.id, message.content); //adicionar no banco //adicionar role membro avanti
                let role = guild.roles.cache.find(role => role.name == 'Membro Avanti')
                if (typeof role === undefined) {
                    //criar role básica
                    role = await guild.roles.create({
                        data: {
                            name: 'Membro Avanti',
                            color: 'GREEN'
                        },
                        reason: 'Membros que possuem a steam cadastrada'
                    });
                }
                message.member.roles.add(role);
                registryChannel.send({ embed: Embed(message.author.username) });
            }
        }
    }

});

bot.login(process.env.DISCORD_TOKEN);