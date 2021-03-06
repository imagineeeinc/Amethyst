const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('pause')
	.setDescription('Pauses the currently playing song'),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);

		if (!queue) return interaction.reply(`No music currently playing... try again ? ❌`);

		const success = queue.setPaused(true);

		return interaction.reply(success ? `Current music **${queue.current.title}** paused ✅` : `Something went wrong... try again ? ❌`);
	},
};