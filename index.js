const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });
const config = require('./config.json');

client.on('ready', () => { 
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('error', error => { 
	console.log(error.message); 
 });

client.on('messageReactionAdd', async (messageReaction,user) => { 
	if (messageReaction.partial) {
		try {
			await messageReaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}  
	try {
		if(user.bot) return;
		if (!messageReaction.message.guild) return;
		if (!(messageReaction.message.channel.name ===config.signInChannel)) return;
		
		console.log(messageReaction.emoji.name);
		if(messageReaction.emoji.name == config.jobEmoji) {
			handleRole(messageReaction,user,config.jobRole,config.addJobRoleMessage,true);
		}
		else if(messageReaction.emoji.name === config.tourEmoji) {
			handleRole(messageReaction,user,config.tourRole,config.addTourRoleMessage,true);
		}
		else if(messageReaction.emoji.name === config.pvpEmoji) {
			handleRole(messageReaction,user,config.pvpRole,config.addPvpRoleMessage,true);
		}
		else {
			messageReaction.remove().catch(error => console.error('Failed to remove reactions: ', error));
		}
    } catch (e) {
		console.log(e);
	}
}) 
 
client.on('messageReactionRemove', async (messageReaction,user) => { 
	if (messageReaction.partial) {
		try {
			await messageReaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}  
	try {
		if(user.bot) return;
		if (!messageReaction.message.guild) return;
		if (!(messageReaction.message.channel.name ===config.signInChannel)) return;
		
		if(messageReaction.emoji.name === config.jobEmoji) {
			handleRole(messageReaction,user,config.jobRole,config.removeJobRoleMessage,false);
		}
		else if(messageReaction.emoji.name === config.tourEmoji) {
			handleRole(messageReaction,user,config.tourRole,config.removeTourRoleMessage,false);
		}
		else if(messageReaction.emoji.name === config.pvpEmoji) {
			handleRole(messageReaction,user,config.pvpRole,config.removePvpRoleMessage,false);
		}
    } catch (e) {
		console.log(e); 
	}
 })
 
 function handleRole(messageReaction,user,role,message,addRole) {
	const member = messageReaction.message.guild.member(user);
	if(member != null) {
		if(addRole) {
			member.roles.add(messageReaction.message.guild.roles.cache.find(search => search.name === role))
				.catch(error => console.log(error));
		} else {
			member.roles.remove(messageReaction.message.guild.roles.cache.find(search => search.name === role))
				.catch(error => console.log(error));
		}
		if(config.sendRoleChangedMessages) {
			if(user.dmChannel == null) {
				user.createDM().then(channel => sendMessage(channel,message))
							.catch(error => console.log(error));
			} else {
				sendMessage(user.dmChannel,message)
			}
		}
	}
 }
 
 function sendMessage(channel,message) {
	channel.send(message)
		   .catch(error => console.log(error));
 }
 
client.login(config.token);