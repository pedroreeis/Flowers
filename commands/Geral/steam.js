const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndents } = require("common-tags");
const dateFormat = require("dateformat");

 exports.run = async (bot, message, args) => {
        const token = "DF95299E975B086E2D3C97EE4F2B5569"; 
        if(!args[0]) return message.channel.send("Por favor. coloque um STEAMID para verificar o perfil do usuario. EX: c!steam Gustavo_Carter");
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

        fetch(url).then(res => res.json()).then(body => {
            if(body.response.success === 42) return message.channel.send("Este STEAMID está invalido!");

                const id = body.response.steamid;
                const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
                const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
                const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];

        fetch(summaries).then(res => res.json()).then(body => {
            if(!body.response) return message.channel.send("Não consegui encontrar um perfil com este STEAM ID");
            const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

        fetch(bans).then(res => res.json()).then(body => {
            if(!body.players) return message.channel.send("Não consegui encontrar um perfil com este Nome");
            const { NumberOfVACBans, NumberOfGameBans} = body.players[0];

            const embed = new MessageEmbed()
                .setColor('PURPLE')
                .setAuthor(`Perfil de  ${personaname}`, avatarfull)
                .setThumbnail(avatarfull)
                .setDescription(stripIndents`**Nome Real:** ${realname || "Unknown"}
                **Status:** ${state[personastate]}
                **Pais:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                **Conta criada em:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                **Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                **Link:** [link to profile](${profileurl})`)
                .setTimestamp();

                message.channel.send(embed)
            })
        })
    })
  }
  module.exports.help = {
    name: "steam",
    aliases: ['consultarsteam'],
    usage: "steam [steamid]"
  };
