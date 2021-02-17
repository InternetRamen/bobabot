
const Discord = require('discord.js')
const client = new Discord.Client();


module.exports.run = async (bot, message, args) => {
  let order = args.join(" ").toLowerCase()
let menu = []
bot.menu.forEach(tea => {
  menu.push(tea.name.toLowerCase())
})
    bot.currency.ensure(message.author.id, {
    userID: message.author.id,
    pearls: 0,
    whitepearls: 0,
    prestige: 0
    
  })
  console.log(order)
  if (!menu.includes(order)) return message.channel.send("Please order something that is on the menu.")

  let obj = bot.currency.get(message.author.id)
  let bal = obj.pearls
  let object = bot.menu.get(order)
  let price = object.price
  let name = object.name
  if (bal < price) return message.channel.send("You do not have enough pearls to purchase this item.")
  bal -= price
  bot.currency.set(message.author.id, bal, "pearls")
  let invCurrent = bot.inv.get(message.author.id)
  if (!invCurrent) invCurrent = ""
  if (invCurrent === ""){
      invCurrent += name
  } else {
    invCurrent += "\n" + name
  }

  bot.inv.set(message.author.id, invCurrent)
  let embed = new Discord.RichEmbed()
    .setTitle("Thank you for your purchase.")
    .setDescription(`You bought ${name} for ${price}`)
    .setColor("RANDOM")
  message.channel.send({embed: embed})
  
  

  
}



module.exports.help = {
  name:"order"
}