const Discord = require('discord.js')
const mongoose = require('mongoose');
const { MessageEmbed } = require('discord.js')
module.exports.run = async (bot, message, args, Config) => {

  if(!message.member.hasPermission("VIEW_AUDIT_LOG")) {
    message.reply('Você não tem permissão  para usar esse comando!'); 
    return;
   }

    Config.findOne({ guildID: message.guild.id}, function(erro, dados) {  

      const dashborad = new MessageEmbed()
      .addField(`<:devoffline:688916068810489912> Prefixos:`, '`' + `[${dados.prefix}prefix <prefixo>] ` + '`' +  `Atual: **${dados.prefix}**`, false)
      if(dados.idlogs == 0) {
        dashborad.addField(`<:desatived:708773188611604582>  Message Logs:`, '`' + `[${dados.prefix}logs <idcanal>] ` + '`', false)
      }else {
        dashborad.addField(`<:atived:708772992523436162> Message Logs:`, '`' + `[${dados.prefix}remove-logs] ` + '`' + ` » <#${dados.idlogs}>`, false)
      }


      if(dados.welcomeid == 0) {
        dashborad.addField(`<:desatived:708773188611604582> Bem-Vindo Logs:`, '`' + `[${dados.prefix}welcome <idcanal>] ` + '`', false)
      }else {
        dashborad.addField(`<:atived:708772992523436162> Bem-Vindo Logs:`, '`' + `[${dados.prefix}remove-welcome <idcanal>] ` + '`' + `» <#${dados.welcomeid}>`, false)
      }


      dashborad.setFooter('Me configure do seu jeito!')

      message.channel.send(dashborad)

    })







 /*   Config.findOne({ guildID: message.guild.id}, function(erro, dados) {  

    let prefixo = args[0];
    if(!prefixo) return message.reply('Coloque algum prefixo!')
    dados.prefix = prefixo;
    dados.save();
    //message.channel.send(`Prefixo trocado para ${prefixo}`)
    const embedsucess = new discord.MessageEmbed()
    .setDescription(`Prefixo neste servidor alterado para: ` + '`' + prefixo + '`')
    message.channel.send(embedsucess)
    })*/
  }

module.exports.help = {
  name: "config",
  aliases: ['configuração', 'settings', 'manager'],
  usage: "config"
};
