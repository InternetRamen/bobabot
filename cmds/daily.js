const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require('ms')
module.exports.run = async (bot, message, args) => {
  let cooldown = 8.6e7;
  let lastDaily = bot.dailyCooldown.get(message.author.id);
  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
    let timeObj = ms(cooldown - (Date.now() - lastDaily));

    let embed = new Discord.RichEmbed()
      .setTitle("Chill!")
      .setDescription(
        `Hey, give me a break! I'm not made of pearls! Please wait **${timeObj.hours}h** and **${timeObj.minutes}m**`
      )
      .setColor(0xb794fc);
    message.channel.send({ embed: embed });
  } else {
     bot.currency.ensure(message.author.id, {
    userID: message.author.id,
    pearls: 0,
    whitepearls: 0,
    prestige: 0
    
  })
  let object = bot.currency.get(message.author.id)
  console.log(object);
  let bal = object.pearls
  bal += 200
  bot.dailyCooldown.set(message.author.id, Date.now())
  bot.currency.set(message.author.id, bal, "pearls")
  let embed = new Discord.RichEmbed()
    .setTitle(`Thank's for your hard work!`)
    .setDescription(
      `You have claimed **200** pearls.`
    )
 .setColor(0xb794fc);
  message.channel.send({ embed: embed });
    
   
  }
};

module.exports.help = {
  name: "daily"
}