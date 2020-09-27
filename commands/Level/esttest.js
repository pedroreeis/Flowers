const discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment } = require('discord.js')
const { join } = require('path')
const LevelConfig = require('../../levelsys/databaselevel')
const bot = new discord.Client()
module.exports.run = async (bot, message, args) => {

  let pessoa = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;

  const canvas = createCanvas(1000, 333);
  const ctx = canvas.getContext("2d")

  //ctx.fillStyle = '#000000';
  //ctx.fillRect(0, 0, canvas.width+20, canvas.height+20);

  LevelConfig.findOne({
    userid: pessoa.id
  }, (err, dados) => {
    if (err) console.error(err);

    // const canvas = createCanvas(1000, 333);
    // const ctx = canvas.getContext("2d")

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

   ctx.beginPath()
    ctx.lineWidth = 4
    ctx.strokeStyle = "#DC143C"
    ctx.globalAlpha = 0.2
    ctx.fillStyle = "#000000"
    ctx.fillRect(100, 216, 770, 65)
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.strokeRect(180, 216, 770, 65)
    ctx.stroke()


   ctx.fillStyle = "#DC143C"
    ctx.globalAlpha = 0.6
    ctx.fillRect(180, 216, ((100 / (dados.level * 30)) * dados.xp) * 7.7, 65)
    ctx.fill()
    ctx.globalAlpha = 1

    ctx.font = "30px Arial"
    ctx.textAlign = "center"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(`${dados.xp} / ${dados.level * 30} XP`, 600, 260)

    ctx.textAlign = "left"
   // ctx.fillText(pessoa.tag, 300, 120)
    ctx.fillText(pessoa.tag, 300, 120)

    ctx.font = "50px Arial"
    ctx.fillText("Level:", 300, 180)
    ctx.fillText(dados.level, 470, 180)

    ctx.arc(170, 160, 120, 0, Math.PI * 2, true)
    ctx.lineWidth = 6
    ctx.strokeStyle = "#DC143C"
    ctx.stroke()
    ctx.closePath()
    ctx.clip()



  })

  const avatar = await loadImage(pessoa.avatarURL({ format: 'png', dynamic: true, size: 1024 })) //carrega o avatarURL
  ctx.drawImage(avatar, 40, 20, 260, 260)//posiciona o avatar

  const attachment = new MessageAttachment(canvas.toBuffer(), "rank.png");
  message.channel.send(attachment)

};


module.exports.help = {
  name: "esttest",
  aliases: ['ranktest', 'estatisticasteste']
};
