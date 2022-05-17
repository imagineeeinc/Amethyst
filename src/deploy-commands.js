const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
var token
var clientId
try {
	var { token, clientId } = require('../config.json')
} catch (error) {
	console.error('Missing token or clientId in config.json');
	token = process.env.TOKEN;
	clientId = process.env.CLIENT_ID;
}
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		if (guild) {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guild),
				/* Routes.applicationCommands(clientId), */
				{ body: commands },
			);
		}
		await rest.put(
			Routes.applicationCommands(clientId),
			/* Routes.applicationCommands(clientId), */
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();