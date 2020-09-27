const discord = require("discord.js");
const mongoose = require('mongoose');
module.exports.run = async (bot, message, args, Config) => {

  if(!message.member.hasPermission("VIEW_AUDIT_LOG")) {
    message.reply('Você não tem permissão  para usar esse comando!'); 
    return;
   }

    Config.findOne({ guildID: message.guild.id}, function(erro, dados) {  

    let prefixo = args[0];
    if(!prefixo) return message.reply('Coloque algum id!')
    dados.welcomeid = prefixo;
    dados.save();
    //message.channel.send(`Prefixo trocado para ${prefixo}`)
    const embedsucess = new discord.MessageEmbed()
    .setDescription(`Função WELCOME ativada neste servidor! Canal: <#${prefixo}>`)
    message.channel.send(embedsucess)
    })
  }

module.exports.help = {
  name: "welcome",
  aliases: ['functionwelcome', 'setbemvindo'],
  usage: "welcome [canalid]"
};
