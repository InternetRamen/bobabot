
const Discord = require('discord.js')
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {
 let menu = []
 let embed = new Discord.RichEmbed()
   .setTitle("Menu")
  
 bot.menu.forEach(tea => {
   embed.addField(tea.name, tea.price, true)
 })
message.channel.send(embed)
}



module.exports.help = {
  name:"menu"
}