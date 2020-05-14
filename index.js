const Discord = require('discord.js');
 const client = new Discord.Client();
const instructionMessage = 'React with :nerd: to get pinged when a job starts.\n'
				          +'React with :sunglasses: to stop getting job pings.\n';
				
client.on('ready', () => { 
 console.log(`Logged in as ${client.user.tag}!`);
 client.channels.filter(channel => checkDev(channel) 
                                 && channel.type ==='text' 
								 && channel.name ==='job-alerts')
                .array().forEach( channel => {
					//channel.send();
					sendInstructions(channel, 'JobBot is starting...\n'+instructionMessage);
				});
 });

client.on('error', error => { 
	console.log(error.message); 
 });

 client.on('message', message => {
	if (!message.guild) return;
	if (!checkDev(message.channel)) return;
	if (!(message.channel.name ==='job-alerts')) return;
	if (message.author.username === 'JobBot') return;
	sendInstructions(message.channel);
 });
 
client.on('messageReactionAdd', (messageReaction,user) => handleReactions(messageReaction,user));
client.on('messageReactionRemove', (messageReaction,user) => handleReactions(messageReaction,user));

function handleReactions(messageReaction,user) { 
  try {
	if(user.bot) return;
	if (!messageReaction.message.guild) return;
	if (!checkDev(messageReaction.message.channel)) return;
	if (!(messageReaction.message.channel.name ==='job-alerts')) return;
	if(messageReaction.emoji.identifier === '%F0%9F%A4%93') {
		const member = messageReaction.message.guild.member(user);
		if(member != null) {
			member.addRole(messageReaction.message.guild.roles.find(role => role.name === 'jobber'));
			if(user.dmChannel == null) {
				user.createDM().then(channel => sendAddMessage(channel))
				               .catch(error => console.log(error));
			} else {
				sendAddMessage(user.dmChannel);
			}
		}
	}
	else if(messageReaction.emoji.identifier === '%F0%9F%98%8E') {
		const member = messageReaction.message.guild.member(user);
		if(member != null) {
			member.removeRole(messageReaction.message.guild.roles.find(role => role.name === 'jobber'));
			if(user.dmChannel == null) {
				user.createDM().then(channel => sendRemoveMessage(channel))
				               .catch(error => console.log(error));
			} else {
				sendRemoveMessage(user.dmChannel);
			}
		}
	}
  } catch (e) {
	  console.log(e);
  }
 } 
 
 function sendRemoveMessage(channel) {
	channel.send('Sorry to hear you don\'t want to get job pings from MCME any more.');
 }
 
 function sendAddMessage(channel) {
	channel.send('Great you want to help with jobs at MCME. When a job starts you\'ll get a ping.');
 }
 
function sendInstructions(channel, messageText) {
	if(typeof messageText === 'undefined') {
		messageText = 'Get notifications for jobs at MCME!\n'+instructionMessage;
	}
	channel.send(messageText)
		.then(message => {
			message.react('\u{1F913}');
			message.react('\u{1F60E}');
		}).catch(error => console.log(error));
 }
 
function checkDev(channel) {
	return true; // <- productive version
}

client.login('...');