const Discord = require('discord.js');
 const client = new Discord.Client();

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', message => {
	if (!message.guild) return;
	if (message.content === '!jobber add') {
		const user = message.author;
		const member = message.guild.member(user);
		member.addRole(message.guild.roles.find(role => role.name === 'Jobber'));
		message.reply('Great you want to help. When a job starts you\'ll get a ping.');
	} else if(message.content === '!jobber remove') {
		const user = message.author;
		const member = message.guild.member(user);
		member.removeRole(message.guild.roles.find(role => role.name === 'Jobber'));
		message.reply('Sorry to hear you don\'t want to get job pings any more.');
	}
 });

client.on('messageReactionAdd', (messageReaction,user) => {
	console.log(messageReaction.emoji.name);
	messageReaction.message.reply('test');
	if(messageReaction.emoji.name === 'nerd') {
		const member = messageReaction.message.guild.member(user);
		member.addRole(messageReaction.message.guild.roles.find(role => role.name === 'Jobber'));
	}
	else if(messageReaction.emoji.name === 'sunglasses') {
		const member = messageReaction.message.guild.member(user);
		member.addRole(messageReaction.message.guild.roles.find(role => role.name === 'Jobber'));
	}
 });
 
client.on('messageReactionRemove', (messageReaction,user) => {
	console.log(messageReaction.emoji.name);
	messageReaction.message.reply('test');
	if(messageReaction.emoji.name === 'nerd') {
		const member = messageReaction.message.guild.member(user);
		member.addRole(messageReaction.message.guild.roles.find(role => role.name === 'Jobber'));
	}
	else if(messageReaction.emoji.name === 'sunglasses') {
		const member = messageReaction.message.guild.member(user);
		member.addRole(messageReaction.message.guild.roles.find(role => role.name === 'Jobber'));
	}
 });
 
client.login('...');