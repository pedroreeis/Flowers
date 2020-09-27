const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ytdl = require('ytdl-core')
const bot = new Discord.Client()
module.exports.run = async (bot, message, args) => {

    if(!message.member.voice.channel) return message.reply(`Conecte em um canal de voz!`)

    let musica = args.join(' ')

    if(!musica) return message.reply("Digite um video válido!")

        const videos = musica

        let validate = await ytdl.validateURL(musica)

        let info = await ytdl.getInfo(musica)


        const connection = await message.member.voice.channel.join();
        let dispatcher = await connection.play(ytdl(musica, {filter: 'audioonly'}))

        let embed = new MessageEmbed() 
        .setAuthor('Tocando Agora')
        .setDescription(`[${info.title}](${pVideo.url})`)
        .addField(`Autor`, `${info.author.name}`, true)
        .addField(`Likes`, `${info.likes}`, true)
        message.channel.send(embed)

  

   // let validate = await ytdl.validateURL(args[0])

   // if(!validate) return message.reply('Seu link não foi validado corretamente! certifique-se que ele é do youtube')

  //  let info = await ytdl.getInfo(args[0])

 
}

module.exports.help = {
    name: "play",
    aliases: ['tocar', 'p'],
    usage: "play [musica]"
  };