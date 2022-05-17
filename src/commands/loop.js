const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('loop')
	.setDescription('Loops the current song')
	.addStringOption(option =>
		option.setName('loop')
			.setDescription('Loop the current song (yes|no)')
			.setRequired(true)),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue) return interaction.channel.send(`No music currently playing... try again ? ❌`);
		const loop = interaction.options.getString("loop");
		const success = queue.setLoop(loop === 'true');

		return interaction.channel.send(success ? `Current music ${queue.current.title} looped ${loop === 'true' ? 'on' : 'off'} ✅` : `Something went wrong... try again ? ❌`);
	},
};