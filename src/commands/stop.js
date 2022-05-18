const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('stop')
	.setDescription('Stops the currently playing song'),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) return interaction.reply(`No music currently playing... try again ? ❌`);
		queue.destroy();

		interaction.reply(`Music stopped into this server, see you next time ✅`);
	},
};