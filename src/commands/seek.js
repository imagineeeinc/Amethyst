const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('seek')
	.setDescription('seek to a specific time in the current song')
	.addStringOption(option =>
		option.setName('time')
			.setDescription('The time to seek to (in seconds)')
			.setRequired(true)),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) return interaction.reply(`No music currently playing... try again ? ❌`);
		if (!queue.current) return interaction.reply(`No music currently playing... try again ? ❌`);
		if (!queue.current.stream) return interaction.reply(`No music currently playing... try again ? ❌`);
		if (!queue.current.stream.seekable) return interaction.reply(`The current track is not seekable... try again ? ❌`);
		const time = interaction.options.getString('time');
		if (!time) return interaction.reply(`Please provide a time to seek to... try again ? ❌`);
		const seek = queue.current.stream.seek(time);
		if (!seek) return interaction.reply(`Something went wrong... try again ? ❌`);
		interaction.reply(`Seeking to ${time}... ✅`);
	},
};