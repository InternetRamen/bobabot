
const Discord = require('discord.js')
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return;
let name = args.slice(1).join(" ")
let actual = name.toLowerCase()
let price = args[0]
let obj = {
  name: name,
  price: parseInt(price)
}
bot.menu.set(actual, obj)
message.channel.send(`Added ${name}(${actual}) that costs ${price}`)

}



module.exports.help = {
  name:"add"
}