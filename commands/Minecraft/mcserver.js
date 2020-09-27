const Discord = require("discord.js");
var superagent = require('superagent')
module.exports.run = async (bot, message, args) => {

  let ipserver = args[0]
  if(!ipserver) return message.reply('Insira um IP (Numerico ou algébrico)')
  if(ipserver == "localhost") return message.reply("Não é possivel pegar o STATUS de um servidor Local")
  if(ipserver == "0.0.0.0") return message.reply("Não é possivel pegar o STATUS de um servidor Local")

  let {body} = await superagent
  .get(`https://mcapi.us/server/status?ip=${ipserver}`);



  const embed = new Discord.MessageEmbed()
  .setAuthor(`${ipserver}`)
  .setDescription(`

    BUKKIT/VERSION: ${body.server.name}
    
  `)
  .setImage(`https://mcapi.us/server/image?ip=${ipserver}`)


  message.channel.send(embed)

};

module.exports.help = {
  name: "mcserver",
  aliases: ['mineserver', 'servermine', 'servermc'],
  usage: "mcserver [IP]"
};
