
const Discord = require('discord.js')
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {
  let commandlist = [
    "bal",
    "daily",
    "inv",
    "leaderboard",
    "level",
    "menu",
    "order",
    "ping",
    "post",
    "suggest"
  ]
let commandL = commandlist.join('\n')
let embed = new Discord.RichEmbed()
  .setTitle("Commands")
  .setDescription(commandL)
message.channel.send({embed: embed})
  
}



module.exports.help = {
  name:"help"
}