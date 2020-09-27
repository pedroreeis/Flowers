const Discord = require("discord.js")

exports.run =  async (bot, message, args) => {

let reason = args.slice(0).join(' ');
    
if (reason.length < 1){
    return message.channel.send({embed: {
        description: ` ${message.author}, Diga o nick da **\`Skin\`**`,
        color: 0x36393e
    }}).then(msg => msg.delete(5000));
}

let MCEmbed = new Discord.MessageEmbed()
        
            .setDescription(`${message.author} [Download da Skin](https://minotar.net/download/${args[0]})`)
            .setColor("#36393e")
            .setTimestamp()
            .setImage(`https://mc-heads.net/body/${args[0]}/300`)
            .setFooter(`${message.author.username}`, message.author.avatarURL)
            message.channel.send(MCEmbed)

};
module.exports.help = {
    name: "skin",
    aliases: ['mcbody', 'mcskin', 'namemc'],
    usage: "skin [NICK]"
  };