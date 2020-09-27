const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let ipserver = `${args[0]}`
  if(!ipserver) return message.reply('Coloque `IP:PORT`')
  const embed = new discord.MessageEmbed()
  .setImage(`http://www.game-state.com/${ipserver}/430x73_FFFFFF_FF9900_000000_000000.png`)
  message.channel.send(embed)

};

module.exports.help = {
  name: "mta",
  aliases: ['mtaserver', 'mtainfo'],
  usage: "mta [SERVERIP:PORT]"
};
