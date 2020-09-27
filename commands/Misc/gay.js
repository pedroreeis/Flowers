const Discord = require('discord.js')
const { createCanvas, loadImage, applyText } = require('canvas')
const canvas = createCanvas(400, 225)
const ctx = canvas.getContext('2d')

exports.run = async (client, message, args) => {

const pessoa = message.mentions.users.first() 

 if(!pessoa) return message.reply('Mencione alguem!')

loadImage('https://cdn.discordapp.com/attachments/688436947516915764/700314124428640307/canvasgay.png').then((image) => {
ctx.drawImage(image, 0, 0, 400, 225)

    ctx.font = '18px arial';
    ctx.fillStyle = '#ffffff';
	let gay = Math.round(Math.random() * 100);
    ctx.fillText(`O ${pessoa.username} é ${gay}% gay!`, canvas.width / 2.5, canvas.height / 1.6);

ctx.beginPath();
    ctx.arc(80, 120, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

loadImage(pessoa.avatarURL({format: 'png', dynamic: true, size: 1024})).then((avatar) => {
ctx.drawImage(avatar, 30, 70, 100, 100)

const attach = new Discord.MessageAttachment(canvas.toBuffer(), 'imagem.png');

message.channel.send(attach)
})


}
)}
module.exports.help = {
	name: "gay",
    aliases: ['gayimagem'],
    usage: "gay [USER]"
  };