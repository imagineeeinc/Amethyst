const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('playlist')
	.setDescription('Plays a whole playlist')
	.addStringOption(option =>
		option.setName('playlist')
			.setDescription('The playlist to play')
			.setRequired(true)),
	async execute(interaction, player) {
		let list = interaction.options.getString('playlist').split(',');
		if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
		if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
		const query = list[0]
		const queue = player.createQueue(interaction.guild, {
				metadata: {
					channel: interaction.channel
				}
		});
		
		// verify vc connection
		try {
				if (!queue.connection) await queue.connect(interaction.member.voice.channel);
		} catch {
				queue.destroy();
				return await interaction.reply({content: "Could not join your voice channel!", ephemeral: true });
		}

		await interaction.deferReply();
		const track = await player.search(query, {
			requestedBy: interaction.user
		}).then(x => x.tracks[0]);
		if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

		queue.play(track);
		let tracks = []
		for(let index=0; index<list.length; index++){
			if (index > 0) {
				await player.search(list[index], {
					requestedBy: interaction.user
				}).then(x => x.tracks[0]).then(track => {
					tracks.push(track)
				})
			}
		}
		queue.addTracks(tracks)

		return await interaction.followUp({ content: `⏱️ | Adding track **${track.title}** to queue!` });
	},
};