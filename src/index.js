const { token, clientId } = require('../config.json')
// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { Player } = require("discord-player");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

// Create a new Player (you don't need any API Key)
const player = new Player(client);

// add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))


client.commands = new Collection();

var commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
	console.log(client.user.tag + " is online!");
	client.user.setStatus('available')
	client.user.setPresence({
		activities:
		[
			{ name:
				'Songs from amethyst',
				type: 'LISTENING'
			}],
		status: 'idle'
	});
});

client.login(token);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, player);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
//on joining a server
client.on('guildCreate', async guild => {
	console.log(`Joined guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});