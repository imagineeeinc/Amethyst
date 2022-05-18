const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('skip')
	.setDescription('skip the current song'),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) return interaction.reply(`No music currently playing... try again ? ❌`);
		const success = queue.skip();

		return interaction.reply(success ? `skipped ${queue.current.title} skipped ✅` : `Something went wrong... try again ? ❌`);
	},
};