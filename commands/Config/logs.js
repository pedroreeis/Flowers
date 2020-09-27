const discord = require("discord.js");
const mongoose = require('mongoose');
module.exports.run = async (bot, message, args, Config) => {

  if(!message.member.hasPermission("VIEW_AUDIT_LOG")) {
    message.reply('Você não tem permissão  para usar esse comando!'); 
   }

    Config.findOne({ guildID: message.guild.id}, function(erro, dados) {  

      if(!message.member.hasPermission("VIEW_AUDIT_LOG")) {
        message.reply('Você não tem permissão  para usar esse comando!'); 
        return;
       }

    let prefixo = args[0];
    if(!prefixo) return message.reply('Coloque algum id!')
    dados.idlogs = prefixo;
    dados.save();
    //message.channel.send(`Prefixo trocado para ${prefixo}`)
    const embedsucess = new discord.MessageEmbed()
    .setDescription(`Função LOGS ativada neste servidor! Canal: <#${prefixo}>`)
    message.channel.send(embedsucess)
    })
  }

module.exports.help = {
  name: "logs",
  aliases: ['functionlogs', 'setlogs'],
  usage: "logs [idcanal]"
};
