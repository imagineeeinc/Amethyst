const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('resume')
	.setDescription('Resumes the currently paused song'),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue) return interaction.reply(`No music currently playing... try again ? ❌`);
		const success = queue.setPaused(false);

		return interaction.reply(success ? `Current music **${queue.current.title}** resumed ✅` : `Something went wrong... try again ? ❌`);
	},
};