const discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment } = require('discord.js')
const bot = new discord.Client()
const moment = require("moment")
require("moment-duration-format")
module.exports.run = async (bot, message, args) => {

  let pessoa = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
  moment.locale("pt-BR")

  let statusmebro;
  if(pessoa.presence.status === "dnd") statusmebro = "Não Pertubar";
  if(pessoa.presence.status === "idle") statusmebro = "Ausente";
  if(pessoa.presence.status === "stream") statusmebro = "Transmitindo";
  if(pessoa.presence.status === "offline") statusmebro = "Invisível";
  if(pessoa.presence.status === "online") statusmebro = "Disponível";

  let botinfo;
  if(pessoa.bot === true) botinfo = "Sim";
  if(pessoa.bot === false) botinfo = "Não";  

  const canvas = createCanvas(700, 1000);
  const ctx = canvas.getContext("2d")

 // ctx.fillStyle = "#FFFFFF"
 // ctx.fillRect(0, 0, canvas.width, canvas.height)
 

  let fundo = await loadImage('https://cdn.discordapp.com/attachments/683344477871538229/711230298188152842/ui.png')
  ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height)


  ctx.font = '45px Sans Not-Rotated';
  ctx.fillStyle = "#696969"
  ctx.fillText(`${pessoa.tag}`, 200, 500)

  ctx.font = '25px arial';
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(`Conta Criada em: ${moment(pessoa.createdAt).format('LL')}`, 55, 845)

  ctx.font = '25px arial';
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(`Entrou em: ${moment(pessoa.joinedAt).format('LL')}`, 55, 815)


  const avatar = await loadImage(pessoa.avatarURL({ format: 'png', dynamic: true, size: 1024 })) //carrega o avatarURL
  ctx.drawImage(avatar, 210, 200, 260, 260)//posiciona o avatar


  const attachment = new MessageAttachment(canvas.toBuffer(), "ui.png");
  message.channel.send(attachment)

};
module.exports.help = {
  name: "userinfo",
  aliases: ['ui'],
  usage: "userinfo (membro)"
};
