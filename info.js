const { MessageEmbed } = require("discord.js"); 
module.exports = (user) => {
    const embed = new MessageEmbed()
        .setAuthor(user)
        .setDescription("Cadastrou-se")
        .setTimestamp()
    
    return embed;
}