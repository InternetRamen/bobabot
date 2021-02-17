
const Discord = require('discord.js')
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {
  message.channel.send("Pinging").then(m => m.edit(`Ping: ${m.createdTimestamp - message.createdTimestamp} ms`)); 
  message.channel.send(`💓${bot.ping} ms`)


  
}



module.exports.help = {
  name:"ping"
}