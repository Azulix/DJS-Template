module.exports = {
    name: "snipe", 
    whitelist: false, 
    permission: "", 
    cooldown: "", 
    aliases: ["snip"], 
    usage: "snipe", 
    description: "Cette commande permet de voir le dernier message supprimé dans le salon.",
    category: "utile", 
    run: async (client, message, args, Discord) => {
  
  let snipe = client.snipes.get(message.channel.id)
  
  if(!snipe) {
    return message.reply("Aucun message trouvé !")
  }
  if(snipe.content.length > 1000)return message.channel.send(`Message trop grand.`)
  let embed = new Discord.MessageEmbed()
  
  .setTitle("Message de: " + snipe.author)
  .addField("Message: ", snipe.content || "Pas de message")
  .setColor(client.config.embedColor)
  if(snipe.image)embed.setImage(snipe.image);
  message.channel.send({embeds: [embed]}).catch(err => console.log(err))
      }
  }