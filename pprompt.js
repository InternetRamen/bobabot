/**
 * Creates a prompt
 * @param message The message object
 * @param prompt The text for the prompt
 */
module.exports = async (message, prompt) => {
    // Makes sure that the bot will only listen to a message from the author
    const filter = (response) => response.author.id === message.author.id;
    // Instance now contains the prompt message
    const instance = await message.reply(prompt);

    // Collect the first message from the author, waiting 1 minute for a reaction
    return message.channel.awaitMessages(filter, { maxMatches: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            // Content now contains the message from the author
      let attachment = collected.first().attachments.first().url
            if (attachment) {
               
              
              return attachment
              
              
            } else {
      
      return message.channel.send("please send an actual image.")
            }
        })
        .catch(_ => {
            // If the author waited too long, delete the prompt
            instance.delete();

            // Return undefined so you can create a custom error message if no reaction was collected
            return message.channel.send("you waited too long! (60s)");
        });
};
