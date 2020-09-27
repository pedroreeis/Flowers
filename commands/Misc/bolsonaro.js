const Discord = require('discord.js')
const { createCanvas, loadImage, applyText } = require('canvas')
const canvas = createCanvas(400, 200)
const ctx = canvas.getContext('2d')

exports.run = async (client, message, args) => {

const texto = args.join(' ')

 texto ? texto : "Nada escrito"
 //if(texto.length >= 27) return texto.split(0,27).join("\n")
 if(texto.length >= 27) return message.reply(`Limite de caracteres atingido`)
loadImage('https://cdn.discordapp.com/attachments/683344477871538229/710112422815596605/bolsonaro.png').then((image) => {
ctx.drawImage(image, 0, 0, 400, 200)

ctx.font = `18px arial`;
ctx.fillStyle = '#000000';
ctx.fillText(`${texto}`, 110, 80);



const attach = new Discord.MessageAttachment(canvas.toBuffer(), 'imagem.png');

message.channel.send(attach)

})
}
module.exports.help = {
  name: "bolsonaro",
  aliases: ['bolsonarotext'],
  usage: "bolsonaro [TEXTO]"
};
