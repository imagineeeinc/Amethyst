const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('nowplaying')
	.setDescription('What song is playing now?'),
	async execute(interaction, player, client) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) return interaction.reply(`No music currently playing... try again ? ❌`);
		const track = queue.current;

		const methods = ['disabled', 'track', 'queue'];

		const progress = queue.createProgressBar();
		const timestamp = queue.getPlayerTimestamp();
		if (timestamp.progress == 'Infinity') {
			progress = 'Live 🔴'
		};

		interaction.reply(`Track ${track.title}\nAuthor ${track.author}\nVolume **${queue.volume}**%\nProgress ${progress} (**${timestamp.progress}**%)\nURL ${track.url}\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`);
	},
};