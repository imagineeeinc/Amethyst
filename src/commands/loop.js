const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('loop')
	.setDescription('Loops the current song')
	.addStringOption(option =>
		option.setName('loop')
			.setDescription('Loop the current song/queue (true|queue|false)')
			.setRequired(true)),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue) return interaction.reply(`No music currently playing... try again ? ❌`);
		const loop = interaction.options.getString("loop");
		const success = queue.setRepeatMode(loop === 'track' ? QueueRepeatMode.TRACK : loop === 'queue' ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
		let theLoop = loop === 'track' ? `Current track **${queue.current.title}** being looped` : loop === 'queue' ? 'Current queue being looped' : 'Looping disabled'

		return interaction.reply(success ? `${theLoop} ✅` : `Something went wrong... try again ? ❌`);
	},
};