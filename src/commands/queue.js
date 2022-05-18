const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('queue')
	.setDescription('show the queue'),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);

		if (!queue) return interaction.channel.send(`No music currently playing... try again ? ❌`);

		if (!queue.tracks[0]) return interaction.channel.send(`No music in the queue after the current one... try again ? ❌`);
		
		const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

		const songs = queue.tracks.length;
		const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;

		interaction.reply(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);
	},
};