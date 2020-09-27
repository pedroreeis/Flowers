const Discord = require("discord.js");
module.exports.run = async (bot, message, args, Config) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply('Você não tem permissão de banir'); 

        var member_in = args[0] || message.mentions.members.first()
        var membroBan = message.guild.member(member_in.replace(/[^\d]+/g, ""))
        if(!membroBan) return message.reply('Insira um membro válido')

        var motivo = args.slice(1).join(' ')

        let embedquase = new Discord.MessageEmbed()
        .setDescription(`Voce deseja punir o membro ${membroBan.user.tag} pelo motivo ` + '`' + `${motivo ? motivo : "Motivo não definido"}` + '` ?')
        .setColor('#00BFFF');

       message.channel.send(embedquase).then(msg => {
           msg.react('692062426102759484')
           msg.react('692062536895561768')

           let filtro = (reacao, usuario) => usuario.id === message.author.id;
           const ban = msg.createReactionCollector(filtro, {
               time: 240000
           });
           ban.on('collect', async bot => {
            if (bot._emoji.name === 'sim') {
                membroBan.kick(motivo ? motivo : "Motivo não definido")
     
            }
        })
    })
}

module.exports.help = {
  name: "expulsar",
  aliases: ['kick', 'caifora'],
  usage: "kick [user] (motivo)"
};

