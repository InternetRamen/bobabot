const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    const curLevel = Math.floor(
    0.2 * Math.sqrt(bot.points.get(message.author.id, "points"))
  );
  const obj = {
      lvl5: {
        level: 5,
        role: "559909070132346892",
      },
      lvl10: {
        level: 10,
        role: "678283299751198721",
      },
      lvl15: {
        level: 15,
        role: "678283123632635914",
      },
      lvl25: {
        level: 25,
        role: "677323938111684608",
      },
      lvl35: {
        level: 35,
        role: "678033087711412234"
      } 
  }
 let rolesAdded = "Added:\n"
  Object.keys(obj).forEach(function (key) {
let value = obj[key] // The object value

      let lvl = value.level
    
    let role = value.role
    if (curLevel >= lvl) {
      if (message.member.roles.has(role)) return;
      message.member.addRole(role)
        rolesAdded += `The role for lvl **${lvl}**` + "\n"
    } else {
      console.log("user does'nt have this level")
    }

    
});
message.channel.send(rolesAdded)
   

 
};

module.exports.help = {
  name: "addrole"
}