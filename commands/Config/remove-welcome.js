const discord = require("discord.js");
const mongoose = require('mongoose');
module.exports.run = async (bot, message, args, Config) => {

  if(!message.member.hasPermission("VIEW_AUDIT_LOG")) {
    message.reply('Você não tem permissão  para usar esse comando!'); 
    return;
   }

    Config.findOne({ guildID: message.guild.id}, function(erro, dados) {  

    dados.welcomeid = 0;
    dados.save();
    //message.channel.send(`Prefixo trocado para ${prefixo}`)
    const embedsucess = new discord.MessageEmbed()
    .setDescription(`Função WELCOME desativada neste servidor!`)
    message.channel.send(embedsucess)
    })
  }

module.exports.help = {
  name: "remove-welcome",
  aliases: ['welcome-remove'],
  usage: "remove-welcome"
};
