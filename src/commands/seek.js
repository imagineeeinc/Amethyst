const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('seek')
	.setDescription('seek to a specific time in the current song')
	.addStringOption(option =>
		option.setName('time')
			.setDescription('The time to seek to (in minutes)')
			.setRequired(true)),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) return message.channel.send(`No music currently playing... try again ? ❌`);
		let time = interaction.options.getString('time');
		if (!time) return interaction.reply(`Please provide a time to seek to... try again ? ❌`);
		timeTo = (ms(time)*60)*1000;
		const seek = queue.seek(timeTo);
		if (!seek) return interaction.reply(`Something went wrong... try again ? ❌`);
		interaction.reply(`Seeking to ${ms(time, { long: true })} minutes... ✅`);
	},
};