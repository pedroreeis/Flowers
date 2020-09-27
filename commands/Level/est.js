const discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment } = require('discord.js')
const LevelConfig = require('../../levelsys/databaselevel')
const bot = new discord.Client()
module.exports.run = async (bot, message, args) => {

  let pessoa = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;

  const canvas = createCanvas(550, 155);
  const ctx = canvas.getContext("2d")

 // ctx.fillStyle = '#A9A9A9';
 // ctx.fillRect(0, 0, canvas.width, canvas.height);

 let fundo = await loadImage('https://t4.ftcdn.net/jpg/02/62/27/45/240_F_262274583_fbVsQxJVRYLgkaQHrRoxNKpMdDYmhLJD.jpg')
 ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height)

 function blur(strength) {
    ctx.globalAlpha = 0.5;

    for (var y = -strength; y <= strength; y += 2) {
        for (var x = -strength; x <= strength; x += 2) {
            ctx.drawImage(canvas, x, y);

            if (x >= 0 && y >= 0)
                ctx.drawImage(canvas, -(x-3), -(y-1));
        };
    };

    ctx.globalAlpha = 1.0;
}

blur(6)


  ctx.fillStyle = '#C0C0C0'
  ctx.fillRect(118, 5, 430, 140)

  ctx.font = "extra bold 30px Sans"
 //let name = pessoa.nickname
 //const pxFixal = '37'
 //const pxAtual = pxFixal - name.length
  //ctx.font = 'extra bold ' + pxAtual + 'px Sans';
  ctx.fillStyle = '#808080'
  ctx.fillText(pessoa.username, 220, 44)

  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = "#4B0082"
  ctx.globalAlpha = 0.2
  ctx.fillStyle = "#000000"
  ctx.fillRect(210, 54, 300, 30)
  ctx.fill()
  ctx.globalAlpha = 1
  ctx.strokeRect(210, 54, 300, 30)
  ctx.stroke()

  LevelConfig.findOne({
    userid: pessoa.id
  }, (err, dados) => {
    if (err) console.error(err);

  ctx.fillStyle = "#4B0082"
  ctx.globalAlpha = 0.6
  ctx.fillRect(210, 54, ((100 / (dados.level * 30)) * dados.xp) * 3, 29)
  ctx.fill()
  ctx.globalAlpha = 1

  ctx.font = "18px Arial"
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(`${dados.xp} / ${dados.level * 30} XP`, 300, 76)

  ctx.font = "extra bold 30px Sans"
  ctx.fillStyle = '#808080'
  ctx.fillText("Nivel:", 220, 126)

  ctx.font = "extra bold 30px Sans"
  ctx.fillStyle = '#4B0082'
  ctx.fillText(dados.level, 310, 126)

  })
  ctx.strokeStyle = "#000000"
  ctx.strokeRect(50, 15, 120, 120)


  let avatarpessoa = pessoa.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) 

  const avatar = await loadImage(avatarpessoa) //carrega o avatarURL
  ctx.drawImage(avatar, 51, 16, 118, 118)//posiciona o avatar

  const attachment = new MessageAttachment(canvas.toBuffer(), "rank.png");
  message.channel.send(attachment)

};


module.exports.help = {
  name: "est",
  aliases: ['rank', 'estatisticas'],
  usage: "est (membro)"
};
