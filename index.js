const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const axios = require('axios');

const prefixo = '!';

client.on('ready', function (message) {
    // client.channels.cache.get('795676425852026900').send('eae');

});

client.on("message", function (message) {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefixo)) return;

    const commandBody = message.content.slice(prefixo.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase()

    if(command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! Latencia de ${timeTaken}ms`)
    }

    if(command === "search")  {
        
        var options = {
            method: 'POST',
            url: 'https://www.pathofexile.com/api/trade/search/HARDCORE%20RITUAL',
            headers: {
              cookie: '__cfduid=d4d17b789b3be3d107fb5576a889320fd1614116587; POESESSID=faf4e8239c24b2db3639a59ebf027ca6',
              'Content-Type': 'application/json'
            },
            data: {
              query: {
                status: {option: 'online'},
                name: args,
                type: 'Body',
                stats: [{type: 'and', filters: []}]
              },
              sort: {price: 'asc'}
            }
          };
          
          axios.request(options).then(function (response) {
            message.reply(JSON.stringify(response.data))
          }).catch(function (error) {
            if(error.response) {
                message.reply(JSON.stringify(error.response.data))
            }
          });
    }
});

client.login(config.BOT_TOKEN);