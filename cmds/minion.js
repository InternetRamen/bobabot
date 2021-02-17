
const Discord = require('discord.js')
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {
  let action = parseInt(args[0])
  let itemper = parseInt(args[1])
  let unit = parseInt(args[2])
  let diamond = args[3]
let final = 86000/action*itemper*unit

if (diamond.toLowerCase() === "true") final += 138240/action
message.channel.send(`The minion makes ${final} coins per day.`)


  
}



module.exports.help = {
  name:"minion"
}