const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Clears the queue'),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing) return interaction.channel.send(`No music currently playing... try again ? ❌`);

		if (!queue.tracks[0]) return interaction.channel.send(`No music in the queue after the current one... try again ? ❌`);

		await queue.clear();

		interaction.channel.send(`The queue has just been cleared 🗑️`);
	},
};