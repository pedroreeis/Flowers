const discord = require("discord.js");
const mongoose = require('mongoose');
module.exports.run = async (bot, message, args, Config) => {

  if(!message.member.hasPermission("VIEW_AUDIT_LOG")) {
    message.reply('Você não tem permissão  para usar esse comando!'); 
    return;
   }

    Config.findOne({ guildID: message.guild.id}, function(erro, dados) {  

    dados.idlogs = 0;
    dados.save();
    //message.channel.send(`Prefixo trocado para ${prefixo}`)
    const embedsucess = new discord.MessageEmbed()
    .setDescription(`Função LOGS desativada neste servidor!`)
    message.channel.send(embedsucess)
    })
  }

module.exports.help = {
  name: "remove-logs",
  aliases: ['logs-remove'],
  usage: "remove-logs "
};
