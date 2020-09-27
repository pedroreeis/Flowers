const discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment } = require('discord.js')
const bot = new discord.Client()
const moment = require("moment")
require("moment-duration-format")
module.exports.run = async (bot, message, args) => {
    moment.locale("pt-BR")

  const canvas = createCanvas(300, 400)
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "#696969"
  ctx.fillRect(10, 10, canvas.width-20, canvas.height-20)


  let nomeserver = message.guild.name
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 16px Sans"
  ctx.fillText(`${nomeserver}`, 100, 50)

  ctx.fillStyle = "#00FF00"
  ctx.font = "30px Sans"
  ctx.fillText(`Onlines: ${message.guild.members.cache.filter(m => m.presence.status === 'online').size}`, 15, 100)

  ctx.fillStyle = "#FF0000"
  ctx.font = "30px Sans"
  ctx.fillText(`Ocupados: ${message.guild.members.cache.filter(m => m.presence.status === 'dnd').size}`, 15, 150)

  ctx.fillStyle = "#FFD700"
  ctx.font = "30px Sans"
  ctx.fillText(`Ausentes: ${message.guild.members.cache.filter(m => m.presence.status === 'idle').size}`, 15, 200)

  ctx.fillStyle = "#C0C0C0"
  ctx.font = "30px Sans"
  ctx.fillText(`Offlines: ${message.guild.members.cache.filter(m => m.presence.status === 'offline').size}`, 15, 250)

  ctx.fillStyle = "#FFFFFF"
  ctx.font = "30px Sans"
  ctx.fillText(`Total: ${message.guild.memberCount}`, 15, 300)

  ctx.fillStyle = "#00FF00"
  ctx.font = "15px Sans"
  ctx.fillText(`Criado em: ${moment(message.guild.createdAt).format('LL')}`, 15, 350)

  ctx.fillStyle = "#FFFF00"
  ctx.font = "15px Sans"
  ctx.fillText(`Entrou em: ${moment(message.member.joinedAt).format(`LL`)}`, 15, 370)

  const attachment = new MessageAttachment(canvas.toBuffer(), "si.png");
  message.channel.send(attachment)

};

module.exports.help = {
  name: "serverinfo",
  aliases: ['si', 'infoserver'],
  usage: "serverinfo"
};
