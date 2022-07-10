const  { prefix } = require("./config.json");
const discord = require("discord.js");



const { Client, Intents } = require('discord.js'); 

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS] });

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
["command",].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.config = require("./config.json")
client.snipes = new discord.Collection();
client.cooldowns = new discord.Collection();
client.whitelist = require('./ownerlist.json')















client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix))return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();


  let ErrorCommandEmbed = (new discord.MessageEmbed()
  .setColor(client.config.embedColor)
  .setTitle(`Erreur`)
  .setDescription(`\`⚠️ ${client.config.prefix} ⚠️\` **Veuillez correctement utiliser le bot: __${client.config.prefix}<commande>__, visible dans le __${client.config.prefix}__\`help\`**`))
  if (cmd.length === 0) return message.channel.send({ embeds: [ErrorCommandEmbed] });
  let command = client.commands.get(cmd);
  
  if (!command) command = client.commands.get(client.aliases.get(cmd))

  if(command.whitelist){
  if(command.whitelist === true){
  let whitelist = client.whitelist
    let wl = false;
    for (var i in whitelist) {
      if (message.author.id.includes(whitelist[i].toLowerCase())) wl = true;
    }
    if (!wl)return message.reply("Commande owner !") 
  }

  }

  // 


   if (command){
 
    function onCoolDown(message, command) {
      if(!message || !message.client) throw "x";
      if(!command || !command.name) throw "x";
      const client = message.client;
      if (!client.cooldowns.has(command.name)) { 
        client.cooldowns.set(command.name, new discord.Collection());
      }
      const now = Date.now(); 
      const timestamps = client.cooldowns.get(command.name); 
      const cooldownAmount = (command.cooldown || 2) * 1000; 
      if (timestamps.has(message.author.id)) { 
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount; 
        if (now < expirationTime) { 
          const timeLeft = (expirationTime - now) / 1000; 
          return timeLeft
        }
        else {
          timestamps.set(message.author.id, now); 
          setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 
          return false;
        }
      }
      else {
        timestamps.set(message.author.id, now); 
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 
        return false;
      }
    }

    if (onCoolDown(message, command)) {
        let x = new discord.MessageEmbed()
        .setTitle(`Cooldown !`)
        .setDescription(`Erreur ! Vous pourrez exécuter la commande \`${command.name}\` dans \`${(onCoolDown(message, command)).toFixed(2)}\` secondes .`)
        .setColor(client.config.embedColor)
        return message.channel.send({embeds : [x]})
      }
    
    
    //


    if(command.permission){
    let permissionEmbed = (new discord.MessageEmbed()
        .setDescription(`Vous n\'avez pas la permission d'utiliser la commande ${command.name}, vous devez avoir la permission ${command.permission}.`)
        .setColor(client.config.embedColor))
        console.log(command.permission)

    if(!message.member.permissions.has(`${command.permission}`))return message.channel.send({ embeds: [permissionEmbed] }).catch(err => console.log(err))
    }
  

      
    const Discord = require("discord.js")
   
     command.run(client, message, args, Discord)
  }


})





  
client.on("messageDelete",async (message) => {
client.snipes.set(message.channel.id,{
content : message.content,
author: message.author.tag,
image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})




process.on('unhandledRejection', (error) => {
  console.log(error)
})
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);
})


client.login(client.config.token);









