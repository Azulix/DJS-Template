module.exports = {
  name: "ping", 
  whitelist: false, 
  permission: "", 
  cooldown: "5", 
  aliases: ['latence'], 
  usage: "ping", 
  description: "Cette commande permet de voir le ping du bot.",
  category: "information", 
  run: async (client, message, args, Discord) => {

        let start = Date.now();

        let pingEmbed = new Discord.MessageEmbed()
        .setDescription("Calcul du ping en cours...")
        .setColor(client.config.embedColor)
     
     message.channel.send({ embeds: [pingEmbed] }).then(m => {
       
       let end = Date.now();
       
       let embed = (new Discord.MessageEmbed()
       .setTitle("🏓 Pong !", message.author.avatarURL())
       .addField("Latence de l'API", Math.round(client.ws.ping) + "ms", true)
       .addField("Latence du message", end - start + "ms", true)
       .setColor(client.config.embedColor))
       m.edit({ embeds: [embed] })

     })
}}
