const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('back')
	.setDescription('Previous song'),
	async execute(interaction, player) {
		const queue = player.getQueue(message.guild.id);
		if (!queue || !queue.playing) return interaction.reply(`No music currently playing... try again ? ❌`);
		if (!queue.previousTracks[1]) return interaction.reply(`There was no music played before... try again ? ❌`);
		await queue.back();

		interaction.reply(`Playing the **previous** track ✅`);
	},
};