const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('seek')
	.setDescription('seek to a specific time in the current song')
	.addStringOption(option =>
		option.setName('minutes')
			.setDescription('The time to seek to (in minutes)')
			.setRequired(false))
	.addStringOption(option =>
		option.setName('seconds')
			.setDescription('The time to seek to (in seconds)')
			.setRequired(false)),
	async execute(interaction, player) {
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) return message.channel.send(`No music currently playing... try again ? ❌`);
		let min = interaction.options.getString('minutes') || '0';
		let sec = interaction.options.getString('seconds') || '00';
		if (!min && !sec) return interaction.reply(`Please provide a time to seek to... try again ? ❌`);
		timeTo = ((ms(min)*60)*1000)+(ms(sec)*1000);
		console.log(timeTo);
		const seek = queue.seek(timeTo);
		if (!seek) return interaction.reply(`Something went wrong... try again ? ❌`);
		interaction.reply(`Seeking to **${min}:${sec}** ✅`);
	},
};