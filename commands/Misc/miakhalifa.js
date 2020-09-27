const Discord = require('discord.js')
const { createCanvas, loadImage, applyText } = require('canvas')
const canvas = createCanvas(638, 458)
const ctx = canvas.getContext('2d')

exports.run = async (client, message, args) => {

const pessoa1 = message.mentions.users.first()
//const pessoa2 = message.mentions.users[1]

 if(!pessoa1) return message.reply('Mencione alguem!')
 //if(!pessoa2) return message.reply('Mencione alguem!')

loadImage('https://cdn.discordapp.com/attachments/706520738416427060/709457488046587974/Sem-Titulo-1.png').then((image) => {
ctx.drawImage(image, 0, 0, 638, 458)


loadImage(pessoa1.avatarURL({format: 'png', dynamic: true, size: 1024})).then((avatar) => {
ctx.drawImage(avatar, 270, 140, 159, 138)

//loadImage(pessoa2.avatarURL({format: 'png', dynamic: true, size: 1024})).then((avatar) => {
  //  ctx.drawImage(avatar, 30, 70, 159, 136)

const attach = new Discord.MessageAttachment(canvas.toBuffer(), 'imagem.png');

message.channel.send(attach)

})
})
//})
}
module.exports.help = {
	name: "miakhalifa",
  aliases: ['miaimagem'],
  usage: "miakhalifa [USER]"
  };