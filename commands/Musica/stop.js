module.exports.run = async (bot, message, args) => {

if(!message.member.voice.channel) return message.reply('Conecte em um canal de voz!')

if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.reply('Voce não esta no canal de voz que eu estou!')

message.guild.voice.channel.leave()

message.channel.send('Saindo do canal!')
}

module.exports.help = {
    name: "stop",
    aliases: ['stopping'],
    usage: "stop"
  };