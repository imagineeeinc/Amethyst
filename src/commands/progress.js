const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('progress')
	.setDescription('Shows the progress of the current song'),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) return interaction.reply(`No music currently playing... try again ? ❌`);

		const progress = queue.createProgressBar();
		const timestamp = queue.getPlayerTimestamp();
		if (timestamp.progress == 'Infinity') return interaction.reply(`Playing a live, no data to display 🎧`);

		interaction.reply(`${progress} (**${timestamp.progress}**%)`);
	},
};