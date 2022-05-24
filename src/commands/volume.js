const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('volume')
	.setDescription('Change the volume of the current song')
	.addStringOption(option =>
		option.setName('volume')
			.setDescription('The volume to set (0-100)')
			.setRequired(true)),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) return interaction.reply(`No music currently playing... try again ? ❌`);
		const vol = parseInt(interaction.options.getString('volume'));
		if (!vol) return interaction.reply(`The current volume is ${queue.volume} 🔊\n*To change the volume enter a valid number between **1** and **100**.*`);
		if (queue.volume === vol) return interaction.reply(`The volume you want to change is already the current one... try again ? ❌`);
		if (vol < 0 || vol > 100) return interaction.reply(`The specified number is not valid. Enter a number between **1** and **100**... try again ? ❌`);
		const success = queue.setVolume(vol);

		return interaction.reply(success ? `The volume has been modified to **${vol}**/**100**% 🔊` : `Something went wrong... try again ? ❌`);
	},
};